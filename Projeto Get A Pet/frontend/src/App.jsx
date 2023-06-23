// Importando react-router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importando componentes
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";

// Importando componentes de layout da página
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

function App() {
  return (
    // Criando estruturas de rotas com React-router-dom 6
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />{" "}
          {/* Renderiza a página de Login */}
          <Route path="/register" element={<Register />} />{" "}
          {/* Renderiza a página de Cadastro */}
          <Route path="/" element={<Home />} /> {/* Renderiza a página Home */}
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
