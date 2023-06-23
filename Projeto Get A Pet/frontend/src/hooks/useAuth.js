// Faz chamadas na API para tratar da autenticação

// Primeira coisa -> Acesso a API
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAuth() {
  async function register(user) {
    try {
      // Aqui eu farei basicamente o que eu estava fazendo com o postman, mando dados para minha API e ela me retorna algo.
      const data = await api
        .post("/users/register", user)
        .then((response) => response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return { register };
}
