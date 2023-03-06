import 'package:firebase_auth/firebase_auth.dart';

class LoginService {
  bool _loggedIn = false;

  bool isLoggedIn() {
    var user = FirebaseAuth.instance.currentUser;

    _loggedIn = user != null;
    return _loggedIn;
  }
}
