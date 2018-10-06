export class User {
    // Raw attributes
    id: number;
    pic: string;
    username: string;
    token_id: string;
}

export class UserInfo {
    id: number;
    name: string;
    age: number;
    education: string;
    gender: string;
    self_evaluate: string;
    create_at: string;
    update_at: string;
}

export class PostItem {
    title: string;
    type: string;
    type_id: number;
    job: Job;
    question: Question;
}

export class AnswerKeywords {
    id: number;
    keyword: string;
    selected: boolean;
}

export class Msg {
    id: number;
    sender: User;
    sender_id: number;
    receiver_id: number;
    content: string;
    type: string;
    type_id: number;
}

export class Job {
    id: number
    gender: string
    highest_education: string
    method: string
    pay: number
    region: string
    school: string
    subject: string
    time: string
    provider_id: number
}

export class Teacher {
    id: number
    gender: string
    highest_education: string
    method: string
    pay: number
    region: string
    school: string
    subject: string
    school_subject: string
    time: string
    self_evaluate: string
    idcard: string
    score: number
}

export class Question {
    id: number;
    asker_id: number;
    asker: User;
    pay: number;
    content: string;
    keywords: string;
    attachments: string;
}

export class Order {
    id: number;
    title: string;
    payer_id: number;
    payee_id: number;
    unit: string;
    unit_price: number;
    number: number;
    amount: number;
    type: string;
    type_id: number;
    job: Job;
    question: Question;
    state: string;
}