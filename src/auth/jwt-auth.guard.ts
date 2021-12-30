import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private logger = new Logger(JwtAuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<any> {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        try {
            console.log(await super.canActivate(context));
            
            return super.canActivate(context);
        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException();
        }
    }

    handleRequest(err, user, info) {
        console.log(user);
        
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
