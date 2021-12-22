import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Arquivo } from "./arquivo.interface";
import { ArquivoDocument } from "./arquivo.schema";

export class ArquivoRepository {
    constructor(
        @InjectModel("Arquivo") private readonly model: Model<ArquivoDocument>,
    ) { }

    async create(arquivo: Arquivo): Promise<void> {
        await new this.model(arquivo).save();
    }

    async getAll(): Promise<Arquivo[]> {
        return this.model.find();
    }

    async getId(_id: string): Promise<Arquivo> {
        return this.model.findOne({ _id });
    }

    async delete(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }
}