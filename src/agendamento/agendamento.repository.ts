import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StatusEnum } from "../enum/status.enum";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { Agendamento } from "./agendamento.interface";
import { AgendamentoDocument } from "./agendamento.schema";

export class AgendamentoRepository {

    constructor(
        @InjectModel("Agendamento") private readonly model: Model<AgendamentoDocument>,
    ) { }

    async create(agendamento: Agendamento): Promise<void> {
        await new this.model(agendamento).save();
    }

    async getAll(professor: Professor): Promise<Agendamento[]> {
        const agendamentos = await this.model.find({ professor }, ["turma", "dataHora", "status"]).populate("turma", ["nome", "tag"]);
        if (!agendamentos.length) null;
        return agendamentos;
    }

    async getId(_id: string, professor: Professor): Promise<Agendamento> {
        const agendamento = await this.model.findOne({ _id, professor }, ["turma", "dataHora", "status"]).populate("turma", ["nome", "tag"]);
        if (!agendamento) null;
        return agendamento;
    }

    async remarcar(agendamento: Agendamento, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id: agendamento._id, professor, status: StatusEnum.pendente }, { $set: agendamento });
    }

    async cancelar(_id: string, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id, professor, status: StatusEnum.pendente }, { $set: {status: StatusEnum.cancelado} });
    }

    async concluir(_id: string, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id, professor, status: StatusEnum.pendente }, { $set: {status: StatusEnum.concluido} });
    }
}