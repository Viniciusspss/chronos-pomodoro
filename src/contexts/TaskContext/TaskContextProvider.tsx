import { useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";

type TaskContextProvidesProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProvidesProps) {
  const [state, setState] = useState(initialTaskState);
  console.log(state);
  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
