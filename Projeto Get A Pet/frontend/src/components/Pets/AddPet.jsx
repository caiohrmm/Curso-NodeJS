import styles from "./AddPet.module.css";

import api from "../../utils/api";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useFlashMessage } from "../../hooks/useFlashMessage";

const AddPet = () => {
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Após o cadastro, ele ficará disponível para adoção!</p>
      </div>
      <form action=""></form>
    </section>
  );
};

export default AddPet;
