import { BadRequestException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { emitWarning } from "process";
import { StatusEnum } from "../enum/status.enum";
import { EmitirMensagemHelper } from "../helpers/emitirMensagem.helper";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { Agendamento } from "./agendamento.interface";
import { AgendamentoDocument } from "./agendamento.schema";

export class AgendamentoRepository {

    private logger = new Logger(AgendamentoRepository.name);

    constructor(
        @InjectModel("Agendamento") private readonly model: Model<AgendamentoDocument>,
    ) { }

    async create(agendamento: Agendamento): Promise<void> {
        try {
            await new this.model(agendamento).save();
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.CRIADO_ERRO);
        }
    }

    async getAll(professor: Professor): Promise<Agendamento[]> {
        try {
            const agendamentos = await this.model.find({ professor }, ["turma", "dataHora", "status"]).populate("turma", ["nome", "tag"]);
            if (!agendamentos.length) throw new NotFoundException();
            return agendamentos;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(error.status);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Agendamento> {
        const agendamento = await this.model.findOne({ _id, professor }, ["turma", "dataHora", "status"]).populate("turma", ["nome", "tag"]);
        if (!agendamento) throw new NotFoundException();
        return agendamento;
    }

    async remarcar(agendamento: Agendamento, professor: Professor): Promise<void> {
        try {
            const agendamentoUpdate = await this.model.findOne({ _id: agendamento._id, professor, status: StatusEnum.pendente })
            if(!agendamentoUpdate) throw new BadRequestException(MensagemHelper.NADA_ENCONTRADO);
            await this.model.updateOne({ _id: agendamento._id, professor, status: StatusEnum.pendente }, { $set: agendamento });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.ALTERACOES_NAO_REALIZADAS);
        }
    }

    async cancelar(_id: string, professor: Professor): Promise<void> {
        try {
            
            await this.model.findByIdAndUpdate({ _id, professor, status: StatusEnum.pendente }, { $set: {status: StatusEnum.cancelado} });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.ALTERACOES_NAO_REALIZADAS);
        }
    }

    async concluir(_id: string, professor: Professor): Promise<void> {
        try {
            await this.model.findByIdAndUpdate({ _id, professor, status: StatusEnum.pendente }, { $set: {status: StatusEnum.concluido} });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.ALTERACOES_NAO_REALIZADAS);
        }
    }
}