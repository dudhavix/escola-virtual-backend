import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "../interface/professor.interface";
import { ProfessorDocument } from "./schema/professor.schema";

export class ProfessorRepository {
    constructor(
        @InjectModel("Professor") private readonly model: Model<ProfessorDocument>,
    ) { }
    
    async create(professor: Professor): Promise<void> {
        await new this.model(professor).save();
    }

    async getId(_id: string): Promise<Professor> {
        return await this.model.findOne({ _id }, { senha: 0 });
    }

    async getAll(): Promise<Professor[]> {
        return await this.model.find({}, { senha: 0 });
    }
} 