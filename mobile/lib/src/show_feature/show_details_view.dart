import 'package:flutter/material.dart';

import 'show_service.dart';

/// Displays detailed information about a SampleItem.
class ShowDetailsView extends StatelessWidget {
  const ShowDetailsView({super.key});

  static const routeName = '/show';

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('More Information Here'),
      ),
    );
  }
}
