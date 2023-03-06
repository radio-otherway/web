import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_sign_in/google_sign_in.dart';

import 'package:radio_otherway/src/utils/log_utils.dart';
import 'package:twitter_login/entity/auth_result.dart';
import 'package:twitter_login/twitter_login.dart';

import '../../models/res_google_signin_model.dart';
import '../widgets/progress_dialog.dart';
import 'constants/app_constants.dart';
import 'constants/key_constants.dart';
import 'constants/social_keys_contants.dart';

//Google SignIn Process
void _googleSignInProcess(BuildContext context) async {
  final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
  final GoogleSignInAuthentication? googleAuth =
      await googleUser?.authentication;

  final credential = GoogleAuthProvider.credential(
    accessToken: googleAuth?.accessToken,
    idToken: googleAuth?.idToken,
  );

  // Once signed in, return the UserCredential
  var userCredential =
      await FirebaseAuth.instance.signInWithCredential(credential);

  ResGoogleSignInModel socialGoogleUser = ResGoogleSignInModel(
      displayName: googleUser?.displayName,
      email: googleUser?.email,
      photoUrl: googleUser?.photoUrl,
      id: googleUser?.id,
      token: userCredential.credential?.accessToken);
  Fluttertoast.showToast(
      msg: googleUser!.email,
      backgroundColor: Colors.blue,
      textColor: Colors.white);
  LogUtils.showLog("${socialGoogleUser.toJson()}");
}

//Facebook SignIn Process
void _facebookSignInProcess(BuildContext context) async {
  LoginResult result = await FacebookAuth.instance.login();
  ProgressDialogUtils.showProgressDialog(context);
  if (result.status == LoginStatus.success) {
    AccessToken accessToken = result.accessToken!;
    Map<String, dynamic> userData = await FacebookAuth.i.getUserData(
      fields: KeyConstants.facebookUserDataFields,
    );
    ProgressDialogUtils.dismissProgressDialog();
    Fluttertoast.showToast(
        msg: userData[KeyConstants.emailKey],
        backgroundColor: Colors.blue,
        textColor: Colors.white);
    LogUtils.showLog("${accessToken.userId}");
    LogUtils.showLog("$userData");
  } else {
    ProgressDialogUtils.dismissProgressDialog();
  }
}

//Twitter SignIn Process
void _twitterSignInProcess(BuildContext context) async {
  TwitterLogin twitterLogin = TwitterLogin(
    apiKey: SocialKeys.twitterApiKey,
    apiSecretKey: SocialKeys.twitterApiSecretKey,
    redirectURI: SocialKeys.twitterRedirectUri,
  );
  AuthResult authResult = await twitterLogin.login();
  ProgressDialogUtils.showProgressDialog(context);
  switch (authResult.status) {
    case TwitterLoginStatus.loggedIn:
      ProgressDialogUtils.dismissProgressDialog();
      LogUtils.showLog("${authResult.authToken}");
      Fluttertoast.showToast(
          msg: authResult.user!.email.toString(),
          backgroundColor: Colors.blue,
          textColor: Colors.white);
      break;
    case TwitterLoginStatus.cancelledByUser:
      _showFailureResult(authResult);
      break;
    case TwitterLoginStatus.error:
      _showFailureResult(authResult);
      break;
    case null:
      _showFailureResult(authResult);
      break;
  }
}

//Combine Social Authentication
Future initiateSocialLogin(BuildContext context, String provider) async {
  try {
    if (provider == AppConstants.googleProvider) {
      _googleSignInProcess(context);
    } else if (provider == AppConstants.facebookProvider) {
      _facebookSignInProcess(context);
    } else if (provider == AppConstants.twitterProvider) {
      _twitterSignInProcess(context);
    }
    Navigator.restorablePushNamed(context, "/");
  } on Exception catch (e) {
    LogUtils.showLog("$e");
  }
}

//Combine Social Logout
Future initiateSocialLogout(BuildContext context, String provider) async {
  try {
    if (provider == AppConstants.googleProvider) {
      GoogleSignIn().signOut();
    } else {
      await FacebookAuth.instance.logOut();
    }
  } on Exception catch (e) {
    LogUtils.showLog("$e");
  }
}

//Common Failure Result Method
void _showFailureResult(AuthResult authResult) {
  ProgressDialogUtils.dismissProgressDialog();
  LogUtils.showLog("${authResult.status}");
  Fluttertoast.showToast(
      msg: authResult.status.toString(),
      backgroundColor: Colors.blue,
      textColor: Colors.white);
}
