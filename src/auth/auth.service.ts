import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async registerUser(registerDto: RegisterUserDto) {


        const { password } = registerDto;

        const hash = await bcrypt.hash(password, 10);

        const user = await this.userService.createUser({ ...registerDto, password: hash });


        const payload = { sub: user._id };

        const token = await this.jwtService.signAsync(payload);
        console.log(token);
        return { access_token: token };
    }

    async LoginUser(loginUserDto: LoginUserDto) {
        try {
            const { email, password } = loginUserDto;
            const user = await this.userService.findByEmail(email);

            if (!user) {
                throw new UnauthorizedException('Invalid email');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new UnauthorizedException("Invalid Password");
            }

            const payload = {
                id: user._id,
            };

            
            const token = await this.jwtService.signAsync(payload);

            return {
                message: 'Login successful',
                token,
                user,
            };

        }catch (err) {
            console.log(err);
            throw err;  
            }
        }


}

