export class User {
    // Raw attributes
    id: number;
    pic: string;
    username: string;
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
    sender_id: string;
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
    pay: string
    region: string
    school: string
    subject: string
    time: string
}

export class Question {
    id: number;
    asker_id: number;
    asker: User;
    pay: number;
    content: string;
    keywords: string;
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