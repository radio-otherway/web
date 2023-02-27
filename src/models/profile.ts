export default class Profile {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  about?: String;
  lastSeen: Date;
  constructor(
    id: string,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
    emailVerified: boolean,
    lastSeen?: Date
  ) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.emailVerified = emailVerified;

    this.lastSeen = lastSeen || new Date();
  }
}
