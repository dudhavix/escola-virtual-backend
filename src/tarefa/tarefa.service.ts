import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { TarefaCreateViewModel, TarefaUpdateViewModel } from "./tarefa.dto";
import { TarefaFactory } from "./tarefa.factory";
import { Tarefa } from "./tarefa.interface";
import { TarefaRepository } from "./tarefa.repository";

@Injectable()
export class TarefaService {
    private logger = new Logger(TarefaService.name);

    constructor(
        @Inject("TarefaRepository") private readonly repository: TarefaRepository,
    ){ }

    async create(tarefa: TarefaCreateViewModel): Promise<HttpException> {
        try {
            const entity = TarefaFactory(tarefa);
            await this.repository.create(entity);
            return new HttpException('Tarefa criada', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAll(): Promise<Tarefa[] | HttpException> {
        try {
            var tarefas = await this.repository.getAll();
            if (!tarefas.length) {
                return new HttpException('Nenhuma tarefa encontrada', HttpStatus.NOT_FOUND);
            }
            return tarefas;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Tarefa | HttpException> {
        try {
            var tarefa = await this.repository.getId(_id);
            if (!tarefa) {
                return new HttpException('Nenhuma tarefa encontrada', HttpStatus.NOT_FOUND);
            }
            return tarefa;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(tarefa: TarefaUpdateViewModel): Promise<HttpException> {
        try {
            const { _id, ...info} = tarefa;
            const entity = TarefaFactory(info);
            await this.repository.update(entity, _id);
            return new HttpException('Tarefa atualizada', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Tarefa excluida', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}