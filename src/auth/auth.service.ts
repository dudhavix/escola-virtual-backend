import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { Usuario } from '../usuario/usuario.interface';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService { 
    constructor(
        private readonly usuarioService:UsuarioService,
        private readonly jwtService:JwtService,
    ){}

    async validaUsuario(email: string, senha: string): Promise<Usuario>{
        const usuario = await this.usuarioService.getEmail(email);
        const isSenhaValida = compareSync(senha, usuario.senha);
        if(!isSenhaValida) return null;
        return usuario
    }

    async login(usuario: Usuario): Promise<string> {
        const payload = {sub: usuario._id, acesso: usuario.nivelAcesso};
        return this.jwtService.sign(payload);
    }
}
