import { Injectable } from '@angular/core';
import { RestProvider } from './rest/rest';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
import { Msg } from '../pages/models';
import { Storage } from '@ionic/storage';


@Injectable()
export class MsgCheckProvider {

  worker: number;
  exclude: Msg
  msgs: Msg[]

  constructor(public rest: RestProvider,
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications,
    private storage: Storage,
    public plt: Platform) {
    console.log('Hello MsgCheckProvider');
    this.msgs = [];
    this.load_data();
  }

  async load_data() {
    let msgs = await this.storage.get("unread") as Msg[];
    this.msgs.push(...msgs);
  }

  set_disable(type: string, type_id: number, sender_id: number) {
    this.exclude = new Msg();
    this.exclude.type = type;
    this.exclude.type_id = type_id;
    this.exclude.sender_id = sender_id;
    this.msgs = this.msgs.filter(msg => {
      return !this.channel_match(msg, this.exclude);
    });
  }

  clear_disable() {
    this.exclude = null;
  }

  async msgs_mark_read(type: string, type_id: number, sender_id: number) {
    this.msgs = this.msgs.filter(msg => {
      return !this.channel_match(msg, this.exclude);
    });
    this.storage.set("unread", this.msgs);
  }

  get_channel_number(type: string, type_id: number, sender_id: number): number {
    let msgs = this.msgs.filter(msg => {
      let channel = new Msg();
      channel.type = type;
      channel.type_id = type_id;
      channel.sender_id = sender_id;
      return this.channel_match(msg, channel);
    });
    return msgs.length;
  }

  start() {
    if (!this.rest.check_login()) {
      console.log('No login!');
      return;
    }
    if (this.worker) {
      console.log('Worker already started!');
      return;
    }
    console.log('Try start worker!');
    this.backgroundMode.enable();
    this.worker = setInterval(async () => {
      try {
        if (!this.rest.check_login()) {
          console.log('No login!');
          clearInterval(this.worker);
          return;
        }

        let msgs = await this.rest.list_unread_msgs();
        for (let msg of msgs) {
          if (this.channel_match(msg, this.exclude)) {
            continue;
          }
          if (msg.unread == 1) {
            console.log("mark: ", msg);
            this.rest.mark_msg_read(msg.id);
            this.msgs.push(msg);
            msg.sender = await this.rest.load_user_info(msg.sender_id);
            this.notif(msg.sender.username, msg.content);
          }
        }
        this.storage.set("unread", this.msgs);
      } catch (ex) {
        console.log("check msgs: ", ex);
        clearInterval(this.worker);
      }
    }, 1000);
  }


  stop() {
    if (this.worker) {
      clearInterval(this.worker);
      this.worker = null;
    }
  }

  clear() {
    this.storage.remove('unread');
    this.msgs = [];
  }

  notif(username: string, msg: string) {
    console.log("notif: ", username + ": " + msg);
    this.localNotifications.schedule({
      id: 1,
      text: username + ": " + msg,
      sound: 'file://assets/sounds/alert.mp3',
    });
  }

  channel_match(msg: Msg, channel: Msg) {
    if (!channel) {
      return false;
    }
    if (msg.sender_id != channel.sender_id) {
      return false;
    }
    if (msg.type != channel.type) {
      return false;
    }
    if (msg.type_id != channel.type_id) {
      return false;
    }
    return true;
  }

}
