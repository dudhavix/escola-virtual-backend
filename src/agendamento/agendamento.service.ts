import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Professor } from "../professor/professor.interface";
import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { AgendamentoFactory } from "./agendamento.factory";
import { Agendamento } from "./agendamento.interface";
import { AgendamentoRepository } from "./agendamento.repository";

@Injectable()
export class AgendamentoService {
    private logger = new Logger(AgendamentoService.name);

    constructor(
        @Inject("AgendamentoRepository") private readonly repository: AgendamentoRepository,
    ){ }

    async create(agendamento: AgendamentoCreateViewModel): Promise<HttpException> {
        try {
            const entity = AgendamentoFactory(agendamento);
            await this.repository.create(entity);
            return new HttpException('Agendamento criado', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getAll(professor: Professor): Promise<Agendamento[] | HttpException> {
        try {
            var agendamentos = await this.repository.getAll(professor);
            if (!agendamentos.length) {
                return new HttpException('Nenhum agendamento encontrado', HttpStatus.NOT_FOUND);
            }
            return agendamentos;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Agendamento | HttpException> {
        try {
            var agendamento = await this.repository.getId(_id);
            if (!agendamento) {
                return new HttpException('Nenhuma agendamento encontrado', HttpStatus.NOT_FOUND);
            }
            return agendamento;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async update(agendamento: AgendamentoUpdateViewModel): Promise<HttpException> {
        try {
            const { _id, ...info} = agendamento;
            const entity = AgendamentoFactory(info);
            await this.repository.update(entity, _id);
            return new HttpException('Reagendamento realizado', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Agendamento excluido', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
}