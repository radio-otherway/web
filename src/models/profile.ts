export default class Profile {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;

  constructor(id: string, email: string | null, displayName: string | null, photoURL: string | null, emailVerified: boolean) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.emailVerified = emailVerified;
  }
}
