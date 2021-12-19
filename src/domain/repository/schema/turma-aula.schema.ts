import { Document, Schema } from "mongoose";
import { TurmaAula } from "src/domain/interface/turma-aula.interface";

export interface TurmaAulaDocument extends TurmaAula, Document { }

export const TurmaAulaSchema = new Schema<TurmaAulaDocument>({
    turma: { type: Schema.Types.ObjectId, ref: "Turma", required: true },
    aula: { type: Schema.Types.ObjectId, ref: "Aula", required: true },
}, {
    timestamps: true,
    collection: "TurmaAula"
})