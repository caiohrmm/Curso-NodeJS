// Import CSS
import formStyles from "../../form/Form.module.css";
import styles from "./Profile.module.css";

// Importando API
import api from "../../../utils/api";

// Importando componentes
import Input from "../../form/Input";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({})
  // Pego o token do meu localStorage
  const [token] = useState(localStorage.getItem("token" || ""));

  useEffect(() => {
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => setUser(response.data))
  }, [token]);


  const onFileChange = (e) => {};

  const handleChange = (e) => {};

  
  return (
    <section>
      <div className={styles.profile_container}>
        <h1>Perfil</h1>
        <p>Preview da imagem</p>
        <Input
          text="Selecione uma imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
      </div>
      <form className={formStyles.form_container}>
        <Input
          text="Nome"
          type="text"
          name="name"
          handleOnChange={handleChange}
          value={user.name || ""}
          placeholder="Digite seu nome..."
        />

        <Input
          text="E-mail"
          type="email"
          name="email"
          handleOnChange={handleChange}
          value={user.email || ""}
          placeholder="Digite seu e-mail..."
        />

        <Input
          text="Telefone"
          type="text"
          name="phone"
          handleOnChange={handleChange}
          placeholder="Digite seu telefone..."
          value={user.phone || ""}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          handleOnChange={handleChange}
          placeholder="Digite sua senha..."
        />
        <Input
          text="Confirme sua senha"
          type="password"
          name="password"
          handleOnChange={handleChange}
          placeholder="Confirme sua senha..."
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
};

export default Profile;
