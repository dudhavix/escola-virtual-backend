import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Aluno } from "../aluno/aluno.interface";
import { PautaCreateViewModel, PautaUpdateViewModel } from "./pauta.dto";
import { PautaFactory } from "./pauta.factory";
import { Pauta } from "./pauta.interface";
import { PautaRepository } from "./pauta.repository";

@Injectable()
export class PautaService {
    private logger = new Logger(PautaService.name);

    constructor(
        @Inject("PautaRepository") private readonly repository: PautaRepository,
    ) { }

    async create(pauta: PautaCreateViewModel): Promise<HttpException> {
        try {
            const entity = PautaFactory(pauta);
            await this.repository.create(entity);
            return new HttpException('Pauta criada', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getAll(): Promise<Pauta[] | HttpException> {
        try {
            var pautas = await this.repository.getAll();
            if (!pautas.length) {
                return new HttpException('Nenhuma pauta encontrada', HttpStatus.NOT_FOUND);
            }
            return pautas;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getAllAluno(aluno: Aluno): Promise<Pauta[] | HttpException> {
        try {
            var pautas = await this.repository.getAllAluno(aluno);
            if (!pautas.length) {
                return new HttpException('Nenhuma pauta encontrada com esse aluno', HttpStatus.NOT_FOUND);
            }
            return pautas;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Pauta | HttpException> {
        try {
            var pauta = await this.repository.getId(_id);
            if (!pauta) {
                return new HttpException('Nenhuma pauta encontrada', HttpStatus.NOT_FOUND);
            }
            return pauta;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async update(pauta: PautaUpdateViewModel): Promise<HttpException> {
        try {
            const { _id, ...info } = pauta;
            const entity = PautaFactory(info);
            await this.repository.update(entity, _id);
            return new HttpException('Pauta atualizada', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Pauta excluida', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
}