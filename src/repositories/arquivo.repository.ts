import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ArquivoDocument } from "../entities/arquivo.entity";
import { DI_ARQUIVO_SCHEMA } from "../helpers/container-names";
import { Arquivo } from "../interfaces/arquivo.interface";
import { Usuario } from "../interfaces/usuario.interface";

export class ArquivoRepository {
    constructor(
        @InjectModel(DI_ARQUIVO_SCHEMA) private readonly model: Model<ArquivoDocument>,
    ) { }

    async create(arquivo: Arquivo): Promise<Arquivo> {
        return new this.model(arquivo).save();
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