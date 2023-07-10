import { useState, useEffect } from "react";
import api from "../../../utils/api";

import dashboard from "./Dashboard.module.css";

import { NavLink } from "react-router-dom";

import RoundedImage from "../../layout/RoundedImage";

const MyAdoptions = () => {
  const [token] = useState(localStorage.getItem("token") || "");

  const [pets, setPets] = useState([]);

  useEffect(() => {
    api
      .get(`/pets/myadoptions`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => setPets(response.data.pets));
  }, [token]);

  return (
    <section className={dashboard.petslist_header}>
      <h1>Minhas Adoções</h1>
      {pets.length > 0 && (
        <NavLink to={"/"} className={dashboard.link}>
          Adotar pet
        </NavLink>
      )}
      <div className={dashboard.container}>
        {(pets.length === 0 || "") && (
          <div className={dashboard.sem}>
            <h2>Não existem adoções cadastradas...</h2>
            <NavLink to={"/"}>Adotar pet</NavLink>
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
                <div className={dashboard.pet_contact}>
                  <h3>Ligue para: <span>{pet.user.phone}</span></h3>
                  <h3>Fale com: <span>{pet.user.name}</span></h3>
                </div>

                <div className={dashboard.actions}>
                  {pet.available ? (
                    <p>Adoção em processo</p>
                  ) : (
                    <p>Parabéns por concluir a adoção</p>
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

export default MyAdoptions;
