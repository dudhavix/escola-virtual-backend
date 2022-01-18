import { Schema } from "mongoose";
import { Pauta } from "src/pauta/pauta.interface";

export interface PautaDocument extends Pauta { }

export const PautaSchema = new Schema<PautaDocument>({
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    turma: { type: Schema.Types.ObjectId, ref: "Turma", required: true },
    aluno: { type: Schema.Types.ObjectId, ref: "Aluno", required: true },
    frequencia: [{ type: Object, required: true }],
    atraso: { type: String, required: false },
    observacao: { type: String, required: false },
}, {
    timestamps: true,
    collection: "Pauta"
})