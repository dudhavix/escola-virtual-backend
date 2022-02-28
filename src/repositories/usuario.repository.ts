import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UsuarioDocument } from "../entities/usuario.entity";
import { DI_USUARIO_SCHEMA } from "../helpers/container-names";
import { StatusEnum } from "../helpers/index.enum";
import { Usuario } from "../interfaces/usuario.interface";

export class UsuarioRepository {
    constructor(
        @InjectModel(DI_USUARIO_SCHEMA) private readonly model: Model<UsuarioDocument>,
    ) { }
    
    async create(usuario: Usuario): Promise<Usuario> {
        return await new this.model(usuario).save();
    }

    async getEmail(email: string): Promise<Usuario> {
        const usuario = await this.model.findOne({ email, status: StatusEnum.ativo});
        if(!usuario) null;
        return usuario;
    }

    async ativar(_id: string): Promise<void> {
        await this.model.findOneAndUpdate({ _id }, { $set: { status: StatusEnum.ativo } });
    }

    // async getId(_id: string): Promise<Usuario> {
    //     const usuario = await this.model.findOne({ _id }, ["nome", "email", "telefone", "dataNascimento", "foto"]);
    //     if(!usuario) null;
    //     return usuario;
    // }

    

    // async desativar(_id: string): Promise<void> {
    //     await this.model.findOneAndUpdate({ _id }, { $set: {status: StatusEnum.inativo} });
    // }

    // async update(usuario: Usuario): Promise<Usuario> {
    //     return this.model.findByIdAndUpdate({ _id: usuario._id }, { $set: usuario });
    // }

    // async delete(_id: string): Promise<void> {
    //     await this.model.findOneAndUpdate({ _id }, { $set: { status: StatusEnum.inativo } });
    // }

    // async validarExiste(key: string, value: string): Promise<Usuario> {
    //     const usuario = await this.model.findOne({ [key]: value });
    //     if(!usuario) null;
    //     return usuario;
    // }
}