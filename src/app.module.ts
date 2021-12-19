import { Module } from '@nestjs/common';
import * as dotenv from "dotenv";
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './domain/repository/schema/professor.schema';
import { AgendamentoSchema } from './domain/repository/schema/agendamento.schema';
import { AlunoSchema } from './domain/repository/schema/aluno.schema';
import { ArquivoSchema } from './domain/repository/schema/arquivo.schema';
import { AulaSchema } from './domain/repository/schema/aula.schema';
import { GramaticaSchema } from './domain/repository/schema/gramatica.schema';
import { PautaSchema } from './domain/repository/schema/pauta.schema';
import { TarefaAlunoSchema } from './domain/repository/schema/tarefa-aluno.schema';
import { TarefaSchema } from './domain/repository/schema/tarefa.schema';
import { TurmaAulaSchema } from './domain/repository/schema/turma-aula.schema';
import { TurmaSchema } from './domain/repository/schema/turma.schema';
import { ProfessorRepository } from './domain/repository/professor.repository';
import { ProfessorController } from './adapter/controllers/professor.controller';
import { ProfessorService } from './domain/service/professor.service';
import { TurmaRepository } from './domain/repository/turma.repository';
import { TurmaService } from './domain/service/turma.service';
import { TurmaController } from './adapter/controllers/turma.controller';

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
        MongooseModule.forFeature([{name: 'TarefaAluno', schema: TarefaAlunoSchema}]),
        MongooseModule.forFeature([{name: 'Tarefa', schema: TarefaSchema}]),
        MongooseModule.forFeature([{name: 'TurmaAula', schema: TurmaAulaSchema}]),
        MongooseModule.forFeature([{name: 'Turma', schema: TurmaSchema}]),
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
