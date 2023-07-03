import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Jayvee',
      username: 'jbm123',
      password: '45654',
    },
    {
      id: 2,
      name: 'Mendoza',
      username: 'mendoza123',
      password: '12321',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
