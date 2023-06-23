// Faz chamadas na API para tratar da autenticação

// Primeira coisa -> Acesso a API
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      // Aqui eu farei basicamente o que eu estava fazendo com o postman, mando dados para minha API e ela me retorna algo.
      const data = await api
        .post("/users/register", user)
        .then((response) => response.data);
    } catch (error) {
      // Caso de algum erro, ele aparece na tela a mensagem de erro de validacao da API
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType)
  }
  return { register };
}
