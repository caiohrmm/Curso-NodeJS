import styles from "./AddPet.module.css";

import api from "../../../utils/api";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";

import PetForm from "../../form/PetForm";

const AddPet = () => {
  // Pegar o token para validação no meu local storage
  const [token] = useState(localStorage.getItem("token") || "");

  // Pegar as minhas flash messages
  const { setFlashMessage } = useFlashMessage();

  // Hook do react-router-dom para redirecionar usuario
  const navigate = useNavigate();

  // Criar uma função que se comunicará com o componente de formulario para registrar o pet no banco

  const registerPet = async (pet) => {
    let msgType = "success";

    const formData = new FormData();

    // Adicionando minhas imagens ao formData
    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });
    // Devolve um array com os atributos do pet.
    //console.log(Object.keys(pet));

    // console.log(pet['images']) -> Devolve todas as imagens. Posso acessar seu length
    // formData.append('images', pet[key][i]) -> Adiciona cada uma das imagens ao formData

    // Fazendo o post dos dados. Preciso de autorizacao
    const data = await api
      .post("/pets/create", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    if (msgType !== "error") {
      navigate("/pet/mypets");
    }
  };

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Após o cadastro, ele ficará disponível para adoção!</p>
      </div>
      <PetForm btnText="Cadastrar" handleSubmit={registerPet} />
    </section>
  );
};

export default AddPet;
