import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { GlobalSettingService } from '../../pages/global'

import { Events } from 'ionic-angular';
import { User } from '../../pages/models';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  serverAddress: string = "http://localhost:8888";
  tokenUrl: string = '/token';

  constructor(public http: HttpClient,
    private globalSetting: GlobalSettingService,
    public events: Events,
    private storage: Storage) {
    console.log('Hello RestProvider Provider');
  }

  check_login() {
    console.log('GlobalSetting.user:', this.globalSetting.user);
    return this.globalSetting.user;
  }

  login_by_token() {
    var promise = new Promise(async (resolve, reject) => {
      let token_id = await this.get_token_id();
      if (token_id == null) {
        reject("Token id not found!");
      }
      else {
        console.log('Token id.', token_id);
        var url = this.serverAddress + "/api/token";
        var body = {
          "auth": {
            "type": "token",
            "token_id": token_id
          }
        }
        this.http.post(url, body).subscribe(data => {
          console.log("Load data from server: ", data);
          var user = data['token'];
          this.globalSetting.user = user;
          this.storage.set("token_id", user['token_id']);
          resolve(user);
        }, error => {
          console.error("This line is never called ", error);
          reject(error);
        });
      }

    });
    return promise;
  }

  get_token_id() {
    var promise = new Promise<string>(async (resolve, reject) => {
      var user = this.globalSetting.user;
      if (user) {
        resolve(user['token_id'])
      }
      let token_id = await this.storage.get("token_id")
      if (token_id) {
        return resolve(token_id)
      }
    });
    return promise;
  }

  login_by_password(username, password) {
    var promise = new Promise((resolve, reject) => {
      username = username.trim();
      if (username.length == 0) {
        reject("Username not null");
      }

      password = password.trim();
      if (password.length == 0) {
        reject("Password not null");
      }

      var url = this.serverAddress + "/api/token";
      var body = {
        "auth": {
          "type": "password",
          "username": username,
          "password": password
        }
      }
      this.http.post(url, body).subscribe(data => {
        console.log("Get data from server:", data);
        var user = data['token'];
        this.globalSetting.user = user;

        console.log("Set token_id to storage:", this.globalSetting.user['token_id']);
        this.storage.set("token_id", this.globalSetting.user['token_id']);

        resolve(user);
      }, error => {
        console.log("error:", error);
        reject("Username or password is error");
      });
    });

    return promise;
  }

  try_login() {
    var promise = new Promise((resolve, reject) => {
      var user = this.check_login();
      if (user) {
        resolve(user);
      } else {
        this.login_by_token().then(user => {
          resolve(user);
        }, error => {
          if (this.handle_http_error(error)) {
            return;
          }
          reject(error);
        });
      };
    });
    return promise;
  }

  login_out() {
    var promise = new Promise((resolve, reject) => {
      console.log('Login out');
      this.storage.remove('token_id');
      this.globalSetting.user = null;
      resolve();
    });
    return promise;
  }

  register_user(username, password, password2) {
    var promise = new Promise((resolve, reject) => {
      username = username.trim();
      password = password.trim();
      password2 = password2.trim();
      if (username.length == 0) {
        reject('用户名不能为空！');
      }
      if (password.length == 0) {
        reject('密码不能为空！');
      }
      if (password != password2) {
        reject('两次输入密码不一致！');
      }
      var url = this.serverAddress + "/api/user";
      var body = {
        "register": {
          "username": username,
          "password": password
        }
      }
      this.http.post(url, body).subscribe(data => {
        console.log("Get data from server:", data);
        var user = data['token'];
        this.globalSetting.user = user;

        console.log("Set token_id to storage:", user['token_id']);
        this.storage.set("token_id", user['token_id']);

        resolve(user);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  async load_user_info(user_id) {
    var token_id = await this.get_token_id();
    var promise = new Promise<User>((resolve, reject) => {
      var url = this.serverAddress + "/api/users/" + user_id;
      this.http.get(url, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Get data from server:", data);
        var user = data['user'] as User;
        user.pic = this.serverAddress + user.pic;
        resolve(user);
      }, error => {
        if (this.handle_http_error(error)) { return; }
        reject(error);
      });
    });
    return promise;
  }

  load_teacher_info(teacher_id) {
    var promise = new Promise((resolve, reject) => {
      if (teacher_id == null) {
        teacher_id = this.globalSetting.user['id'];
      }
      var url = this.serverAddress + "/api/teachers/" + teacher_id;
      this.http.get(url)
        .subscribe(data => {
          console.log("Get teacher init data from server.", data);
          var teacher = data['teacher'];
          resolve(teacher);
        }, error => {
          reject(error);
        });
    });
    return promise;
  }

  async update_teacher_info(teacher) {
    var user = await this.try_login();
    var promise = new Promise((resolve, reject) => {
      var body = {
        "teacher": teacher
      };
      var token_id = this.globalSetting.user['token_id'];
      console.log("log  token id", token_id);

      console.log("post teacher data to server.");
      var url = this.serverAddress + "/api/teachers/" + user['id'];
      this.http.post(url, body, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Get teacher data from server.", data);
        resolve(data['teacher']);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

  load_teachers() {
    var promise = new Promise<any[]>((resolve, reject) => {
      var url = this.serverAddress + '/api/teachers';
      this.http.get(url).subscribe(data => {
        console.log("load_teachers:", data);
        resolve(data['teachers']);

      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  put_teacher_job(job) {
    var promise = new Promise((resolve, reject) => {
      this.get_token_id().then((token_id: string) => {
        var url = this.serverAddress + '/api/teacherjobs';
        this.http.put(url, job, {
          headers: { "token-id": token_id }
        }).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          if (this.handle_http_error(error)) {
            return;
          }
          console.error("This line is never called ", error);
        });
      });

    });
    return promise;
  }

  load_questions() {
    var promise = new Promise<any[]>((resolve, reject) => {
      var url = this.serverAddress + '/api/questions';
      this.http.get(url).subscribe(data => {
        console.log("Get data from server.", data);
        resolve(data['questions']);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  handle_http_error(error: Response): boolean {
    if (error.status == 401) {
      this.events.publish('user:login');
      return true;
    }
    return false;
  }

  async put_question(question) {
    var token_id = await this.get_token_id();
    var promise = new Promise((resolve, reject) => {
      var body = {
        "question": question
      };
      var url = this.serverAddress + '/api/questions';
      this.http.put(url, body, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Load data from server ", data);
        var question = data['question'];
        resolve(question);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

  async put_msg(user_id, msg) {
    var token_id = await this.get_token_id();
    var promise = new Promise((resolve, reject) => {
      var body = {
        "msg": msg
      };
      var url = this.serverAddress + '/api/msg/' + user_id;
      this.http.put(url, body, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Load data from server ", data);
        var msg = data['msg'];
        resolve(msg);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

  async get_msg(user_id) {
    var token_id = await this.get_token_id();
    var promise = new Promise<any[]>((resolve, reject) => {
      var url = this.serverAddress + '/api/msg/' + user_id;
      this.http.get(url, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Load data from server ", data);
        var msgs = data['msgs'];
        resolve(msgs);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

}
