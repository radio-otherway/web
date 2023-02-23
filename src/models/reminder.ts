import Notification from "./notification";

export default class Reminder {
  userId: string;
  showId: string;
  notifications: Notification[];
  created: Date;

  constructor(userId: string,
              showId: string,
              notifications: [],
              created: Date) {
    this.userId = userId;
    this.showId = showId;
    this.notifications = notifications.map(n => Notification.fromJson(n));
    this.created = created;
  }

  static fromJson(r: any): Reminder {
    return new Reminder(
      r.userId,
      r.showId,
      r.notifications,
      r.created);
  }
};
