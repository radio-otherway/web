import 'package:flutter/material.dart';

import '../utils/color_utils.dart';
import '../utils/constants/app_constants.dart';
import '../utils/constants/file_constants.dart';
import '../utils/constants/size_constants.dart';
import '../utils/localization/localization.dart';
import '../utils/social_login.dart';
import '../widgets/social_login.dart';
import 'package:google_sign_in/google_sign_in.dart';

GoogleSignIn _googleSignIn = GoogleSignIn(
  scopes: ['email'],
);

class LoginView extends StatefulWidget {
  static const routeName = '/login';
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Column(children: [
            const Padding(
              //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
              padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Email',
                    hintText: 'Enter your email address'),
              ),
            ),
            const Padding(
              padding:
                  EdgeInsets.only(left: 15.0, right: 15.0, top: 15, bottom: 0),
              //padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                obscureText: true,
                decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Password',
                    hintText: 'Enter secure password'),
              ),
            ),
            TextButton(
              onPressed: () {
                //TODO FORGOT PASSWORD SCREEN GOES HERE
              },
              child: const Text(
                'Forgot Password',
                style: TextStyle(color: Colors.blue, fontSize: 15),
              ),
            )
          ]),
          SocialButton(
            onPressed: () {
              initiateSocialLogin(context, AppConstants.googleProvider);
            },
            providerName: FileConstants.icGoogle,
            buttonColor: ColorUtils.whiteColor,
            buttonText: Localization.of(context)!.googleSignInLabel,
            buttonTextColor: ColorUtils.purpleColor,
            height: SizeConstants.socialButtonSize,
          ),
          SocialButton(
            onPressed: () {
              initiateSocialLogin(context, AppConstants.facebookProvider);
            },
            providerName: FileConstants.icFacebook,
            buttonColor: ColorUtils.purpleColor,
            buttonText: Localization.of(context)!.facebookSignInLabel,
            buttonTextColor: ColorUtils.whiteColor,
            height: SizeConstants.socialButtonSize,
          ),
          SocialButton(
            onPressed: () {
              initiateSocialLogin(context, AppConstants.twitterProvider);
            },
            providerName: FileConstants.icTwitter,
            buttonColor: ColorUtils.whiteColor,
            buttonText: Localization.of(context)!.twitterSignInLabel,
            buttonTextColor: ColorUtils.purpleColor,
            height: SizeConstants.socialButtonSize,
          ),
        ],
      ),
    ));
  }
}
