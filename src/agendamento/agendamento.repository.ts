import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Professor } from "../professor/professor.interface";
import { Agendamento } from "./agendamento.interface";
import { AgendamentoDocument } from "./agendamento.schema";

export class AgendamentoRepository {
    constructor(
        @InjectModel("Agendamento") private readonly model: Model<AgendamentoDocument>,
    ) { }
    
    async create(agendamento: Agendamento): Promise<void> {
        await new this.model(agendamento).save();
    }

    async getAll(professor: Professor): Promise<Agendamento[]> {
        return this.model.find({professor});
    }

    async getId(_id: string): Promise<Agendamento> {
        return this.model.findOne({ _id });
    }

    async update(agendamento: Agendamento, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: agendamento });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
}