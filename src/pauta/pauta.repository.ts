import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Aluno } from "../aluno/aluno.interface";
import { Pauta } from "./pauta.interface";
import { PautaDocument } from "./pauta.schema";

export class PautaRepository {
    constructor(
        @InjectModel("Pauta") private readonly model: Model<PautaDocument>,
    ) { }

    async create(pauta: Pauta): Promise<void> {
        await new this.model(pauta).save();
    }

    async getAll(): Promise<Pauta[]> {
        return this.model.find().populate("aluno", ["nome", "foto"]);
    }

    async getAllAluno(aluno: Aluno): Promise<Pauta[]> {
        return this.model.find({ aluno }).populate("aluno", ["nome", "foto"]);
    }

    async getId(_id: string): Promise<Pauta> {
        return this.model.findOne({ _id }).populate("aluno", ["nome", "foto"]);
    }

    async update(pauta: Pauta, _id: string): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, { $set: pauta });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
}