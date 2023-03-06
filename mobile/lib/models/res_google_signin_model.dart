import '../src/utils/constants/key_constants.dart';

class ResGoogleSignInModel {
  String? displayName;
  String? email;
  String? id;
  String? photoUrl;
  String? token;

  ResGoogleSignInModel(
      {this.displayName, this.email, this.id, this.photoUrl, this.token});

  ResGoogleSignInModel.fromJson(Map<String, dynamic> json) {
    displayName = json[KeyConstants.googleDisplayName];
    email = json[KeyConstants.googleEmail];
    id = json[KeyConstants.googleId];
    photoUrl = json[KeyConstants.googlePhotoUrl];
    token = json[KeyConstants.googleToken];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data[KeyConstants.googleDisplayName] = displayName;
    data[KeyConstants.googleEmail] = email;
    data[KeyConstants.googleId] = id;
    data[KeyConstants.googlePhotoUrl] = photoUrl;
    data[KeyConstants.googleToken] = token;
    return data;
  }
}
