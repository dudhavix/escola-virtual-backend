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

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb+srv://dudhavix:ww!t4aGBNSKsxQx@develop.mu5sk.mongodb.net/escola_virtual?retryWrites=true&w=majority`,
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
        TurmaController
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
        }
    ],
})
export class AppModule { }
