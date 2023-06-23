import styles from "./Input.module.css";

// Passo todas as props de todos os atributos que preciso ter acesso em meu input e label, esses dados virao da API.
const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
}) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? {multiple} : '')}
      />
    </div>
  );
};

export default Input;
