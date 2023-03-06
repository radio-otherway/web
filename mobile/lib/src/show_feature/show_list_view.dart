import 'dart:convert';
import 'package:flutter/material.dart';

import '../settings/settings_view.dart';
import 'show.dart';
import 'show_controller.dart';
import 'show_details_view.dart';
import 'show_service.dart';

/// Displays a list of ShowItems.
class ShowListView extends StatefulWidget {
  static const routeName = '/';
  const ShowListView({super.key});

  @override
  State<StatefulWidget> createState() => _ShowListViewState();
}

class _ShowListViewState extends State<ShowListView> {
  Future<List<Show>>? _shows;

  final ShowController _showController = ShowController(ShowService());

  @override
  void initState() {
    super.initState();
    _shows = _showController.fetchShows();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: _shows,
        builder: (BuildContext context, AsyncSnapshot<List<Show>> snapshot) {
          if (snapshot.hasData) {
            return Scaffold(
                body: ListView.builder(
              restorationId: 'upcomingShowsListView',
              itemCount: snapshot.data?.length,
              itemBuilder: (BuildContext context, int index) {
                final item = snapshot.data?[index];
                return ListTile(
                  title: Text('${item?.title}'),
                  leading: IconButton(
                    icon: const Icon(Icons.calendar_today),
                    tooltip: 'Remind me about this',
                    onPressed: () {},
                  ),
                );
              },
            ));
          } else if (snapshot.hasError) {
            // If something went wrong
            return Text('Something went wrong... ${snapshot.error}');
          }
          // While fetching, show a loading spinner.
          return const CircularProgressIndicator();
        });
  }
}
