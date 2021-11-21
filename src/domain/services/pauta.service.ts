import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePautaViewModel } from "../dtos/create-pauta.dto";
import { Pauta } from "../interfaces/pauta.interface";

@Injectable()
export class PautaService {

    private logger = new Logger(PautaService.name)

    constructor(
        @InjectModel('Pauta') private readonly pauta_model: Model<Pauta>
    ) { }

    async create(pauta: CreatePautaViewModel): Promise<void> {
        try {
            await new this.pauta_model(pauta).save();
        } catch (error) {
            this.logger.debug(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async readIDAluno(aluno: string): Promise<Pauta[]>{
        try {
            return await this.pauta_model.find({ aluno }, ["presente", "createdAt"], );
        } catch (error) {
            this.logger.debug(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}