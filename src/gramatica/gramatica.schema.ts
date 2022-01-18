import { Schema } from "mongoose";
import { NivelEnum } from "src/enum/nivel.enum";
import { Gramatica } from "src/gramatica/gramatica.interface";

export interface GramaticaDocument extends Gramatica { }

export const GramaticaSchema = new Schema<GramaticaDocument>({
    professor: { type: Schema.Types.ObjectId, ref: "Professor", required: true },
    sentenca1: { type: String, required: true },
    sentenca2: { type: String, required: true },
    sentenca3: { type: String, required: false },
    nivel: { type: String, enum: Object.values(NivelEnum), required: true }
}, {
    timestamps: true,
    collection: "Gramatica"
})