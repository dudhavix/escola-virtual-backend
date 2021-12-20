import { Document, Schema } from "mongoose";
import { Aula } from "src/aula/aula.interface";

export interface AulaDocument extends Aula, Document { }

export const AulaSchema = new Schema<AulaDocument>({
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    temaAula: { type: String, required: true },
    observacao: { type: String, required: false },
    arquivos: [{ type: Schema.Types.ObjectId, ref: "Arquivo", required: true }]
}, {
    timestamps: true,
    collection: "Aula"
})