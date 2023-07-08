// Importando link do react router dom
import { NavLink } from "react-router-dom";

// Importando imagem de logo
import Logo from "../../assets/img/logo.png";

// Importando meu css
import styles from "./Navbar.module.css";

// Importando context do usuario
import { Context } from "../../context/UserContext";
import { useContext } from "react";

import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "../Modal/ModalComponent";


const Navbar = () => {
  const { authenticated } = useContext(Context);

  const { logout } = useContext(Context);

  const handleClick = () => {
    onClose();
    logout();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo" />
        <NavLink to={'/'} className={styles.title}>Get a Pet</NavLink>
      </div>
      <ul>
        <li>
          <NavLink to={"/"}>Adotar</NavLink>
        </li>
        {authenticated ? (
          <>
            <li>
              <NavLink to={"/pet/mypets"}>Meus pets</NavLink>
            </li>
            <li>
              <NavLink to={"/pet/myadoptions"}>Minhas adoções</NavLink>
            </li>
            <li>
              <NavLink to={"/pet/add"}>Cadastrar pet</NavLink>
            </li>
            <li>
              <NavLink to={"/user/profile"}>Meu perfil</NavLink>
            </li>
            <li>
              <NavLink onClick={onOpen}>Sair</NavLink>
            </li>
            <ModalComponent
              isOpen={isOpen}
              onClose={onClose}
              handleClick={handleClick}
              header="Tem certeza que deseja sair ?"
              action="Sair"
            />
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/login"}>Entrar</NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
