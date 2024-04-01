import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "Meu App",
      home: Pagina1(),
    
    );
  }
}

class Pagina1 extends StatelessWidget {
const Pagina1({ super.key });

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(),
      body: const Center(
        child: Column(
          children: <Widget>[],
        )
      ),
    );
  }
}
