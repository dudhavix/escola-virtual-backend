import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { TurmaViewModel } from "src/turma/turma.dto";
import { TurmaFactory } from "./turma.factory";
import { TurmaRepository } from "./turma.repository";
import { Resposta } from "../resposta.interface";

@Injectable()
export class TurmaService {

    private logger = new Logger(TurmaService.name);

    constructor(
        @Inject("TurmaRepository") private readonly repository: TurmaRepository,
    ){ }

    async create(turma: TurmaViewModel): Promise<Resposta> {
        try {
            const entity = TurmaFactory(turma);
            await this.repository.create(entity);
            return { menssagem: "Turma criada", status: HttpStatus.CREATED };
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
}