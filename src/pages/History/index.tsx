import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate/index";
import { Button } from "./../../components/Button/index";
import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length >= 1;
  const sortedTasks = [...state.tasks].sort((a, b) => {
    return b.startDate - a.startDate;
  });

  function handleResetHistory() {
    if (!confirm("Tem certeza que deseja limpar o histórico?")) return;
    dispatch({ type: TaskActionsTypes.RESET });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <Button
                icon={<TrashIcon />}
                color="red"
                aria-label="Apagar todo o histórico"
                title="Apagar hsitórico"
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks ? (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Duração</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: "Foco",
                    shortBreakTime: "Descanso curto",
                    longBreakTime: "Descanso longo",
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Heading>Nenhuma tarefa registrada!</Heading>
        )}
      </Container>
    </MainTemplate>
  );
}
