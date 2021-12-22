import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "../professor/professor.interface";
import { Aula } from "./aula.interface";
import { AulaDocument } from "./aula.schema";

export class AulaRepository {
    constructor(
        @InjectModel("Aula") private readonly model: Model<AulaDocument>,
    ) { }
    
    async create(aula: Aula): Promise<void> {
        await new this.model(aula).save();
    }

    async getAll(professor: Professor): Promise<Aula[]> {
        return this.model.find({professor});
    }

    async getId(_id: string): Promise<Aula> {
        return this.model.findOne({ _id });
    }

    async update(aula: Aula, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: aula });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
} 