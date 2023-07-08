// Importando react-router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importando componentes
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pets/MyPets";
import AddPet from "./components/pages/Pets/AddPet";
import EditPet from "./components/pages/Pets/EditPet";
import PetDetails from "./components/pages/Pets/PetDetails";
import MyAdoptions from "./components/pages/Pets/MyAdoptions";

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
              {/* Renderiza a página de Login */}
              <Route path="/login" element={<Login />} />
              {/* Renderiza a página de Cadastro */}
              <Route path="/register" element={<Register />} />
              {/* Renderiza a página de Cadastro */}
              <Route path="/" element={<Home />} />
              {/* Renderiza a página do perfil do usuário */}
              <Route path="/user/profile" element={<Profile />} />
              {/* Renderiza página de meus pets */}
              <Route path="/pet/mypets" element={<MyPets />} />
              {/* Renderiza página de cadastro de pets */}
              <Route path="/pet/add" element={<AddPet />} />
              {/* Renderiza página de edição de pets */}
              <Route path="/pet/edit/:id" element={<EditPet />} />
              {/* Renderiza página de detalhamento de um pet */}
              <Route path="/pet/:id" element={<PetDetails />} />
              {/* Renderiza página de adoções de um usuario */}
              <Route path="/pet/myadoptions" element={<MyAdoptions />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
