import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { decriptar } from '../configs/criptografia.service';
import { Usuario } from '../usuario/usuario.interface';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, senha: string): Promise<Usuario> {
        const usuario = await this.usuarioService.getEmail(email);
        if (usuario && decriptar(usuario.senha) === senha) {
            const { senha, ...result } = usuario;
            return result;
        }
        return null;
    }

    async login(usuario: Usuario) {
        const payload = { email: usuario.email, id: usuario._id, nivelAcesso: usuario.nivelAcesso };
        const jwt = this.jwtService.sign(payload)
        return {
            access_token: jwt,
        };
    }
}
