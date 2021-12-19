import { Document, Schema } from "mongoose";
import { NivelEnum } from "src/domain/enum/nivel.enum";
import { StatusEnum } from "src/domain/enum/status.enum";
import { Aluno } from "src/domain/interface/aluno.interface";

export interface AlunoDocument extends Aluno, Document { }

export const AlunoSchema = new Schema<AlunoDocument>({
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    turma: { type: Schema.Types.ObjectId, ref: "Turma", required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    dataNascimento: { type: String, required: true },
    endereco: { type: String, required: true },
    foto: { type: Schema.Types.ObjectId, ref: "Arquivo", required: true },
    observacao: { type: String, required: false },
    nivelAtual: { type: String, enum: Object.values(NivelEnum), required: true },
    nivelMeta: { type: String, enum: Object.values(NivelEnum), required: true },
    ativo: { type: String, enum: Object.values(StatusEnum), required: true }
}, {
    timestamps: true,
    collection: "Aluno"
})