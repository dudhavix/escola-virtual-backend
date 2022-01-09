import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "src/turma/turma.dto";
import { TurmaFactory } from "./turma.factory";
import { Professor } from "../professor/professor.interface";
import { Turma } from "./turma.interface";
import { TurmaRepository } from "./turma.repository";
import { Resposta } from "../helpers/resposta.interface";

@Injectable()
export class TurmaService {

    private logger = new Logger(TurmaService.name);

    constructor(
        @Inject("TurmaRepository") private readonly repository: TurmaRepository,
    ){ }

    async create(turma: TurmaCreateViewModel): Promise<Resposta> {
        try {
            const entity = TurmaFactory(turma);
            await this.repository.create(entity);
            return { menssagem: "Turma criada.", status: HttpStatus.CREATED }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
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
            throw new BadRequestException("Desculpe ocorreu um erro");
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
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(turma: TurmaUpdateViewModel): Promise<HttpException> {
        try {
            const { _id, ...info} = turma;
            const entity = TurmaFactory(info);
            await this.repository.update(entity, _id);
            return new HttpException('Turma atualizada', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Turma excluida', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}