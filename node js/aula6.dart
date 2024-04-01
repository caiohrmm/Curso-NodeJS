import 'dart:html';
import 'package:flutter/material.dart';

Widget build(BuildContext) {
  return MaterialApp(
    debugShowCheckedModeBanner: true,
    home: Scaffold(
      body: const Card(
        child: ListTile(
          leading: Icon(Icons.music_note),
          title: Text("Alceu"),
          subtitle: Text("Alceu")
        ),
      ),
    ),
    appBar: AppBar(
      title: const Text("Joao"),
      backgroundColor: const Color.fromRGBO(),
    ),
    floatingActionButton: floatingActionButton(
      onPressed: () => (),
      child: const Icon(Icons.add),
    )
  );
}