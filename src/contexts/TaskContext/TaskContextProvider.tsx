import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionsTypes } from "./taskActions";
import { loadBeep } from "./../../utils/loadBeep";

type TaskContextProvidesProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProvidesProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimerWorkerManager.getInstance();

  const playBeepRef = useRef<() => void | null>(null);

  worker.onmessage((e) => {
    const countDownSeconds = e.data;
    console.log(countDownSeconds);
    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({ type: TaskActionsTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      console.log("Worker terminado por falta de activeTask");
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} Chronos pomodoro`;

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
