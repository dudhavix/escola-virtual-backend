import { ProfessorService } from './professor/professor.service';
import { AlunoController } from './aluno/aluno.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/estrategia/local.strategy';
import { JwtStrategy } from './auth/estrategia/jwt.strategy';

import { AgendamentoSchema } from './agendamento/agendamento.schema';
import { AgendamentoController } from './agendamento/agendamento.controller';
import { AgendamentoService } from './agendamento/agendamento.service';
import { AgendamentoRepository } from './agendamento/agendamento.repository';

import { AlunoSchema } from './aluno/aluno.schema';
import { AlunoService } from './aluno/aluno.service';
import { AlunoRepository } from './aluno/aluno.repository';

import { ArquivoSchema } from './arquivo/arquivo.schema';
import { ArquivoService } from './arquivo/arquivo.service';
import { ArquivoRepository } from './arquivo/arquivo.repository';
import { ArquivoController } from './arquivo/arquivo.controller';

import { AulaSchema } from './aula/aula.schema';
import { AulaRepository } from './aula/aula.repository';
import { AulaService } from './aula/aula.service';
import { AulaController } from './aula/aula.controller';

import { GramaticaSchema } from './gramatica/gramatica.schema';
import { GramaticaRepository } from './gramatica/gramatica.repository';
import { GramaticaService } from './gramatica/gramatica.service';
import { GramaticaController } from './gramatica/gramatica.controller';

import { PautaSchema } from './pauta/pauta.schema';
import { PautaController } from './pauta/pauta.controller';
import { PautaRepository } from './pauta/pauta.repository';
import { PautaService } from './pauta/pauta.service';

import { ProfessorSchema } from './professor/professor.schema';
import { ProfessorRepository } from './professor/professor.repository';

import { TarefaSchema } from './tarefa/tarefa.schema';
import { TarefaController } from './tarefa/tarefa.controller';
import { TarefaService } from './tarefa/tarefa.service';
import { TarefaRepository } from './tarefa/tarefa.repository';

import { TarefaAlunoSchema } from './tarefa-aluno/tarefa-aluno.schema';
import { TarefaAlunoController } from './tarefa-aluno/tarefa-aluno.controller';
import { TarefaAlunoService } from './tarefa-aluno/tarefa-aluno.service';
import { TarefaAlunoRepository } from './tarefa-aluno/tarefa-aluno.repository';

import { TurmaSchema } from './turma/turma.schema';
import { TurmaRepository } from './turma/turma.repository';
import { TurmaService } from './turma/turma.service';
import { TurmaController } from './turma/turma.controller';

import { TurmaAulaSchema } from './turma-aula/turma-aula.schema';
import { TurmaAulaService } from './turma-aula/turma-aula.service';
import { TurmaAulaRepository } from './turma-aula/turma-aula.repository';
import { TurmaAulaController } from './turma-aula/turma-aula.controller';

import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioSchema } from './usuario/usuario.schema';
import { UsuarioRepository } from './usuario/usuario.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
            privateKey: process.env.SECRET,
            signOptions: { expiresIn: "7d" }
        }),
        MongooseModule.forRoot(`${process.env.BD_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }),
        MongooseModule.forFeature([{ name: 'Agendamento', schema: AgendamentoSchema }]),
        MongooseModule.forFeature([{ name: 'Aluno', schema: AlunoSchema }]),
        MongooseModule.forFeature([{ name: 'Arquivo', schema: ArquivoSchema }]),
        MongooseModule.forFeature([{ name: 'Aula', schema: AulaSchema }]),
        MongooseModule.forFeature([{ name: 'Gramatica', schema: GramaticaSchema }]),
        MongooseModule.forFeature([{ name: 'Pauta', schema: PautaSchema }]),
        MongooseModule.forFeature([{ name: 'Professor', schema: ProfessorSchema }]),
        MongooseModule.forFeature([{ name: 'Tarefa', schema: TarefaSchema }]),
        MongooseModule.forFeature([{ name: 'TarefaAluno', schema: TarefaAlunoSchema }]),
        MongooseModule.forFeature([{ name: 'Turma', schema: TurmaSchema }]),
        MongooseModule.forFeature([{ name: 'TurmaAula', schema: TurmaAulaSchema }]),
        MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
    ],
    controllers: [
        AgendamentoController,
        AlunoController,
        ArquivoController,
        AulaController,
        AuthController,
        GramaticaController,
        PautaController,
        TarefaController,
        TarefaAlunoController,
        TurmaController,
        TurmaAulaController,
        UsuarioController,
    ],
    providers: [
        ProfessorService,
        LocalStrategy,
        JwtStrategy,
        AgendamentoService,
        { provide: "AgendamentoRepository", useClass: AgendamentoRepository },

        AlunoService,
        { provide: "AlunoRepository", useClass: AlunoRepository },

        ArquivoService,
        { provide: "ArquivoRepository", useClass: ArquivoRepository },

        AulaService,
        { provide: "AulaRepository", useClass: AulaRepository },

        AuthService,

        GramaticaService,
        { provide: "GramaticaRepository", useClass: GramaticaRepository },

        PautaService,
        { provide: "PautaRepository", useClass: PautaRepository },

        { provide: "ProfessorRepository", useClass: ProfessorRepository },

        TarefaService,
        { provide: "TarefaRepository", useClass: TarefaRepository },

        TarefaAlunoService,
        { provide: "TarefaAlunoRepository", useClass: TarefaAlunoRepository },

        TurmaService,
        { provide: "TurmaRepository", useClass: TurmaRepository },

        TurmaAulaService,
        { provide: "TurmaAulaRepository", useClass: TurmaAulaRepository },

        UsuarioService,
        { provide: "UsuarioRepository", useClass: UsuarioRepository }
    ],
})
export class AppModule { }
