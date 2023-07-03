import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks = [
    { id: 1, name: 'Eat breakfast', status: 'done' },
    { id: 2, name: 'Clean the room', status: 'pending' },
  ];

  getTasks(status?: 'pending' | 'done') {
    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }

    return this.tasks;
  }

  getOneTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new Error('No data found.');
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: Date.now(),
      ...createTaskDto,
    };

    const tasks = this.tasks.push(newTask);

    return this.getTasks();
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...updateTaskDto };
      }

      return task;
    });

    return this.getTasks();
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return this.getTasks();
  }
}
