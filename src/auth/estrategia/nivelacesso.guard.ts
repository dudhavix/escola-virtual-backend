import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class NivelAcessoGuard implements CanActivate {

    constructor(
        private reflector: Reflector
    ){}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const nivelAcesso = this.reflector.get("nivelAcesso", context.getHandler());
        if (!nivelAcesso) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const usuario = request.user;
        return usuario.nivelAcesso == nivelAcesso;
    }
}
