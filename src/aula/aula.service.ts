import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Professor } from "../professor/professor.interface";
import { AulaCreateViewModel, AulaUpdateViewModel } from "./aula.dto";
import { AulaFactory } from "./aula.factory";
import { Aula } from "./aula.interface";
import { AulaRepository } from "./aula.repository";

@Injectable()
export class AulaService {

    private logger = new Logger(AulaService.name);

    constructor(
        @Inject("AulaRepository") private readonly repository: AulaRepository,
    ){ }

    async create(aula: AulaCreateViewModel): Promise<HttpException> {
        try {
            const entity = AulaFactory(aula);
            await this.repository.create(entity);
            return new HttpException('Aula criada', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAll(professor: Professor): Promise<Aula[] | HttpException> {
        try {
            var aulas = await this.repository.getAll(professor);
            if (!aulas.length) {
                return new HttpException('Nenhuma aula encontrada', HttpStatus.NOT_FOUND);
            }
            return aulas;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Aula | HttpException> {
        try {
            var aula = await this.repository.getId(_id);
            if (!aula) {
                return new HttpException('Nenhuma aula encontrada', HttpStatus.NOT_FOUND);
            }
            return aula;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(aula: AulaUpdateViewModel): Promise<HttpException> {
        try {
            const { _id, ...info} = aula;
            const entity = AulaFactory(info);
            await this.repository.update(entity, _id);
            return new HttpException('Aula atualizada', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Aula excluida', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}