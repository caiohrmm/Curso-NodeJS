// Importando componentes
import Input from "../../form/Input";

// Importando css
import styles from "./Register.module.css";
import styles2 from "../../form/Form.module.css";

// Importando Link react dom
import { NavLink } from "react-router-dom";

// Importando hooks
import { useContext, useState } from "react";

// Importando contexts
import { Context } from "../../../context/UserContext";

const Register = () => {
  const [user, setUser] = useState({}); // Estado inicial do meu usuário é um objeto vazio.

  const handleChange = (e) => {
    // Setarei o usuario com base nos dados passados no formulário.
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Usando meu contexto!
  const { register } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar user para meu banco
    register(user); // Fazendo o post do usuário
  };
  return (
    <section>
      <h1 className={styles}>Registrar</h1>
      <form onSubmit={handleSubmit} className={styles2.form_container}>
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
