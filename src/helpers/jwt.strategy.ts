import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    
    constructor() {
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: process.env.IGNORAR_EXPERICAO_TOKEN,
            secretOrKey: process.env.SECRET,
        });
        
    }
    
    async validate(payload: any){
        return { _id: payload.sub, acesso: payload.acesso };
    }
}