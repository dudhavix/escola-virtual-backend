import { Module } from '@nestjs/common';
import * as dotenv from "dotenv";
import { MongooseModule } from '@nestjs/mongoose';
import { AlunoSchema } from './domain/schemas/aluno.schema';
import { TurmaSchema } from './domain/schemas/turma.schema';
import { AlunoController } from './adapter/controllers/aluno.controller';
import { AlunoService } from './domain/services/aluno.service';
import { TurmaController } from './adapter/controllers/turma.controller';
import { TurmaService } from './domain/services/turma.service';
import { PautaSchema } from './domain/schemas/pauta.schema';
import { PautaController } from './adapter/controllers/pauta.controller';
import { PautaService } from './domain/services/pauta.service';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb+srv://dudhavix:ww!t4aGBNSKsxQx@develop.mu5sk.mongodb.net/escola_virtual?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }),
    
        MongooseModule.forFeature([{name: 'Aluno', schema: AlunoSchema}]),
        MongooseModule.forFeature([{name: 'Turma', schema: TurmaSchema}]),
        MongooseModule.forFeature([{name: 'Pauta', schema: PautaSchema}]),
    ],
    controllers: [
        AlunoController,
        TurmaController,
        PautaController
    ],
    providers: [
        AlunoService,
        TurmaService,
        PautaService
    ],
})
export class AppModule { }
