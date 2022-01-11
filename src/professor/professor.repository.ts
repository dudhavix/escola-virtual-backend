import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Usuario } from "../usuario/usuario.interface";
import { Professor } from "./professor.interface";
import { ProfessorDocument } from "./professor.schema";

export class ProfessorRepository {
    constructor(
        @InjectModel("Professor") private readonly model: Model<ProfessorDocument>,
    ) { }
    
    async create(professor: Professor): Promise<void> {
        await new this.model(professor).save();
    }

    async recuperarId(usuario: Usuario): Promise<Professor> {
        return this.model.findOne({usuario});
    }

    async getAll(): Promise<any> {
        return this.model.find({},["usuario"]).populate("usuario", ["nome", "email", "status"]);
    }
}