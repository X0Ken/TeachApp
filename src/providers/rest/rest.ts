import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { GlobalSettingService } from '../../pages/global'

import { Events } from 'ionic-angular';
import { User, AnswerKeywords, Msg, Job, Order, Question } from '../../pages/models';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  serverAddress: string = "http://rrj.wanghongxu.cn:8888";
  // serverAddress: string = "http://localhost:8888";

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
      console.log('login_by_token await token');
      let token_id = await this.get_token_id().catch((err) => {
        console.log('login_by_token get_token_id err:', err);
      });
      console.log('login_by_token token:', token_id);
      if (token_id == null) {
        reject("Token id not found!");
      }
      else {
        console.log('Token id.', token_id);
        let url = this.serverAddress + "/api/token";
        var body = {
          "auth": {
            "type": "token",
            "token_id": token_id
          }
        }
        console.log('login_by_token try post token');
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
      reject("");
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

      let url = this.serverAddress + "/api/token";
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
      console.log('rest try login');
      var user = this.check_login();
      console.log('rest user', user);
      if (user) {
        console.log('rest go resolve user');
        resolve(user);
      } else {
        console.log('rest go login_by_token');
        this.login_by_token().then(user => {
          console.log('rest login_by_token resolve user');
          resolve(user);
        }, error => {
          console.log('rest login_by_token  reject error');
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
      let url = this.serverAddress + "/api/users";
      var body = {
        "register": {
          "username": username,
          "password": password
        }
      }
      this.http.put(url, body).subscribe(data => {
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
      let url = this.serverAddress + "/api/users/" + user_id;
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
      let url = this.serverAddress + "/api/teachers/" + teacher_id;
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
      let url = this.serverAddress + "/api/teachers/" + user['id'];
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
      let url = this.serverAddress + '/api/teachers';
      this.http.get(url).subscribe(data => {
        console.log("load_teachers:", data);
        resolve(data['teachers']);

      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  put_teacher_job(job): Promise<Job> {
    let url = this.serverAddress + '/api/teacherjobs';
    return this.hput(url, job, "teacherjob")
  }

  get_teacher_job(jid): Promise<Job> {
    let url = this.serverAddress + '/api/teacherjobs/' + jid;
    return this.hget(url, "teacherjob")
  }

  async load_my_teacher_jobs() {
    var token_id = await this.get_token_id();
    var promise = new Promise<any[]>((resolve, reject) => {
      let url = this.serverAddress + '/api/teacherjobs';
      let params = {
        "only_me": "true"
      }

      this.http.get(url, {
        params: params,
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Get data from server.", data);
        resolve(data['teacherjobs']);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  async load_questions(filter?: {
    only_me?: boolean;
    keyword?: string
  }) {
    var token_id = await this.get_token_id();
    var promise = new Promise<any[]>((resolve, reject) => {
      let url = this.serverAddress + '/api/questions';
      let params = {}

      if (filter.only_me) {
        params['only_me'] = 'true';
      }
      if (filter.keyword) {
        params['keyword'] = filter.keyword;
      }

      this.http.get(url, {
        params: params,
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Get data from server.", data);
        resolve(data['questions']);
      }, error => {
        reject(error);
      });
    });
    return promise;
  }

  get_question(qid: number): Promise<Question> {
    let url = this.serverAddress + '/api/questions/' + qid;
    return this.hget(url, "question");
  }

  async load_my_question(): Promise<Question[]> {
    return await this.load_questions({
      only_me: true
    });
  }

  async load_question_by_key(k: string) {
    return await this.load_questions({
      keyword: k
    });
  }

  handle_http_error(error: Response): boolean {
    if (error.status == 401) {
      console.log("events 'user:login' ");
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
      let url = this.serverAddress + '/api/questions';
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

  async get_msg(user_id) {
    var token_id = await this.get_token_id();
    var promise = new Promise<any[]>((resolve, reject) => {
      let url = this.serverAddress + '/api/msg/' + user_id;
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

  async hget(url: string, key: string, params?: { [param: string]: string }) {
    let token_id = await this.get_token_id();
    let options = {}
    if (params) {
      options['params'] = params;
    }
    if (token_id) {
      options['headers'] = { "token-id": token_id };
    }
    var promise = new Promise<any>((resolve, reject) => {
      this.http.get(url, options).subscribe(data => {
        console.log("Load data from server ", data);
        var v = data[key];
        resolve(v);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

  async hput(url: string, body: any, key?: string, params?: { [param: string]: string }) {
    let token_id = await this.get_token_id();
    let options = {}
    if (params) {
      options['params'] = params;
    }
    if (token_id) {
      options['headers'] = { "token-id": token_id };
    }
    var promise = new Promise<any>((resolve, reject) => {
      this.http.put(url, body, options).subscribe(data => {
        console.log("Load data from server ", data);
        if (key) {
          data = data[key];
        }
        resolve(data);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

  get_question_last_msg(qid: number): Promise<Msg[]> {
    let url = this.serverAddress + '/api/msg/question/' + qid;
    return this.hget(url, "msgs")
  }

  get_question_user_msg(qid: number, uid: number): Promise<Msg[]> {
    let url = this.serverAddress + '/api/msg/question/' + qid + "/user/" + uid;
    return this.hget(url, "msgs")
  }

  put_question_user_msg(qid: number, uid: number, msg: string): Promise<Msg> {
    let url = this.serverAddress + '/api/msg/question/' + qid + "/user/" + uid;
    return this.hput(url, { msg: { content: msg } }, "msg")
  }

  get_job_last_msg(): Promise<Msg[]> {
    let url = this.serverAddress + '/api/msg/job';
    return this.hget(url, "msgs")
  }

  get_job_user_msg(jid: number, uid: number): Promise<Msg[]> {
    let url = this.serverAddress + '/api/msg/job/' + jid + "/user/" + uid;
    return this.hget(url, "msgs")
  }

  put_job_user_msg(jid: number, uid: number, msg: string): Promise<Msg> {
    let url = this.serverAddress + '/api/msg/job/' + jid + "/user/" + uid;
    return this.hput(url, { msg: { content: msg } }, "msg")
  }

  create_order(o: Order): Promise<Order> {
    let url = this.serverAddress + '/api/orders';
    let data = {
      "order": {
        payer_id: o.payer_id,
        payee_id: o.payee_id,
        unit_price: o.unit_price,
        unit: o.unit,
        number: o.number,
        amount: o.amount,
        type: o.type,
        type_id: o.type_id,
      }
    }
    return this.hput(url, data, "order")
  }

  list_orders(type: string): Promise<Order[]> {
    let url = this.serverAddress + '/api/orders';
    let params = {
      "type": type
    }
    return this.hget(url, "orders", params);
  }

  async load_answer_keywords() {
    var token_id = await this.get_token_id();
    var promise = new Promise<AnswerKeywords[]>((resolve, reject) => {
      let url = this.serverAddress + '/api/answer_keywords';
      this.http.get(url, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Load data from server ", data);
        var keywords = data['keywords'];
        resolve(keywords);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

  async add_answer_keywords(keyword) {
    let token_id = await this.get_token_id();
    let promise = new Promise<null>((resolve, reject) => {
      let url = this.serverAddress + '/api/answer_keywords';
      let body = {
        "keyword": keyword
      };
      this.http.put(url, body, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Load data from server ", data);
        var keywords = data['keywords'];
        resolve(keywords);
      }, error => {
        if (this.handle_http_error(error)) {
          return;
        }
        reject(error);
      });
    });
    return promise;
  }

  async delete_answer_keyword(id) {
    var token_id = await this.get_token_id();
    var promise = new Promise<null>((resolve, reject) => {
      let url = this.serverAddress + '/api/answer_keywords/' + id;
      this.http.delete(url, {
        headers: { "token-id": token_id }
      }).subscribe(data => {
        console.log("Load data from server ", data);
        resolve();
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
