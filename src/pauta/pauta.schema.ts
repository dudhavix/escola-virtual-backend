import { Document, Schema } from "mongoose";
import { Pauta } from "src/pauta/pauta.interface";

export interface PautaDocument extends Pauta, Document { }

export const PautaSchema = new Schema<PautaDocument>({
    aluno: { type: Schema.Types.ObjectId, ref: "Aluno", required: true },
    presente: { type: Boolean, required: true },
    atraso: { type: String, required: false },
    observacao: { type: String, required: false },
}, {
    timestamps: true,
    collection: "Pauta"
})