import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async registerUser(registerDto: RegisterUserDto) {
        console.log(registerDto);

        const { fname, lname, email, password } = registerDto;

        const hash = await bcrypt.hash(password, 10);

        const user = await this.userService.createUser( {fname, lname, email, password: hash });

        return {message : "User registered successfully" , user};
    }
}
