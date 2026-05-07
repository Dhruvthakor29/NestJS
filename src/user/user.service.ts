import { Catch, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { user } from './Schemas/user.schema'
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(user.name) private userModel: Model<user>) { }

    async createUser(registerUserDto: RegisterUserDto) {
        try {
            const { fname, lname, email, password } = registerUserDto;
             return  await this.userModel.create({
                fname,
                lname,
                email,   
                password,
            });
        } catch (err) {
            console.log(err);

            const e = err as { code?: number }
            const duplicate_key_code = 11000;
            if (e.code === duplicate_key_code) {
                throw new ConflictException("Email already exists");
            }
            throw err;
        }
    }

    async findByEmail(email: string) {
    
    return this.userModel.findOne({ email });
    
  }
}
