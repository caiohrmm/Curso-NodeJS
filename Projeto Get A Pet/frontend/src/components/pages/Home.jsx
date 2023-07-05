import api from "../../utils/api";

import { useState, useEffect } from "react";

import NavLink from "react-router-dom";

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
          pets.map((pet) => <div className={styles.pet}></div>)}
        {pets.length === 0 && <p>Não existem pets cadastrados no sistema!</p>}
      </div>
    </section>
  );
};

export default Home;
