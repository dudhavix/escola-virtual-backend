import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "../professor/professor.interface";
import { Gramatica } from "./gramatica.interface";
import { GramaticaDocument } from "./gramatica.schema";

export class GramaticaRepository {
    constructor(
        @InjectModel("Gramatica") private readonly model: Model<GramaticaDocument>,
    ) { }
    
    async create(gramatica: Gramatica): Promise<void> {
        await new this.model(gramatica).save();
    }

    async getAll(professor: Professor): Promise<Gramatica[]> {
        const gramaticas = await this.model.find({professor});
        if(!gramaticas.length) return null;
        return gramaticas;
    }

    async getId(_id: string, professor: Professor): Promise<Gramatica> {
        const gramatica = await this.model.findOne({ _id, professor });
        if(!gramatica) return null;
        return gramatica;
    }

    async update(gramatica: Gramatica, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id: gramatica._id, professor }, { $set: gramatica });
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        await this.model.deleteOne({ _id, professor });
    }
}