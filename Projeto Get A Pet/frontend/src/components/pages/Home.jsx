import api from "../../utils/api";

import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import styles from "./Home.module.css";

const Home = () => {
  // State de pets
  const [pets, setPets] = useState([]);

  // Requerir todos os pets da minha api
  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section>
      <div className={styles.header}>
        <h1>Adote um Pet !</h1>
        <p>Veja todos os detalhes dos Pets e conheça seus tutores.</p>
      </div>
      <div className={styles.container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.card} key={pet._id}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                }}
                className={styles.card_image}
              ></div>
              <h3>{pet.name}</h3>
              <div className={styles.pet_details}>
                <p>Peso do pet - {pet.weight}kg <i class="fa-sharp fa-solid fa-dog"></i></p>
                <p>Idade do pet - {pet.age} ano/s <i class="fa-solid fa-cat"></i></p>
                {pet.available ? (
                  <NavLink to={`/pet/${pet._id}`}>Mais detalhes</NavLink>
                ) : (
                  <p className={styles.adopter}>Adotado</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Não existem pets cadastrados no sistema!</p>}
      </div>
    </section>
  );
};

export default Home;
