import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTurmaViewModel } from "../dtos/create-turma.dto";
import { UpdateTurmaViewModel } from "../dtos/update-turma.dto";
import { Turma } from "../interfaces/turma.inteface";

@Injectable()
export class TurmaService {

    private logger = new Logger(TurmaService.name)

    constructor(
        @InjectModel('Turma') private readonly turma_model: Model<Turma>
    ) { }

    async create(turma: CreateTurmaViewModel): Promise<HttpException> {
        try {
            await new this.turma_model(turma).save();
            return new HttpException("Turma criada!", HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async readAll(): Promise<Turma[]> {
        try {
            return await this.turma_model.find();
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async readOneIDAlunos(_id: string): Promise<Turma> {
        try {
            return await this.turma_model.findOne({ _id }).populate("alunos");
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async readOneIDAluno(aluno: any): Promise<Turma> {
        try {
            return await this.turma_model.findOne({}, ["nome"]).where('alunos').in(aluno);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(turma: UpdateTurmaViewModel): Promise<HttpException> {
        try {
            await this.turma_model.findByIdAndUpdate({ _id: turma._id }, { $set: turma });
            return new HttpException("Turma atualizada!", HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.turma_model.deleteOne({ _id });
            return new HttpException("Turma excluida!", HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}