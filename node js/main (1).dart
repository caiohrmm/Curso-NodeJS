import 'package:flutter/material.dart';

void main() {
runApp(const MyApp());
}

class MyApp extends StatelessWidget {
const MyApp({super.key});

@override
Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Prova',
      home: Pagina1(), // Adicionado para especificar a tela inicial
    );
}
}

class Pagina1 extends StatelessWidget {
const Pagina1({super.key});

@override
Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Prova'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              child: const Text(
                'Cidades',
              ),
            ),
            const Card(
              child: ListTile(
                title: Text('Ourinhos'),
              ),
            ),
            const Card(
              child: ListTile(
                title: Text('São José dos Campos'),
              ),
            ),
            const Card(
              child: ListTile(
                title: Text('São Paulo'),
              ),
            ),
            Container(
              child: const Text(
                'Pessoas',
              ),
            ),
            const Card(
              child: ListTile(
                title: Text('Andrick'),
              ),
            ),
            const Card(
              child: ListTile(
                title: Text('Yan'),
              ),
            ),
            const Card(
              child: ListTile(
                title: Text('Isabella'),
              ),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const Pagina2()),
                );
              },
              child: const Text('Ir'),
            ),
          ],
        ),
      ),
    );
}
}

class Pagina2 extends StatelessWidget {
const Pagina2({super.key});

@override
Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Página 2'),
        automaticallyImplyLeading: false //serve para tirar botao de voltar ao lado titulo
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Voltar'),
        ),
      ),
    );
}
}
