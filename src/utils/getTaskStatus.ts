import { TaskModel } from "../models/TaskModel";

export function getTaskStatus(state: TaskModel, activeTask: TaskModel | null) {
  if (state.completeDate) return "Completa";
  if (state.interruptDate) return "Interrompida";
  if (activeTask && state.id === activeTask.id) return "Em progresso";
  return "Abandonada";
}
