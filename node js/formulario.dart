import 'package:flutter/material.dart';

void main(List<String> args) {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "Somador",
      home: FormularioValores(),
    );
  }
}

class FormularioValores extends StatefulWidget {
  const FormularioValores({super.key});

  @override
  State<FormularioValores> createState() => _FormularioValoresState();
}

class _FormularioValoresState extends State<FormularioValores> {
  final myController1 = TextEditingController();
  final myController2 = TextEditingController();

  @override
  void dispose() {
    myController1.dispose();
    myController2.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Titulo1'),
        ),
        body: Column(
          children: <Widget>[
            TextField(controller: myController1),
            TextField(controller: myController2),
            FloatingActionButton(
              onPressed: () {
                showDialog(
                    context: context,
                    builder: (context) {
                      String sum = (int.parse(myController1.text) +
                              int.parse(myController2.text))
                          .toString();
                      return AlertDialog(content: Text(sum));
                    });
              },
              tooltip: "Soma ",
              child: const Icon(Icons.add),
            ),
          ],
        ));
  }
}