import styles from "./MyPets.module.css";

import dashboard from "./Dashboard.module.css";

import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import RoundedImage from "../../layout/RoundedImage";

import api from "../../../utils/api";

// hooks
import useFlashMessage from "../../../hooks/useFlashMessage";

const MyPets = () => {
  const [pets, setPets] = useState([]);

  const [token] = useState(localStorage.getItem("token") || "");

  const { setFlashMessage } = useFlashMessage();

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

  return (
    <section className={dashboard.petslist_header}>
      <h1>Meus Pets</h1>
      <div>
        {(pets.length === 0 || "") && (
          <>
            <h2>Não existem pets cadastrados...</h2>
            <h3>
              <NavLink to={"/pet/add"}>Clique aqui</NavLink>
              &nbsp;para adicionar um pet !
            </h3>
          </>
        )}
        {pets.length > 0 && (
          <>
            {pets.map((pet) => (
              <div key={pet._id}>
                <RoundedImage
                  src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                  alt={pet.images[0]}
                  width="75px"
                />
                <span className="bold">{pet.name}</span>
                <div className={styles.actions}>
                  {pet.available ? (
                    <>
                      {pet.adopter && (
                        <button
                          className={styles.conclude_btn}
                          onClick={() => {
                            //concludeAdoption(pet._id);
                          }}
                        >
                          Concluir adoção
                        </button>
                      )}

                      <NavLink to={`/pet/edit/${pet._id}`}>Editar</NavLink>
                      <button
                        onClick={() => {
                          //removePet(pet._id);
                        }}
                      >
                        Excluir
                      </button>
                    </>
                  ) : (
                    <p>Pet já adotado</p>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default MyPets;
