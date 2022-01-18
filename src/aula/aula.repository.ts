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
        const aulas = await this.model.find({professor});
        if(!aulas.length) null;
        return aulas;
    }

    async getId(_id: string, professor: Professor): Promise<Aula> {
        const aula = await this.model.findOne({ _id, professor });
        if(!aula) null;
        return aula;
    }

    async update(aula: Aula, professor: Professor): Promise<void> {
        await this.model.updateOne({ _id: aula._id, professor }, { $set: aula });
    }

    async delete(_id: string, professor: Professor): Promise<void> {
        await this.model.deleteOne({ _id, professor });
    }
} 