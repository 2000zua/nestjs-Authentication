import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  //contrutor
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto): Promise<User>{
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const createdUser = await this.prisma.user.create({data});

    return {
      ...createdUser,
      password: undefined,
    };
  }
  
  findByEmaik(email: string){
    return this.prisma.user.findUnique({where:{email}})
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
