export default class Notification {
  secondsBefore: number;
  destination: string;

  constructor(secondsBefore: number,
              destination: string) {
    this.secondsBefore = secondsBefore;
    this.destination = destination;
  }

  static fromJson(r: any): Notification {
    return new Notification(
      r.secondsBefore,
      r.destination
    );
  }
};
