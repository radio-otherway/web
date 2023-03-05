import DeviceRegistration from "@/models/deviceregistration";

export default class Profile {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  headerPhotoURL?: string;
  emailVerified = false;
  about?: string;
  mobileNumber?: string;
  lastSeen: Date;
  deviceRegistrations?: DeviceRegistration[] = [];

  constructor(
    id: string,
    email?: string,
    displayName?: string,
    photoURL?: string,
    about?: string,
    mobileNumber?: string,
    lastSeen?: Date,
    deviceRegistrations?: DeviceRegistration[]
  ) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.about = about || "";
    this.mobileNumber = mobileNumber || "";

    this.lastSeen = lastSeen || new Date();
    this.deviceRegistrations = deviceRegistrations || this.deviceRegistrations;
  }
}
