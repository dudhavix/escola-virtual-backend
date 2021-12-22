import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Gramatica } from "./gramatica.interface";
import { GramaticaDocument } from "./gramatica.schema";

export class GramaticaRepository {
    constructor(
        @InjectModel("Gramatica") private readonly model: Model<GramaticaDocument>,
    ) { }
    
    async create(gramatica: Gramatica): Promise<void> {
        await new this.model(gramatica).save();
    }

    async getAll(): Promise<Gramatica[]> {
        return this.model.find();
    }

    async getId(_id: string): Promise<Gramatica> {
        return this.model.findOne({ _id });
    }

    async update(gramatica: Gramatica, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: gramatica });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
}