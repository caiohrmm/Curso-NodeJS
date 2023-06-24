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
import Message from "./components/layout/Message";

// Importando contextos
import { UserProvider } from "./context/UserContext";

// Chakra
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    // Criando estruturas de rotas com React-router-dom 6
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Message />
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />{" "}
              {/* Renderiza a página de Login */}
              <Route path="/register" element={<Register />} />{" "}
              {/* Renderiza a página de Cadastro */}
              <Route path="/" element={<Home />} />{" "}
              {/* Renderiza a página Home */}
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
