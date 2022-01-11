import { Schema } from "mongoose";
import { FrequenciaEnum } from "src/enum/frequencia.enum";
import { TagEnum } from "src/enum/tag.enum";
import { Turma } from "src/turma/turma.interface";

export interface TurmaDocument extends Turma { }

export const TurmaSchema = new Schema<TurmaDocument>({
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    tag: { type: String, enum: Object.values(TagEnum), required: true },
    nome: { type: String, required: true },
    frequencia: { type: String, enum: Object.values(FrequenciaEnum), required: true },
    observacao: { type: String, required: false }
}, {
    timestamps: true,
    collection: "Turma"
})