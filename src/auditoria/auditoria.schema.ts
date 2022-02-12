import { Schema } from "mongoose";
import { AcaoEnum } from "../enum/acao.enum";
import { Auditoria } from "./auditoria.interface";

export interface AuditoriaDocument extends Auditoria { }

export const AuditoriaSchema = new Schema<AuditoriaDocument>({
    acao: { type: String, enum: Object.values(AcaoEnum), required: true },
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    token: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Auditoria"
})