// Importando link do react router dom
import { NavLink } from "react-router-dom";

// Importando imagem de logo
import Logo from "../../assets/img/logo.png";

// Importando meu css
import styles from "./Navbar.module.css";

// Importando context do usuario
import { Context } from "../../context/UserContext";
import { useContext, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "../Modal/ModalComponent";

const Navbar = () => {
  const { authenticated } = useContext(Context);

  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo" />
        <h2>Get a Pet</h2>
      </div>
      <ul>
        <li>
          <NavLink to={"/"}>Adotar</NavLink>
        </li>
        {authenticated ? (
          <>
            <li>
              <NavLink to={'/user/profile'}>
                Meu perfil
              </NavLink>
            </li>
            <li>
              <NavLink onClick={onOpen}>
                Sair
              </NavLink>
              <ModalComponent isOpen={isOpen} onClose={onClose}/>
            </li>
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
