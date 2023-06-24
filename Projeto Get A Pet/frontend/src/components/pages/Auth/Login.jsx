import Input from "../../form/Input";

import { useState, useContext } from "react";

import { Context } from "../../../context/UserContext";

import { NavLink } from "react-router-dom";

import styles from "../../form/Form.module.css"

const Login = () => {
  const [user, setUser] = useState({});

  const { login } = useContext(Context);

  const handleChange = (e) => {
    // Setarei o usuario com base nos dados passados no formulário.
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar user para meu banco
    login(user); // Fazendo o post do usuário
  };
  return (
    <section>
      <h1>Login</h1>
      <form action="" className={styles.form_container} onSubmit={handleSubmit}>
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
        <input type="submit" value="Login" />
        <p>
          Já tem conta? <NavLink to={"/login"}>Clique aqui !</NavLink>
        </p>
      </form>
    </section>
  );
};

export default Login;
