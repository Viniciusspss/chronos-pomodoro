import { useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";

type TaskContextProvidesProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProvidesProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  console.log(state);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
