import { SaveIcon } from "lucide-react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { MainTemplate } from "../../templates/MainTemplate/index";
import styles from "./style.module.css";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
import { showMessage } from "../../adapters/showMessage";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeRef = useRef<HTMLInputElement>(null);
  const longBreakTimeRef = useRef<HTMLInputElement>(null);

  function handleSetTime(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();
    const workTime = Number(workTimeRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeRef.current?.value);
    const longBreakTime = Number(longBreakTimeRef.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage.error("Digite apenas números para todos os campos");
      return;
    }

    if (workTime < 1 || workTime > 99) {
      showMessage.error("Digite valores entre 1 e 99 para FOCO");
      return;
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      showMessage.error("Digite valores entre 1 e 30 para DESCANSO CURTO");
      return;
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      showMessage.error("Digite valores entre 1 e 60 para DESCANSO CURTO");
      return;
    }

    dispatch({
      type: TaskActionsTypes.UPDATE_TASK,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success("Configurações salvas");
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as configurações para tempo de foco, descando curto e
          descanso longo
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSetTime} className={styles.form}>
          <div className={styles.formRow}>
            <Input
              labelText="Foco"
              id="workTime"
              ref={workTimeRef}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>
          <div className={styles.formRow}>
            <Input
              labelText="Descanso curto"
              id="shortBreakTime"
              ref={shortBreakTimeRef}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>
          <div className={styles.formRow}>
            <Input
              labelText="Descanso longo"
              id="longBreakTime"
              ref={longBreakTimeRef}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>
          <div className={styles.formRow}>
            <Button
              icon={<SaveIcon />}
              aria-label="Salvar alterações"
              title="Salvar alterações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
