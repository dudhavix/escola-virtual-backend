import { Schema } from "mongoose";
import { Agendamento } from "src/agendamento/agendamento.interface";
import { StatusEnum } from "../enum/status.enum";

export interface AgendamentoDocument extends Agendamento { }

export const AgendamentoSchema = new Schema<AgendamentoDocument>({
    turma: { type: Schema.Types.ObjectId, ref: "Turma", required: true },
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    dataHora: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), required: true }
}, {
    timestamps: true,
    collection: "Agendamento"
})