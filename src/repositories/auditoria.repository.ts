import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuditoriaDocument } from "../entities/auditoria.entity";
import { DI_AUDITORIA_SCHEMA } from "../helpers/container-names";
import { Auditoria } from "../interfaces/auditoria.interface";

export class AuditoriaRepository {
    constructor(
        @InjectModel(DI_AUDITORIA_SCHEMA) private readonly model: Model<AuditoriaDocument>,
    ) { }
    
    async create(auditoria: Auditoria): Promise<void> {
        await new this.model(auditoria).save();
    }
}