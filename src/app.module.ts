import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { AuditoriaSchema } from './entities/auditoria.entity';
import { UsuarioSchema } from './entities/usuario.entity';
import { DI_AUDITORIA_REPOSITORY, DI_AUDITORIA_SCHEMA, DI_USUARIO_REPOSITORY, DI_USUARIO_SCHEMA } from './helpers/container-names';
import { JwtStrategy } from './helpers/jwt.strategy';
import { LocalStrategy } from './helpers/local.strategy';
import { AuditoriaRepository } from './repositories/auditoria.repository';
import { UsuarioRepository } from './repositories/usuario.repository';
import { AuditoriaService } from './services/auditoria.service';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
            privateKey: process.env.SECRET,
            signOptions: { expiresIn: process.env.TEMPO_EXPIRACAO }
        }),
        MongooseModule.forRoot(`${process.env.BD_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }),
        MongooseModule.forFeature([{ name: DI_AUDITORIA_SCHEMA, schema: AuditoriaSchema }]),
        MongooseModule.forFeature([{ name: DI_USUARIO_SCHEMA, schema: UsuarioSchema }]),
    ],
    controllers: [
        AuthController,
        UsuarioController,
    ],
    providers: [
        AuditoriaService,
        AuthService,
        JwtStrategy,
        LocalStrategy,
        UsuarioService,
        { provide: DI_AUDITORIA_REPOSITORY, useClass: AuditoriaRepository },
        { provide: DI_USUARIO_REPOSITORY, useClass: UsuarioRepository },
    ],
})
export class AppModule { }
