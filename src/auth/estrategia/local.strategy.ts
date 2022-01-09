import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { MensagemHelper } from "../../helpers/mensagens.helper";
import { AuthService } from "../auth.service";

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
        if(!usuario) throw new UnauthorizedException(MensagemHelper.EMAIL_OU_SENHA_INVALIDO);
        return usuario;
    }
}