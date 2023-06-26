// Import CSS
import formStyles from "../../form/Form.module.css";
import styles from "./Profile.module.css";

// Importando API
import api from "../../../utils/api";

// Importando flash messages
import useFlashMessage from "../../../hooks/useFlashMessage";

// Importando componentes
import Input from "../../form/Input";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  // Pego o token do meu localStorage
  const [token] = useState(localStorage.getItem("token" || ""));

  const { setFlashMessage } = useFlashMessage();
  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => setUser(response.data));
  }, [token]);

  const onFileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Pega todos os dados do formulario e salva dentro do objeto user.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let msgType = "success";

    const formData = new FormData();

    // Me retorna um array com os dados do meu usuário
    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <section>
      <div className={styles.profile_container}>
        <h1>Perfil</h1>
        <p>Preview da imagem</p>
      </div>
      <form className={formStyles.form_container} onSubmit={handleSubmit}>
        <Input
          text="Selecione uma imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
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
          name="confirmpassword"
          handleOnChange={handleChange}
          placeholder="Confirme sua senha..."
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
};

export default Profile;
