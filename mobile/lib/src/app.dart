import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:overlay_support/overlay_support.dart';
import 'package:radio_otherway/src/login/login_controller.dart';
import 'package:radio_otherway/src/login/login_service.dart';
import 'package:radio_otherway/src/show_feature/show_list_view.dart';

import 'data/models/push_notification.dart';
import 'login/login_view.dart';
import 'settings/settings_controller.dart';
import 'settings/settings_view.dart';
import 'show_feature/show_details_view.dart';
import 'utils/localization/localization.dart';

FirebaseMessaging messaging = FirebaseMessaging.instance;
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print("Handling a background message: ${message.messageId}");
}

/// The Widget that configures your application.
class MyApp extends StatelessWidget {
  const MyApp({
    super.key,
    required this.settingsController,
  });

  final SettingsController settingsController;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: settingsController,
      builder: (BuildContext context, Widget? child) {
        return OverlaySupport.global(
          child: MaterialApp(
            home: App(),
            restorationScopeId: 'app',
            localizationsDelegates: const [
              MyLocalizationsDelegate(),
              AppLocalizations.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            supportedLocales: const [
              Locale('en', ''), // English, no country code
            ],
            onGenerateTitle: (BuildContext context) =>
                AppLocalizations.of(context)!.appTitle,
            theme: ThemeData(),
            darkTheme: ThemeData.dark(),
            themeMode: settingsController.themeMode,
            onGenerateRoute: (RouteSettings routeSettings) {
              return MaterialPageRoute<void>(
                settings: routeSettings,
                builder: (BuildContext context) {
                  switch (routeSettings.name) {
                    case SettingsView.routeName:
                      return SettingsView(controller: settingsController);
                    case LoginView.routeName:
                      return const LoginView();
                    case ShowDetailsView.routeName:
                      return const ShowDetailsView();
                    case ShowListView.routeName:
                    default:
                      return const ShowListView();
                  }
                },
              );
            },
          ),
        );
      },
    );
  }
}

class App extends StatefulWidget {
  App();

  @override
  State<StatefulWidget> createState() => _AppState();
}

enum TabItem { red, green, blue }

class AppWidget {
  final String title;
  final Widget widget;
  const AppWidget(this.title, this.widget);
}

class _AppState extends State<App> {
  late final FirebaseMessaging _messaging;
  late int _totalNotifications;
  PushNotification? _notificationInfo;

  TabItem currentTab = TabItem.red;
  int _selectedIndex = 0;
  // const ShowListView(),
  // 'Previous Shows',
  // const ShowListView()
  LoginController loginController = LoginController(LoginService());
  final List<AppWidget> _pages = [
    const AppWidget('Upcoming Shows', ShowListView()),
    const AppWidget('Previous Shows', ShowListView()),
  ];
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void registerNotification() async {
    await Firebase.initializeApp();
    _messaging = FirebaseMessaging.instance;
    _messaging.getToken().then((token) {
      print("token is $token");
    });
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

    // On iOS, this helps to take the user permissions
    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      badge: true,
      provisional: false,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('User granted permission');
      // TODO: handle the received notifications
    } else {
      print('User declined or has not accepted permission');
    }
    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('User granted permission');

      // For handling the received notifications
      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        // Parse the message received
        PushNotification notification = PushNotification(
          title: message.notification?.title,
          body: message.notification?.body,
        );

        setState(() {
          _notificationInfo = notification;
          _totalNotifications++;
        });
      });
    } else {
      print('User declined or has not accepted permission');
    }
  }

  // For handling notification when the app is in terminated state
  checkForInitialMessage() async {
    await Firebase.initializeApp();
    RemoteMessage? initialMessage =
        await FirebaseMessaging.instance.getInitialMessage();

    if (initialMessage != null) {
      PushNotification notification = PushNotification(
        title: initialMessage.notification?.title,
        body: initialMessage.notification?.body,
        dataTitle: initialMessage.data['title'],
        dataBody: initialMessage.data['body'],
      );

      setState(() {
        _notificationInfo = notification;
        _totalNotifications++;
      });
    }
  }

  @override
  void initState() {
    _totalNotifications = 0;
    registerNotification();
    checkForInitialMessage();

    // For handling notification when the app is in background
    // but not terminated
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      PushNotification notification = PushNotification(
        title: message.notification?.title,
        body: message.notification?.body,
        dataTitle: message.data['title'],
        dataBody: message.data['body'],
      );

      setState(() {
        _notificationInfo = notification;
        _totalNotifications++;
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
            _pages.elementAt(_selectedIndex).title,
          ),
          actions: [
            loginController.isLoggedIn()
                ? IconButton(
                    icon: const Icon(Icons.logout),
                    tooltip: 'Logout',
                    onPressed: () {
                      Navigator.restorablePushNamed(
                          context, LoginView.routeName);
                    },
                  )
                : IconButton(
                    icon: const Icon(Icons.login),
                    tooltip: 'Login',
                    onPressed: () {
                      Navigator.restorablePushNamed(
                          context, LoginView.routeName);
                    },
                  ),
            IconButton(
              icon: const Icon(Icons.settings),
              onPressed: () {
                Navigator.restorablePushNamed(context, SettingsView.routeName);
              },
            ),
          ],
        ),
        body: Center(
          child: _pages.elementAt(_selectedIndex).widget,
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
                icon: Icon(Icons.library_music), label: 'Upcoming shows'),
            BottomNavigationBarItem(
                icon: Icon(Icons.library_music_sharp), label: 'Previous shows'),
          ],
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
        ));
  }
}
