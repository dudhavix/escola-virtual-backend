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
        const acesso = this.reflector.get("acesso", context.getHandler());
        if (!acesso) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const usuario = request.user;
        return usuario.acesso == acesso;
    }
}
