import Notification from "./notification";

export default class Reminder {
  id: string;
  userId: string;
  showId: string;
  notifications: Notification[];
  created: Date;

  constructor(id: string,
              userId: string,
              showId: string,
              notifications: [],
              created: Date) {
    this.id = id;
    this.userId = userId;
    this.showId = showId;
    this.notifications = notifications.map(n => Notification.fromJson(n));
    this.created = created;
  }

  static fromJson(r: any): Reminder {
    return new Reminder(
      r.id,
      r.userId,
      r.showId,
      r.notifications,
      r.created);
  }
};
