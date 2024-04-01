import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color.fromRGBO(14, 23532, 235, 100),
        ),
        body: const Column(
          
            children: <Widget>[
              Text('Texto1000'),
               Text('Caio Henrique', textAlign: TextAlign.left),
              Expanded(
                child: FittedBox(
                  child: FlutterLogo(),
                ),
              )
            ],
          ),
        ),
    );
  }
}
