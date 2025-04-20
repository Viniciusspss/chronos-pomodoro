import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextType = getNextCycleType(nextCycle);
  const dipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
    shortBreakTime: (
      <span>Próximo ciclo é de {state.config.shortBreakTime}min</span>
    ),
    longBreakTime: (
      <span>Próximo ciclo é de {state.config.longBreakTime}min</span>
    ),
  };
  const dipsForWhenActiveTask = {
    workTime: <span>Mantenha o foco</span>,
    shortBreakTime: <span>Descanse</span>,
    longBreakTime: <span>Descanso longo</span>,
  };

  return (
    <>
      {state.activeTask && dipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && dipsForNoActiveTask[nextType]}
    </>
  );
}
