import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Token } from '../usuario/usuario.interface';
import { AuthService } from './auth.service';

@Controller("api/auth")
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}

    @UseGuards(AuthGuard("local"))
    @Post("/login")
    async login( @Req() req: any ): Promise<{}>{
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/usuario")
    async usuario(@Req() req: Token): Promise<{}>{
        return {
            usuario: {
                nivelAcesso: req.user.nivelAcesso, 
                id: req.user._id
            }
        };
    }
}
