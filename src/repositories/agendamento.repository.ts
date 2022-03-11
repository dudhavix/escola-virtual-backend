import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AgendamentoDocument } from "../entities/agendamento.entity";
import { DI_AGENDAMENTO_SCHEMA } from "../helpers/container-names";
import { StatusEnum } from "../helpers/index.enum";
import { Agendamento } from "../interfaces/agendamento.interface";
import { Usuario } from "../interfaces/usuario.interface";

export class AgendamentoRepository {

    constructor(
        @InjectModel(DI_AGENDAMENTO_SCHEMA) private readonly model: Model<AgendamentoDocument>,
    ) { }

    async create(agendamento: Agendamento): Promise<Agendamento> {
        return await new this.model(agendamento).save();
    }

    async getAll(usuario: Usuario): Promise<Agendamento[]> {
        const agendamentos = await this.model.find({ usuario }, ["turma", "dataHora"]).populate("turma", ['tag', 'nome']);
        if (!agendamentos.length) return null;
        return agendamentos;
    }

    async getId(_id: string, usuario: Usuario): Promise<Agendamento> {
        const agendamento = await this.model.findOne({ _id, usuario }, ["tag", "nome"]).populate("turma", ['tag', 'nome']);
        if (!agendamento) return null;
        return agendamento;
    }

    async update(agendamento: Agendamento, usuario: Usuario): Promise<void> {
        await this.model.updateOne({ _id: agendamento._id, usuario }, { $set: agendamento });
    }

    async realizado(_id: string, usuario: Usuario): Promise<void> {
        await this.model.updateOne({ _id, usuario }, { $set: {status: StatusEnum.realizado} });
    }

    async cancelado(_id: string, usuario: Usuario): Promise<void> {
        await this.model.updateOne({ _id, usuario }, { $set: {status: StatusEnum.cancelado} });
    }
}