import { Schema } from "mongoose";

export const AlunoSchema = new Schema ({
    nome: { type: String },
    email: { type: String },
    telefone: { type: String },
    data_nascimento: { type: String },
    endereco: { type: String },
    nivel_atual: { type: String },
    nivel_meta: { type: String },
    observacao: { type: String },
    status: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'alunos'
})