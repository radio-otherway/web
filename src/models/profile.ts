import DeviceRegistration from "@/models/deviceregistration";

export default class Profile {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean = false;
  about?: String;
  lastSeen: Date;
  deviceRegistrations?: DeviceRegistration[] = [];

  constructor(
    id: string,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
    about?: string,
    lastSeen?: Date,
    deviceRegistrations?: DeviceRegistration[]
  ) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.about = about || "";

    this.lastSeen = lastSeen || new Date();
    this.deviceRegistrations = deviceRegistrations || this.deviceRegistrations;
  }
}
