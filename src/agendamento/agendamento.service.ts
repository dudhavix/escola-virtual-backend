import { HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EmitirMensagemHelper } from "../helpers/emitirMensagem.helper";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Resposta } from "../helpers/resposta.interface";
import { Professor } from "../professor/professor.interface";
import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { AgendamentoCreateFactory, AgendamentoRemarcarFactory } from "./agendamento.factory";
import { Agendamento } from "./agendamento.interface";
import { AgendamentoRepository } from "./agendamento.repository";

@Injectable()
export class AgendamentoService {

    private logger = new Logger(AgendamentoService.name);

    constructor(
        @Inject("AgendamentoRepository") private readonly repository: AgendamentoRepository,
    ) { }

    async create(agendamento: AgendamentoCreateViewModel, professor: Professor): Promise<Resposta> {
        const entity = AgendamentoCreateFactory(agendamento, professor);
        await this.repository.create(entity);
        return { status: HttpStatus.CREATED, menssagem: MensagemHelper.CRIADO_SUCESSO }
    }

    async getAll(professor: Professor): Promise<Agendamento[]> {
        return await this.repository.getAll(professor);
    }

    async getId(_id: string, professor: Professor): Promise<Agendamento> {
        try {
            const agendamento = await this.repository.getId(_id, professor);
            return agendamento;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(error.status)
        }
    }

    async remarcar(agendamento: AgendamentoUpdateViewModel, professor: Professor): Promise<Resposta> {
        const entity = AgendamentoRemarcarFactory(agendamento);
        await this.repository.remarcar(entity, professor);
        return { status: HttpStatus.OK, menssagem: MensagemHelper.ALTERACOES_REALIZADAS };
    }

    async cancelar(_id: string, professor: Professor): Promise<Resposta> {
        await this.repository.cancelar(_id, professor);
        return { status: HttpStatus.OK, menssagem: MensagemHelper.ALTERACOES_REALIZADAS };
    }

    async concluir(_id: string, professor: Professor): Promise<Resposta> {
        await this.repository.concluir(_id, professor);
        return { status: HttpStatus.OK, menssagem: MensagemHelper.ALTERACOES_REALIZADAS };
    }
}