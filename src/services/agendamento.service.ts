import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { AgendamentoCreateFactory } from "../entities/agendamento.entity";
import { DI_AGENDAMENTO_REPOSITORY } from "../helpers/container-names";
import { AcaoEnum, MensagensEnum } from "../helpers/index.enum";
import { Agendamento } from "../interfaces/agendamento.interface";
import { Usuario } from "../interfaces/usuario.interface";
import { AgendamentoCreateModel } from "../models/agendamento.model";
import { AgendamentoRepository } from "../repositories/agendamento.repository";
import { AuditoriaService } from "./auditoria.service";

@Injectable()
export class AgendamentoService {

    private logger = new Logger(AgendamentoService.name);

    constructor(
        @Inject(DI_AGENDAMENTO_REPOSITORY) private readonly repository: AgendamentoRepository,
        private readonly auditoriaServie: AuditoriaService
    ) { }

    async create(agendamento: AgendamentoCreateModel, usuario: Usuario): Promise<void> {
        try {
            const entity = AgendamentoCreateFactory(agendamento, usuario);
            const novoAgendamento = await this.repository.create(entity);
            await this.auditoriaServie.create(usuario, `${AcaoEnum.criouAgendamento} ${novoAgendamento._id}`);
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async getAll(usuario: Usuario): Promise<Agendamento[]> {
        try {
            const agendamentos = await this.repository.getAll(usuario);
            if (!agendamentos) {
                throw new NotFoundException(MensagensEnum.naoEncontrado);
            }
            return agendamentos;
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async getId(_id: string, usuario: Usuario): Promise<Agendamento> {
        try {
            const agendamento = await this.repository.getId(_id, usuario);
            if (!agendamento) {
                throw new NotFoundException(MensagensEnum.naoEncontrado);
            }
            return agendamento;
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }

    async cancelado(_id: string, usuario: Usuario): Promise<void> {
        try {
            await this.repository.cancelado(_id, usuario);
            await this.auditoriaServie.create(usuario, `${AcaoEnum.cancelouAgendamento} ${_id}`);
        } catch (error) {
            this.logger.error(error);
            throw new Error(MensagensEnum.erro);
        }
    }
}