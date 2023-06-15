// Importando link do react router dom
import { NavLink } from "react-router-dom";

// Importando imagem de logo
import Logo from "../../assets/img/logo.png";

// Importando meu css
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logo"/>
        <h2>Get a Pet</h2>
      </div>
      <ul>
        <li>
          <NavLink to={"/"}>Adotar</NavLink>
        </li>
        <li>
          <NavLink to={"/login"}>Entrar</NavLink>
        </li>
        <li>
          <NavLink to={"/register"}>Cadastrar</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
