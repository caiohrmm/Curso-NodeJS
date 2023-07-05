import styles from "./MyPets.module.css";

import dashboard from "./Dashboard.module.css";

import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import RoundedImage from "../../layout/RoundedImage";

import api from "../../../utils/api";

import ModalComponent from "../../Modal/ModalComponent";

// hooks
import useFlashMessage from "../../../hooks/useFlashMessage";

import { useDisclosure } from "@chakra-ui/react";

const MyPets = () => {
  const [pets, setPets] = useState([]);

  const [token] = useState(localStorage.getItem("token") || "");

  const { setFlashMessage } = useFlashMessage();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fazendo useEffect para fazer uma requisicao para a API para mostrar os pets
  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => setPets(response.data.pets));
  }, [token]);

  const removePet = async (id) => {
    // Funcao que remove um pet.
    let msgType = "success";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        // Filtro todos os pets que nao sejam iguais ao que eu acabei de deletar e atualizo meu estado.
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <section className={dashboard.petslist_header}>
      <h1>Meus Pets</h1>
      {pets.length > 0 && (
        <NavLink to={"/pet/add"} className={dashboard.link}>
          Cadastrar pet
        </NavLink>
      )}
      <div className={dashboard.container}>
        {(pets.length === 0 || "") && (
          <div className={dashboard.sem}>
            <h2>Não existem pets cadastrados...</h2>
            <NavLink to={"/pet/add"}>Cadastrar pet</NavLink>
          </div>
        )}
        {pets.length > 0 && (
          <div className={dashboard.teste}>
            {pets.map((pet) => (
              <div key={pet._id} className={dashboard.pet}>
                <div className={dashboard.imgenome}>
                  <RoundedImage
                    src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                    alt={pet.images[0]}
                    width="px75"
                  />
                  <p className={dashboard.pet_name}>{pet.name}</p>
                </div>

                <div className={dashboard.actions}>
                  {pet.available ? (
                    <>
                      {pet.adopter && (
                        <button
                          className={dashboard.conclude_btn}
                          onClick={() => {
                            //concludeAdoption(pet._id);
                          }}
                        >
                          Concluir adoção
                        </button>
                      )}

                      <NavLink to={`/pet/edit/${pet._id}`}>
                        Editar <i class="bi bi-pencil"></i>
                      </NavLink>
                      <button onClick={onOpen}>
                        <ModalComponent
                          isOpen={isOpen}
                          onClose={onClose}
                          header="Tem certeza que deseja excluir o pet ?"
                          action="Excluir"
                          handleClick={() => {
                            removePet(pet._id);
                          }}
                        />
                        Excluir <i class="bi bi-trash"></i>
                      </button>
                    </>
                  ) : (
                    <p>Pet já adotado</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPets;
