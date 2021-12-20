import { Document, Schema } from "mongoose";
import { IdiomaEnum } from "src/enum/idioma.enum";
import { Professor } from "src/professor/professor.interface";

export interface ProfessorDocument extends Professor, Document { }

export const ProfessorSchema = new Schema<ProfessorDocument>({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    idioma: { type: String, enum: Object.values(IdiomaEnum), required: true }
}, {
    timestamps: true,
    collection: "Professor"
})