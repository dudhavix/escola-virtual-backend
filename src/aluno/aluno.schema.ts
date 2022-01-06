import { Document, Schema } from "mongoose";
import { NivelEnum } from "src/enum/nivel.enum";
import { Aluno } from "src/aluno/aluno.interface";

export interface AlunoDocument extends Aluno, Document { }

export const AlunoSchema = new Schema<AlunoDocument>({
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    turma: { type: Schema.Types.ObjectId, ref: "Turma", required: true },
    endereco: { type: String, required: true },
    observacao: { type: String, required: false },
    nivelAtual: { type: String, enum: Object.values(NivelEnum), required: true },
    nivelMeta: { type: String, enum: Object.values(NivelEnum), required: true }
}, {
    timestamps: true,
    collection: "Aluno"
})