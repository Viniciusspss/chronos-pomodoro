import { Input } from "../Input";
import styles from "./styles.module.css";

export function Form() {
  return (
    <form className={styles.form} action="">
      <div className={styles.formRow}>
        <Input type="text" id="input" />
      </div>

      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={styles.formRow}>
        <p>Ciclos</p>
        <p>0 0 0 0 0</p>
      </div>

      <div className={styles.formRow}>
        <button>Enviar</button>
      </div>
    </form>
  );
}
