import { useState, useEffect } from "react";

import styles from "./PetDetails.module.css";

import { useParams, NavLink } from "react-router-dom";

import api from "../../../utils/api";

import useFlashMessage from "../../../hooks/useFlashMessage";

import RoundedImage from "../../layout/RoundedImage";

const PetDetails = () => {
  // Flash message
  const { setFlashMessage } = useFlashMessage();

  const [token] = useState(localStorage.getItem("token") || "");

  const [pet, setPet] = useState({});

  const { id } = useParams();

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => setPet(response.data.pet));
  }, [id]);

  return (
    <>
      {pet.name && (
        <section>
          <div>
            <h1>Detalhando o pet - {pet.name}</h1>
            <p>
              Caso tenha interesse, marque uma visita para conhecê-lo melhor!
            </p>
          </div>
          <div>
            {pet.images.map((image, index) => (
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
            <p>
              Peso do pet - {pet.weight}kg{" "}
              <i class="fa-sharp fa-solid fa-dog"></i>
            </p>
            <p>
              Idade do pet - {pet.age} ano/s <i class="fa-solid fa-cat"></i>
            </p>
            {token ? (<button>Adotar</button>) : (<p>Você precisa de uma conta para conseguir adotar um Pet ! <NavLink to={'/register'}>Criar conta</NavLink></p>)}
          </div>
        </section>
      )}
    </>
  );
};

export default PetDetails;
