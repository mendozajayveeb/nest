import { MinLength, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @MinLength(3)
  name: string;

  @IsEnum(['pending', 'done'], { message: 'Invalid status.' })
  status: 'pending' | 'done';
}
