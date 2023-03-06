import 'dart:ffi';

import 'package:flutter/material.dart';

import 'login_service.dart';

class LoginController with ChangeNotifier {
  final LoginService _loginService;
  LoginController(this._loginService);

  bool isLoggedIn() {
    return _loginService.isLoggedIn();
  }
}
