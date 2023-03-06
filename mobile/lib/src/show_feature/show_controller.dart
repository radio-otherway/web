import 'package:flutter/material.dart';

import 'show.dart';
import 'show_service.dart';

class ShowController with ChangeNotifier {
  final ShowService _showService;
  ShowController(this._showService);

  Future<List<Show>> fetchShows() async {
    return await _showService.fetchShows();
  }
}
