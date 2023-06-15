import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    // Criando estruturas de rotas com React-router-dom 6
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/> { /* Renderiza a página de Login */ }
        <Route path="/register" element={<Register/>}/> { /* Renderiza a página de Cadastro */ }
        <Route path="/" element={<Home/>}/> { /* Renderiza a página Home */ }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
