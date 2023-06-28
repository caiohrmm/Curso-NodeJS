import React, { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

const PetForm = ({ handleSubmit, btnText, petData }) => {
  // Como utilizarei o mesmo componente para edição e adição, entao posso ter dados já pré-estabelecidos de pet.
  const [pet, setPet] = useState(petData || {});
  // Posso ter preview de multiplas imagens, por isso o array.
  const [preview, setPreview] = useState([]);

  // Opcao que salva as imagens no atributo de images do pet
  const onFileChange = (e) => {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  };

  // Pega todos os atributos do pet
  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  // Pega o valor da cor
  const handleColor = (e) => {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(pet);
  };

  const colors = [
    "Branco",
    "Preto",
    "Cinza",
    "Caramelo",
    "Mesclado",
    "Dourado",
    "Creme",
    "Vermelho",
    "Chocolate",
  ];
  return (
    <form className={formStyles.form_container} onSubmit={submit}>
      <div className={formStyles.preview}>
        {/* Caso houver preview, renderiza as imagens de preview com o map, caso contrario as imagens do pet padrao */}
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}.${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}.${index}`}
              />
            ))}
      </div>
      <Input
        text="Imagens do pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do pet"
        type="text"
        name="name"
        handleOnChange={handleChange}
        placeholder="Digite o nome do Pet..."
        value={pet.name || ""}
      />
      <Input
        text="Idade do pet"
        type="text"
        name="age"
        handleOnChange={handleChange}
        placeholder="Digite a idade do Pet..."
        value={pet.age || ""}
      />
      <Input
        text="Peso do pet"
        type="number"
        name="weight"
        handleOnChange={handleChange}
        placeholder="Digite o peso do Pet..."
        value={pet.weight || ""}
      />
      <Select
        options={colors}
        name="color"
        text="Selecione a cor"
        handleOnChange={handleColor}
        value={pet.color || ''}
      />

      <input type="submit" value={btnText} />
    </form>
  );
};

export default PetForm;
