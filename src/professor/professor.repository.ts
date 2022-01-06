import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "./professor.interface";
import { ProfessorDocument } from "./professor.schema";

export class ProfessorRepository {
    constructor(
        @InjectModel("Professor") private readonly model: Model<ProfessorDocument>,
    ) { }
    
    async create(professor: Professor): Promise<void> {
        await new this.model(professor).save();
    }
} 