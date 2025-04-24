import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionsTypes } from "./taskActions";
import { loadBeep } from "./../../utils/loadBeep";
import { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProvidesProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProvidesProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state");
    if (!storageState) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;
    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });
  const worker = TimerWorkerManager.getInstance();

  const playBeepRef = useRef<() => void | null>(null);

  worker.onmessage((e) => {
    const countDownSeconds = e.data;
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
    localStorage.setItem("state", JSON.stringify(state));
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
