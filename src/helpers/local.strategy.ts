import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { MensagensEnum } from "./index.enum";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ){
        super({
            usernameField: "email",
            passwordField: "senha"
        })
    }

    async validate(email: string, senha: string){
        const usuario = await this.authService.validaUsuario(email, senha);
        if(!usuario) throw new UnauthorizedException(MensagensEnum.naoAutorizado);
        return usuario;
    }
}