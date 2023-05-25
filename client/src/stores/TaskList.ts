import { action, computed, makeObservable, observable } from 'mobx';
import TaskItem from './TaskItem';
import {NewTask, Task} from "./store-provider";
import socket from "../socketClient";

export class TaskList {
  list: TaskItem[] = [];

  constructor(tasks: Task[]) {
    makeObservable(this, {
      list: observable.shallow,
      addTask: action,
      removeTask: action,
      tasks: computed,
      count: computed,
    });

    tasks.forEach(this.addTask);
  }

  addTask = (task: NewTask) => {
    socket.emit("task:create", {
      title: task.title,
      description: task.description,
      completed: false,
      due_date: task.due_date,
    }, (response: any) => {
      if (response && "error" in response) {
        // handle the error
        return;
      }
      this.list.push(new TaskItem(task));
    });
  };

  retrieveTaskList = () => {
    socket.emit("task:list", ({ data }: { data: Task[] }) => {
      this.list = data.map((task) => new TaskItem(task));
    });
  };

  removeTask = (task: TaskItem) => {
    socket.emit("task:delete", task.id, (response: any) => {
      if (response && "error" in response) {
        // handle the error
        return;
      }
      this.list.splice(this.list.indexOf(task), 1)
    });
  };

  get tasks() {
    return this.list.filter((task) => !task.completed);
  }

  get archivedTasks() {
    return this.list.filter((task) => task.completed);
  }

  get count() {
    return this.list.length;
  }
}
