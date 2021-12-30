import { Schema } from "mongoose";
import { IdiomaEnum } from "src/enum/idioma.enum";
import { Professor } from "./professor.interface";

export interface ProfessorDocument extends Professor { }

export const ProfessorSchema = new Schema<ProfessorDocument>({
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    idioma: { type: String, enum: Object.values(IdiomaEnum), required: true }
}, {
    timestamps: true,
    collection: "Professor"
})