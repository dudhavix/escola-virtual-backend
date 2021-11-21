import { Schema } from "mongoose";

export const TurmaSchema = new Schema ({
    definicao: { type: String },
    nome: { type: String },
    alunos: [{
        type: Schema.Types.ObjectId,
        ref: "Aluno"
    }],
    frequencia: { type: String},
    observacao: { type: String },
}, {
    timestamps: true,
    collection: 'turmas'
})