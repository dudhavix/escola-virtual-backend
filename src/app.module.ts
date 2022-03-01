import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './helpers/jwt.strategy';
import { LocalStrategy } from './helpers/local.strategy';

import { DI_ARQUIVO_REPOSITORY, DI_ARQUIVO_SCHEMA, DI_AUDITORIA_REPOSITORY, DI_AUDITORIA_SCHEMA, DI_TURMA_REPOSITORY, DI_TURMA_SCHEMA, DI_USUARIO_REPOSITORY, DI_USUARIO_SCHEMA } from './helpers/container-names';

import { ArquivoController } from './controllers/arquivo.controller';
import { ArquivoSchema } from './entities/arquivo.entity';
import { ArquivoRepository } from './repositories/arquivo.repository';
import { ArquivoService } from './services/arquivo.service';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

import { AuditoriaSchema } from './entities/auditoria.entity';
import { AuditoriaRepository } from './repositories/auditoria.repository';
import { AuditoriaService } from './services/auditoria.service';

import { TurmaSchema } from './entities/turma.entity';
import { TurmaRepository } from './repositories/turma.repository';
import { TurmaController } from './controllers/turma.controller';
import { TurmaService } from './services/turma.service';

import { UsuarioRepository } from './repositories/usuario.repository';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { UsuarioSchema } from './entities/usuario.entity';

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
        MongooseModule.forFeature([{ name: DI_ARQUIVO_SCHEMA, schema: ArquivoSchema }]),
        MongooseModule.forFeature([{ name: DI_TURMA_SCHEMA, schema: TurmaSchema }]),
        MongooseModule.forFeature([{ name: DI_USUARIO_SCHEMA, schema: UsuarioSchema }]),
    ],
    controllers: [
        ArquivoController,
        AuthController,
        UsuarioController,
        TurmaController
    ],
    providers: [
        ArquivoService,
        AuditoriaService,
        AuthService,
        JwtStrategy,
        LocalStrategy,
        TurmaService,
        UsuarioService,
        { provide: DI_ARQUIVO_REPOSITORY, useClass: ArquivoRepository },
        { provide: DI_AUDITORIA_REPOSITORY, useClass: AuditoriaRepository },
        { provide: DI_TURMA_REPOSITORY, useClass: TurmaRepository },
        { provide: DI_USUARIO_REPOSITORY, useClass: UsuarioRepository },
    ],
})
export class AppModule { }
