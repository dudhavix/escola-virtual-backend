import { Schema } from "mongoose";
import { Auditoria } from "../interfaces/auditoria.interface";

export interface AuditoriaDocument extends Auditoria, Document { }

export const AuditoriaSchema = new Schema<Auditoria>({
    dataHora: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: true },
    acao: { type: String, required: true },
}, {
    timestamps: true,
    collection: "auditoria"
})