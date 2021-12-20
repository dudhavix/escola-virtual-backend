import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { TurmaCreateViewModel } from "src/turma/turma.dto";
import { TurmaFactory } from "./turma.factory";
import { Professor } from "../professor/professor.interface";
import { Turma } from "./turma.interface";
import { TurmaRepository } from "./turma.repository";

@Injectable()
export class TurmaService {

    private logger = new Logger(TurmaService.name);

    constructor(
        @Inject("TurmaRepository") private readonly repository: TurmaRepository,
    ){ }

    async create(turma: TurmaCreateViewModel): Promise<HttpException> {
        try {
            const entity = TurmaFactory(turma);
            await this.repository.create(entity);
            return new HttpException('Turma criada com sucesso', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getAll(professor: Professor): Promise<Turma[] | HttpException> {
        try {
            var turmas = await this.repository.getAll(professor);
            if (!turmas.length) {
                return new HttpException('Nenhuma turma encontrada', HttpStatus.NOT_FOUND);
            }
            return turmas;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Turma | HttpException> {
        try {
            var turma = await this.repository.getId(_id);
            if (!turma) {
                return new HttpException('Nenhuma turma encontrada', HttpStatus.NOT_FOUND);
            }
            return turma;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
}