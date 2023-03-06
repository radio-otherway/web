import 'dart:convert';

import 'package:http/http.dart' as http;

import 'show.dart';

class ShowService {
  Future<List<Show>> fetchShows() async {
    final response = await http.get(
        Uri.parse('https://otherway.dev.fergl.ie:3000/api/shows/upcoming'));

    if (response.statusCode == 200) {
      var res = json.decode(response.body) as List;
      List<Show> shows = res.map((e) => Show.fromJson(e)).toList();
      return shows;
    } else {
      throw Exception('Failed to load shows');
    }
  }
}
