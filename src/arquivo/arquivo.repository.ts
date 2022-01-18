import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Usuario } from "../usuario/usuario.interface";
import { Arquivo } from "./arquivo.interface";
import { ArquivoDocument } from "./arquivo.schema";

export class ArquivoRepository {
    constructor(
        @InjectModel("Arquivo") private readonly model: Model<ArquivoDocument>,
    ) { }

    async create(arquivo: Arquivo): Promise<void> {
        await new this.model(arquivo).save();
    }

    async getAll(usuario: Usuario): Promise<Arquivo[]> {
        const arquivos = await this.model.find({usuario}, ["nome", "caminho"]);
        if(!arquivos.length) null;
        return arquivos;
    }

    async getId(_id: string, usuario: Usuario): Promise<Arquivo> {
        const arquivo = await this.model.findOne({ _id, usuario }, ["nome", "caminho"]);
        if(!arquivo) null;
        return arquivo;
    }

    async delete(_id: string, usuario: Usuario): Promise<void> {
        await this.model.deleteOne({ _id, usuario });
    }
}