import {
  Controller,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthenticatedGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query('status') status: 'pending' | 'done') {
    return {
      data: this.tasksService.getTasks(status),
    };
  }

  @Get(':id')
  getOneTask(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: this.tasksService.getOneTask(id),
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  createTask(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return {
      data: this.tasksService.createTask(createTaskDto),
    };
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return {
        data: this.tasksService.updateTask(id, updateTaskDto),
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  removeTask(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        data: this.tasksService.removeTask(id),
      };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
