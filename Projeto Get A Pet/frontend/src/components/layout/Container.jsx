// Importando css do container
import styles from "./Container.module.css";

const Container = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
  // Preciso usar children para conseguir armazenar os outros componentes dentro do meu container.
};

export default Container;
