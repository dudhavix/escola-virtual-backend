import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { GramaticaCreateViewModel, GramaticaUpdateViewModel } from "./gramatica.dto";
import { GramaticaFactory } from "./gramatica.factory";
import { Gramatica } from "./gramatica.interface";
import { GramaticaRepository } from "./gramatica.repository";

@Injectable()
export class GramaticaService {
    private logger = new Logger(GramaticaService.name);

    constructor(
        @Inject("GramaticaRepository") private readonly repository: GramaticaRepository,
    ){ }

    async create(gramatica: GramaticaCreateViewModel): Promise<HttpException> {
        try {
            const entity = GramaticaFactory(gramatica);
            await this.repository.create(entity);
            return new HttpException('Gramática criada', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getAll(): Promise<Gramatica[] | HttpException> {
        try {
            var gramaticas = await this.repository.getAll();
            if (!gramaticas.length) {
                return new HttpException('Nenhuma gramática encontrada', HttpStatus.NOT_FOUND);
            }
            return gramaticas;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Gramatica | HttpException> {
        try {
            var gramatica = await this.repository.getId(_id);
            if (!gramatica) {
                return new HttpException('Nenhuma gramática encontrada', HttpStatus.NOT_FOUND);
            }
            return gramatica;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async update(gramatica: GramaticaUpdateViewModel): Promise<HttpException> {
        try {
            const { _id, ...info } = gramatica;
            const entity = GramaticaFactory(info);
            await this.repository.update(entity, _id);
            return new HttpException('Gramática atualizada', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Gramática excluida', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
}