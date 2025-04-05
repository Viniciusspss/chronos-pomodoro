import styles from "./styles.module.css";

type InputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<"input">;

export function Input({ labelText, id, ...rest }: InputProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={styles.input} id={id} {...rest} />
    </>
  );
}
