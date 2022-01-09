import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Aula } from "../aula/aula.interface";
import { Turma } from "../turma/turma.interface";
import { TurmaAulaCreateViewModel, TurmaAulaUpdateViewModel } from "./turma-aula.dto";
import { TurmaAulaFactory } from "./turma-aula.factory";
import { TurmaAula } from "./turma-aula.interface";
import { TurmaAulaRepository } from "./turma-aula.repository";

@Injectable()
export class TurmaAulaService {

    private logger = new Logger(TurmaAulaService.name);

    constructor(
        @Inject("TurmaAulaRepository") private readonly repository: TurmaAulaRepository,
    ){ }

    async create(turmaAula: TurmaAulaCreateViewModel): Promise<HttpException> {
        try {
            const entity = TurmaAulaFactory(turmaAula);
            await this.repository.create(entity);
            return new HttpException('Turma e aula vinculadas', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAllTurma(turma: Turma): Promise<TurmaAula[] | HttpException> {
        //todas as aulas dessa turma
        try {
            var aulas = await this.repository.getAllTurma(turma);
            if (!aulas.length) {
                return new HttpException('Nenhuma aula vinculada a essa turma', HttpStatus.NOT_FOUND);
            }
            return aulas;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAllAula(aula: Aula): Promise<TurmaAula[] | HttpException> {
        //todas as turmas dessa aula
        try {
            var aulas = await this.repository.getAllAula(aula);
            if (!aulas.length) {
                return new HttpException('Nenhuma turma vinculada a essa aula', HttpStatus.NOT_FOUND);
            }
            return aulas;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAll(): Promise<TurmaAula[] | HttpException> {
        try {
            var turmaAula = await this.repository.getAll();
            if (!turmaAula.length) {
                return new HttpException('Nenhum vinculo encontrado', HttpStatus.NOT_FOUND);
            }
            return turmaAula;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<TurmaAula | HttpException> {
        try {
            var turmaAula = await this.repository.getId(_id);
            if (!turmaAula) {
                return new HttpException('Nenhum vinculo encontrado', HttpStatus.NOT_FOUND);
            }
            return turmaAula;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(turmaAula: TurmaAulaUpdateViewModel): Promise<HttpException> {
        try {
            const { _id, ...info} = turmaAula;
            const entity = TurmaAulaFactory(info);
            await this.repository.update(entity, _id);
            return new HttpException('Vinculo atualizado', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Vinculo excluido', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}