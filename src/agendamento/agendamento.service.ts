import { Inject, Injectable, Logger } from "@nestjs/common";
import { MensagemEnum } from "../enum/mensagem.enum";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { TurmaService } from "../turma/turma.service";
import { AgendamentoCreateViewModel, AgendamentoUpdateViewModel } from "./agendamento.dto";
import { AgendamentoCreateFactory, AgendamentoRemarcarFactory } from "./agendamento.factory";
import { Agendamento } from "./agendamento.interface";
import { AgendamentoRepository } from "./agendamento.repository";

@Injectable()
export class AgendamentoService {

    private logger = new Logger(AgendamentoService.name);

    constructor(
        @Inject("AgendamentoRepository") private readonly repository: AgendamentoRepository,
        private readonly turmaService: TurmaService,
    ) { }

    async create(agendamento: AgendamentoCreateViewModel, professor: Professor): Promise<void> {
        const idTurma = agendamento.turma as unknown;
        if (!this.validarProfessorTurma(idTurma as string, professor)) EmitirMensagemHelper(MensagemEnum.OPERACAO_NAO_AUTORIZADA);
        try {
            const entity = AgendamentoCreateFactory(agendamento, professor);
            await this.repository.create(entity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
        }
    }

    async getAll(professor: Professor): Promise<Agendamento[]> {
        try {
            const agendamentos = await this.repository.getAll(professor);
            if(!agendamentos) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return agendamentos
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Agendamento> {
        try {
            const agendamento = await this.repository.getId(_id, professor);
            if(!agendamento) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return agendamento
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async remarcar(agendamento: AgendamentoUpdateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = AgendamentoRemarcarFactory(agendamento);
            await this.repository.remarcar(entity, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.ALTERACOES_ERRO);
        }
    }

    async cancelar(_id: string, professor: Professor): Promise<void> {
        try {
            await this.repository.cancelar(_id, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.ALTERACOES_ERRO);
        }
    }

    async concluir(_id: string, professor: Professor): Promise<void> {
        try {
            await this.repository.concluir(_id, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.ALTERACOES_ERRO);
        }
    }

    private async validarProfessorTurma(idTurma: string, professor: Professor): Promise<boolean>{
        const turma = await this.turmaService.getId(idTurma, professor);
        if(turma) return true;
        return false;
    }
}