import styles from "./MyPets.module.css";

import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

const MyPets = () => {
  const [pets, setPets] = useState([]);

  return (
    <section>
      <h1>Meus Pets</h1>
      <div className={styles.mypets_container}>
        {pets.length > 0 && <h2>Pets cadastrados</h2>}
        {pets.length === 0 && (
          <>
            <h2>Não existem pets cadastrados...</h2>
            <h3>
              <NavLink to={"/pet/add"}>Clique aqui</NavLink>
              &nbsp;para adicionar um pet !
            </h3>
          </>
        )}
      </div>
    </section>
  );
};

export default MyPets;
