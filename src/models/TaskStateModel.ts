import { TaskModel } from "./TaskModel";

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTaks: TaskModel | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
