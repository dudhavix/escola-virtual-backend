import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { Module } from '@nestjs/common';
import * as dotenv from "dotenv";
import { MongooseModule } from '@nestjs/mongoose';
import { IndexController } from './index.controller';
import { UsuarioSchema } from './usuario/usuario.schema';
import { UsuarioRepository } from './usuario/usuario.repository';
import { ProfessorRepository } from './professor/professor.repository';
import { ProfessorService } from './professor/professor.service';
import { ProfessorSchema } from './professor/professor.schema';
import { AlunoSchema } from './aluno/aluno.schema';
import { AlunoService } from './aluno/aluno.service';
import { AlunoRepository } from './aluno/aluno.repository';
import { TurmaSchema } from './turma/turma.schema';
import { TurmaController } from './turma/turma.controller';
import { TurmaRepository } from './turma/turma.repository';
import { TurmaService } from './turma/turma.service';
import { ArquivoSchema } from './arquivo/arquivo.schema';
import { ArquivoController } from './arquivo/arquivo.controller';
import { ArquivoService } from './arquivo/arquivo.service';
import { ArquivoRepository } from './arquivo/arquivo.repository';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(`${process.env.BD_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }),
        MongooseModule.forFeature([{name: 'Aluno', schema: AlunoSchema}]),
        MongooseModule.forFeature([{name: 'Arquivo', schema: ArquivoSchema}]),
        MongooseModule.forFeature([{name: 'Professor', schema: ProfessorSchema}]),
        MongooseModule.forFeature([{name: 'Turma', schema: TurmaSchema}]),
        MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]),
    ],
    controllers: [
        ArquivoController,
        TurmaController,
        UsuarioController,
        IndexController
    ],
    providers: [
        AlunoService,
        {
            provide: "AlunoRepository",
            useClass: AlunoRepository
        },
        ArquivoService,
        {
            provide: "ArquivoRepository",
            useClass: ArquivoRepository
        },
        ProfessorService,
        {
            provide: "ProfessorRepository",
            useClass: ProfessorRepository
        },
        TurmaService,
        {
            provide: "TurmaRepository",
            useClass: TurmaRepository
        },
        UsuarioService,
        {
            provide: "UsuarioRepository",
            useClass: UsuarioRepository
        }
    ],
})
export class AppModule { }
