import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import api from "../../../utils/api";

import useFlashMessage from "../../../hooks/useFlashMessage";

import styles from "./AddPet.module.css";

import PetForm from "../../form/PetForm";

const EditPet = () => {
  const { setFlashMessage } = useFlashMessage();

  // State do pet
  const [pet, setPet] = useState({});

  // Token
  const [token] = useState(localStorage.getItem("token") || "");

  // De acordo com a palavra que coloquei depois do : na rota dinamica do meu app, consigo pegar seu valor aqui.
  const { id } = useParams();

  // Preciso pegar agora os dados do meu pet
  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  // Funcao que atualizará o pet
  const updatePet = async (pet) => {
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

    const data = await api.patch(`/pets/${pet._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
        return response.data
    }).catch((err) => {
        msgType = 'error'
        return err.response.data
    })

    setFlashMessage(data.message, msgType)
  };

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>
          <i class="bi bi-pencil"></i> Editando o pet - {pet.name}
        </h1>
        <p>
          Após a edição, os dados do {pet.name} serão atualizados no sistema!
        </p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatePet} btnText={"Editar"} petData={pet} />
      )}
    </section>
  );
};

export default EditPet;
