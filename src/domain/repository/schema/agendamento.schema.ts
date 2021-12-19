import { Document, Schema } from "mongoose";
import { Agendamento } from "src/domain/interface/agendamento.interface";

export interface AgendamentoDocument extends Agendamento, Document { }

export const AgendamentoSchema = new Schema<AgendamentoDocument>({
    turma: { type: Schema.Types.ObjectId, ref: "Turma", required: true },
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
}, {
    timestamps: true,
    collection: "Agendamento"
})