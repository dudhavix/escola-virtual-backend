import { Schema } from "mongoose";

export const PautaSchema = new Schema ({
    presente: { type: Boolean },
    aluno: {
        type: Schema.Types.ObjectId,
        ref: "Aluno"
    }
}, {
    timestamps: true,
    collection: 'pautas'
})