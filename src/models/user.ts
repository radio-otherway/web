export default class User {
  uid: string;
  email: string

  constructor(uid: string, email: string) {
    this.uid = uid;
    this.email = email;
  }
}
