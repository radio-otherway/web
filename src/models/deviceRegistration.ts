export default class DeviceRegistration {
  deviceType: string;
  fcmToken: string;
  lastSeen: Date;
  constructor(deviceType: string, fcmToken: string, lastSeen: Date) {
    this.deviceType = deviceType;
    this.fcmToken = fcmToken;
    this.lastSeen = lastSeen;
  }
}
