import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ArquivoController } from './controllers/arquivo.controller';
import { AuthController } from './controllers/auth.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { ArquivoSchema } from './entities/arquivo.entity';
import { AuditoriaSchema } from './entities/auditoria.entity';
import { UsuarioSchema } from './entities/usuario.entity';
import { DI_ARQUIVO_REPOSITORY, DI_ARQUIVO_SCHEMA, DI_AUDITORIA_REPOSITORY, DI_AUDITORIA_SCHEMA, DI_USUARIO_REPOSITORY, DI_USUARIO_SCHEMA } from './helpers/container-names';
import { JwtStrategy } from './helpers/jwt.strategy';
import { LocalStrategy } from './helpers/local.strategy';
import { ArquivoRepository } from './repositories/arquivo.repository';
import { AuditoriaRepository } from './repositories/auditoria.repository';
import { UsuarioRepository } from './repositories/usuario.repository';
import { ArquivoService } from './services/arquivo.service';
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
        MongooseModule.forFeature([{ name: DI_ARQUIVO_SCHEMA, schema: ArquivoSchema }]),
    ],
    controllers: [
        ArquivoController,
        AuthController,
        UsuarioController,
    ],
    providers: [
        ArquivoService,
        AuditoriaService,
        AuthService,
        JwtStrategy,
        LocalStrategy,
        UsuarioService,
        { provide: DI_ARQUIVO_REPOSITORY, useClass: ArquivoRepository },
        { provide: DI_AUDITORIA_REPOSITORY, useClass: AuditoriaRepository },
        { provide: DI_USUARIO_REPOSITORY, useClass: UsuarioRepository },
    ],
})
export class AppModule { }
