export default class Show {
  id: string;
  title: string;
  date: Date;
  creator: string;

  constructor(id: string, title: string, date: string, creator: string) {
    this.id = id;
    this.title = title;
    this.date = new Date(date);
    this.creator = creator;
  }

  static fromJson(r: any): Show {
    return new Show(
      r.id,
      r.title,
      r.date,
      r.creator);
  }
};
