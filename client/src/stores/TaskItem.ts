import { action, makeObservable, observable } from 'mobx';
import { Task } from "./store-provider";
import socket from "../socketClient";

export default class TaskItem {
  id?: string;
  title!: string;
  description!: string;
  due_date!: string;
  completed: boolean = false;

  constructor(task: Task) {
    makeObservable(this, {
      description: observable,
      title: observable,
      due_date: observable,
      completed: observable,
      toggleCompletion: action,
    });

    this.id = 'id' in task ? task.id : undefined;
    this.title = task.title;
    this.description = task.description;
    this.due_date = task.due_date;
    this.completed = task.completed;
  }

  toggleCompletion = (taskId: string) => {
    socket.emit("task:toggle:completed", taskId, (response: any) => {
      if (response && "error" in response) {
        // handle the error
        return;
      }
      this.completed = !this.completed;
    });
  };
}
