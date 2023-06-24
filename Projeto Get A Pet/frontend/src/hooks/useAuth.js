// Faz chamadas na API para tratar da autenticação

// Primeira coisa -> Acesso a API
import api from "../utils/api";

import { useState, useEffect } from "react";
import useFlashMessage from "./useFlashMessage";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();

  // Controla o estado do usuario.
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Pego o token do localStorage
    const token = localStorage.getItem("token");

    // Mando ele para minha API e autentico o usuario.
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      // Aqui eu farei basicamente o que eu estava fazendo com o postman, mando dados para minha API e ela me retorna algo.
      const data = await api
        .post("/users/register", user)
        .then((response) => response.data);

      // Após fazer toda a verificação com a API e passar por todos os testes. Ele autentica o usuario e manda para home.
      await authUser(data);
    } catch (error) {
      // Caso de algum erro, ele aparece na tela a mensagem de erro de validacao da API
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  // Funcao que controlará a autenticação do usuário
  async function authUser(data) {
    // A partir do momento que esse método é acionado. Ele muda o estado de autenticado para true e salva o token
    // Em localstorage.
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    // Mando o usuário para a home
    navigate("/");
  }

  const logout = () => {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");

    api.defaults.Authorization = undefined;

    navigate("/");

    setFlashMessage(msgText, msgType);
  };

  async function login(user) {
    let msgText = "Login realizado com sucesso!";
    let msgType = "success";

    try {
      // Aqui eu farei basicamente o que eu estava fazendo com o postman, mando dados para minha API e ela me retorna algo.
      const data = await api
        .post("/users/login", user)
        .then((response) => response.data);

      // Após fazer toda a verificação com a API e passar por todos os testes. Ele autentica o usuario e manda para home.
      await authUser(data);
    } catch (error) {
      // Caso de algum erro, ele aparece na tela a mensagem de erro de validacao da API
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  return { register, authenticated, logout, login };
}
