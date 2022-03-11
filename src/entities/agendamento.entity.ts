import { Schema } from "mongoose";
import { StatusEnum } from "../helpers/index.enum";
import { Agendamento } from "../interfaces/agendamento.interface";
import { Turma } from "../interfaces/turma.interface";
import { Usuario } from "../interfaces/usuario.interface";
import { AgendamentoCreateModel } from "../models/agendamento.model";

export class AgendamentoEntity {
    constructor(
        public usuario: Usuario,
        public turma: Turma,
        public dataHora: string,
        public status: StatusEnum,
    ){ }
}

export const AgendamentoCreateFactory = (viewModel: AgendamentoCreateModel, usuario: Usuario): AgendamentoEntity => {
    let { dataHora, turma } = viewModel;
    const status = StatusEnum.pendente;
    return new AgendamentoEntity(usuario, turma, dataHora, status);
}

export interface AgendamentoDocument extends Agendamento { }

export const AgendamentoSchema = new Schema<AgendamentoDocument>({
    usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: true },
    turma: { type: Schema.Types.ObjectId, ref: "turma", required: true },
    dataHora: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), required: true },
}, {
    timestamps: true,
    collection: "agendamento"
})