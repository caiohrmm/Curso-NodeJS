// Importando componentes
import Input from "../../form/Input";

// Importando css
import styles from "./Register.module.css";
import styles2 from "../../form/Form.module.css";

// Importando Link react dom
import { NavLink } from "react-router-dom";

const handleChange = (e) => {};
const Register = () => {
  return (
    <section>
      <h1 className={styles}>Registrar</h1>
      <form action="" method="POST" className={styles2.form_container}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome..."
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite seu telefone..."
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail..."
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha..."
          handleOnChange={handleChange}
        />
        <Input
          text="Confirme sua senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme sua senha..."
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
        <p>
          Já tem conta? <NavLink to={"/login"}>Clique aqui !</NavLink>
        </p>
      </form>
    </section>
  );
};

export default Register;
