import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterUserDto) {
    const Token = await this.authService.registerUser(registerDto);    
    return Token;
    }


    @Post('login')
    async login(@Body() LoginUserDto: LoginUserDto) {
        const result = await this.authService.LoginUser(LoginUserDto);
        return result;
    }

}
