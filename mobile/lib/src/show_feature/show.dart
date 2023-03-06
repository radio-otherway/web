/// A placeholder class that represents an entity or model.
class Show {
  final String id;
  final String title;
  final DateTime date;

  const Show({required this.id, required this.title, required this.date});

  factory Show.fromJson(Map<String, dynamic> json) {
    return Show(
      id: json['id'],
      title: json['title'],
      date: DateTime.parse(json['date'].toString()),
    );
  }
}
