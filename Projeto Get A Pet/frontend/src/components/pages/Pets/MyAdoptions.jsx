import { useState, useEffect } from "react";
import api from "../../../utils/api";

import dashboard from "./Dashboard.module.css";

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

  return <div>MyAdoptions</div>;
};

export default MyAdoptions;
