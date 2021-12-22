import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tarefa } from "./tarefa.interface";
import { TarefaDocument } from "./tarefa.schema";

export class TarefaRepository {
    constructor(
        @InjectModel("Tarefa") private readonly model: Model<TarefaDocument>,
    ) { }
    
    async create(tarefa: Tarefa): Promise<void> {
        await new this.model(tarefa).save();
    }

    async getAll(): Promise<Tarefa[]> {
        return this.model.find().populate("aula");
    }

    async getId(_id: string): Promise<Tarefa> {
        return this.model.findOne({ _id });
    }

    async update(tarefa: Tarefa, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: tarefa });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
}