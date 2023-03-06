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
  notificationsBrowser: boolean;
  notificationsMobile: boolean;
  notificationsWhatsapp: boolean;
  notificationsEmail: boolean;

  constructor(
    id: string,
    email?: string,
    displayName?: string,
    photoURL?: string,
    about?: string,
    mobileNumber?: string,
    lastSeen?: Date,
    notificationsBrowser?: boolean,
    notificationsMobile?: boolean,
    notificationsWhatsapp?: boolean,
    notificationsEmail?: boolean,
    deviceRegistrations?: DeviceRegistration[]
  ) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.about = about || "";
    this.mobileNumber = mobileNumber || "";
    this.notificationsBrowser = notificationsBrowser || false;
    this.notificationsMobile = notificationsMobile || false;
    this.notificationsWhatsapp = notificationsWhatsapp || false;
    this.notificationsEmail = notificationsEmail || false;

    this.lastSeen = lastSeen || new Date();
    this.deviceRegistrations = deviceRegistrations || this.deviceRegistrations;
  }

  static fromJson(r: any): Profile {
    const profile = new Profile(
      r.id,
      r.email,
      r.displayName,
      r.photoURL,
      r.about,
      r.mobileNumber,
      r.lastSeen,
      r.lastSeen
    );
    if (r.deviceRegistrations) {
      profile.deviceRegistrations = r.deviceRegistrations;
    }
    profile.notificationsBrowser = r.notificationsBrowser || false;
    profile.notificationsMobile = r.notificationsMobile || false;
    profile.notificationsWhatsapp = r.notificationsWhatsapp || false;
    profile.notificationsEmail = r.notificationsEmail || false;
    return profile;
  }
}
