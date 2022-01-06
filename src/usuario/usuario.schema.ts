import { Schema } from "mongoose";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { StatusEnum } from "../enum/status.enum";
import { Usuario } from "./usuario.interface";

export interface UsuarioDocument extends Usuario, Document { }

export const UsuarioSchema = new Schema<UsuarioDocument>({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    dataNascimento: { type: String, required: true },
    foto: { type: Schema.Types.ObjectId, ref: "Arquivo", required: true },
    nivelAcesso: { type: String, enum: Object.values(NivelAcessoEnum), required: true },
    status: { type: String, enum: Object.values(StatusEnum), required: true }
}, {
    timestamps: true,
    collection: "Usuario"
})