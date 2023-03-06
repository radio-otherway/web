export default class Show {
  id: string;
  title: string;
  date: string;
  creator: string;
  image?: string;

  constructor(id: string, title: string, date: Date, creator: string, image?: string) {
    this.id = id;
    this.title = title;
    this.date = date.toString();
    this.creator = creator;
    this.image = image;
  }

  static fromJson(r: any): Show {
    return new Show(
      r.id,
      r.title,
      new Date(r.date),
      r.creator,
      r.image
    );
  }
}
