import { UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StatusEnum } from "../enum/status.enum";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Usuario } from "./usuario.interface";
import { UsuarioDocument } from "./usuario.schema";

export class UsuarioRepository {
    constructor(
        @InjectModel("Usuario") private readonly model: Model<UsuarioDocument>,
    ) { }
    
    async create(usuario: Usuario): Promise<Usuario> {
        return await new this.model(usuario).save();
    }

    async getEmail(email: string): Promise<Usuario> {
        return this.model.findOne({ email });
    }

    async getId(_id: string): Promise<Usuario> {
        return this.model.findOne({ _id, status: StatusEnum.ativo }, {senha:false});
    }

    async ativar(_id: string): Promise<void> {
        await this.model.findOneAndUpdate({ _id }, { $set: { status: StatusEnum.ativo } });
    }

    async desativar(_id: string): Promise<void> {
        await this.model.findOneAndUpdate({ _id }, { $set: {status: StatusEnum.inativo} });
    }

    async update(usuario: Usuario): Promise<void> {
        await this.model.findByIdAndUpdate({ _id: usuario._id }, { $set: usuario });
    }

    async delete(_id: string): Promise<void> {
        await this.model.findOneAndUpdate({ _id }, { $set: { status: StatusEnum.inativo } });
    }
}