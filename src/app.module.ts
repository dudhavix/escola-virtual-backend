import { Module } from '@nestjs/common';
import * as dotenv from "dotenv";
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './professor/professor.schema';
import { AgendamentoSchema } from './agendamento/agendamento.schema';
import { AlunoSchema } from './aluno/aluno.schema';
import { ArquivoSchema } from './arquivo/arquivo.schema';
import { AulaSchema } from './aula/aula.schema';
import { GramaticaSchema } from './gramatica/gramatica.schema';
import { PautaSchema } from './pauta/pauta.schema';
import { TarefaAlunoSchema } from './tarefa-aluno/tarefa-aluno.schema';
import { TarefaSchema } from './tarefa/tarefa.schema';
import { TurmaAulaSchema } from './turma-aula/turma-aula.schema';
import { TurmaSchema } from './turma/turma.schema';
import { ProfessorRepository } from './professor/professor.repository';
import { ProfessorController } from './professor/professor.controller';
import { ProfessorService } from './professor/professor.service';
import { TurmaRepository } from './turma/turma.repository';
import { TurmaService } from './turma/turma.service';
import { TurmaController } from './turma/turma.controller';
import { ArquivoService } from './arquivo/arquivo.service';
import { ArquivoRepository } from './arquivo/arquivo.repository';
import { ArquivoController } from './arquivo/arquivo.controller';
import { AulaRepository } from './aula/aula.repository';
import { AulaService } from './aula/aula.service';
import { AulaController } from './aula/aula.controller';
import { TurmaAulaService } from './turma-aula/turma-aula.service';
import { TurmaAulaRepository } from './turma-aula/turma-aula.repository';
import { TurmaAulaController } from './turma-aula/turma-aula.controller';
import { GramaticaRepository } from './gramatica/gramatica.repository';
import { GramaticaService } from './gramatica/gramatica.service';
import { GramaticaController } from './gramatica/gramatica.controller';
import { AgendamentoController } from './agendamento/agendamento.controller';
import { AgendamentoService } from './agendamento/agendamento.service';
import { AgendamentoRepository } from './agendamento/agendamento.repository';
import { TarefaController } from './tarefa/tarefa.controller';
import { TarefaService } from './tarefa/tarefa.service';
import { TarefaRepository } from './tarefa/tarefa.repository';
import { AlunoService } from './aluno/aluno.service';
import { AlunoRepository } from './aluno/aluno.repository';
import { AlunoController } from './aluno/aluno.controller';
import { TarefaAlunoController } from './tarefa-aluno/tarefa-aluno.controller';
import { TarefaAlunoService } from './tarefa-aluno/tarefa-aluno.service';
import { TarefaAlunoRepository } from './tarefa-aluno/tarefa-aluno.repository';
import { PautaController } from './pauta/pauta.controller';
import { PautaRepository } from './pauta/pauta.repository';
import { PautaService } from './pauta/pauta.service';
import { IndexController } from './index.controller';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(`${process.env.BD_URL}`,
        { useNewUrlParser: true, useUnifiedTopology: true }),
    
        MongooseModule.forFeature([{name: 'Agendamento', schema: AgendamentoSchema}]),
        MongooseModule.forFeature([{name: 'Aluno', schema: AlunoSchema}]),
        MongooseModule.forFeature([{name: 'Arquivo', schema: ArquivoSchema}]),
        MongooseModule.forFeature([{name: 'Aula', schema: AulaSchema}]),
        MongooseModule.forFeature([{name: 'Gramatica', schema: GramaticaSchema}]),
        MongooseModule.forFeature([{name: 'Pauta', schema: PautaSchema}]),
        MongooseModule.forFeature([{name: 'Professor', schema: ProfessorSchema}]),
        MongooseModule.forFeature([{name: 'Tarefa', schema: TarefaSchema}]),
        MongooseModule.forFeature([{name: 'TarefaAluno', schema: TarefaAlunoSchema}]),
        MongooseModule.forFeature([{name: 'Turma', schema: TurmaSchema}]),
        MongooseModule.forFeature([{name: 'TurmaAula', schema: TurmaAulaSchema}]),
    ],
    controllers: [
        ProfessorController,
        TurmaController,
        ArquivoController,
        AulaController,
        TurmaAulaController,
        GramaticaController,
        AgendamentoController,
        TarefaController,
        AlunoController,
        TarefaAlunoController,
        PautaController,
        IndexController
    ],
    providers: [
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
        ArquivoService,
        {
            provide: "ArquivoRepository",
            useClass: ArquivoRepository
        },
        AulaService,
        {
            provide: "AulaRepository",
            useClass: AulaRepository
        },
        TurmaAulaService,
        {
            provide: "TurmaAulaRepository",
            useClass: TurmaAulaRepository
        },
        GramaticaService,
        {
            provide: "GramaticaRepository",
            useClass: GramaticaRepository
        },
        AgendamentoService,
        {
            provide: "AgendamentoRepository",
            useClass: AgendamentoRepository
        },
        TarefaService,
        {
            provide: "TarefaRepository",
            useClass: TarefaRepository
        },
        AlunoService,
        {
            provide: "AlunoRepository",
            useClass: AlunoRepository
        },
        TarefaAlunoService,
        {
            provide: "TarefaAlunoRepository",
            useClass: TarefaAlunoRepository
        },
        PautaService,
        {
            provide: "PautaRepository",
            useClass: PautaRepository
        }
    ],
})
export class AppModule { }
