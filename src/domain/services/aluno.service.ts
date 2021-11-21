import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAlunoViewModel } from "../dtos/create-aluno.dto";
import { UpdateAlunoViewModel } from "../dtos/update-aluno.dto";
import { AlunoInformacoes } from "../interfaces/aluno-informacoes";
import { Aluno } from "../interfaces/aluno.inteface";
import { PautaService } from "./pauta.service";
import { TurmaService } from "./turma.service";

@Injectable()
export class AlunoService {

    private logger = new Logger(AlunoService.name)

    constructor(
        @InjectModel('Aluno') private readonly aluno_model: Model<Aluno>,
        private readonly pauta_service: PautaService,
        private readonly turma_service: TurmaService
    ) { }

    async create(aluno: CreateAlunoViewModel): Promise<HttpException> {
        const emailExiste = await this.validarEmailExiste(aluno.email);
        if (emailExiste) {
            throw new BadRequestException(`Esse email ja foi utilizado.`);
        }
        try {
            await new this.aluno_model(aluno).save();
            return new HttpException('Aluno criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async readAll(): Promise<Aluno[]> {
        try {
            return this.aluno_model.find();
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async readOneID(_id: string): Promise<AlunoInformacoes> {
        try {
            const aluno = await this.aluno_model.findOne({ _id });
            const pauta = await this.pauta_service.readIDAluno(_id);
            const turma = await this.turma_service.readOneIDAluno(_id);
            return { aluno, turma, pauta }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(aluno: UpdateAlunoViewModel): Promise<HttpException> {
        try {
            await this.aluno_model.findByIdAndUpdate(aluno._id, { $set: aluno });
            return new HttpException('Alterações realizadas', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async ativar_aluno(_id: string): Promise<HttpException> {
        const aluno_ativo = await this.validarAlunoAtivo(_id);
        if (aluno_ativo) {
            throw new HttpException("Este aluno ja esta ativo.", HttpStatus.I_AM_A_TEAPOT);
        }
        try {
            await this.aluno_model.findByIdAndUpdate(_id, { $set: { status: true } });
            return new HttpException("Sua conta está ativada!", HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async desativar_aluno(_id: string): Promise<HttpException> {
        const aluno_ativo = this.validarAlunoAtivo(_id);
        if (!aluno_ativo) {
            throw new HttpException("Este aluno ja esta desativado.", HttpStatus.I_AM_A_TEAPOT);
        }
        try {
            await this.aluno_model.findByIdAndUpdate(_id, { $set: { status: false } });
            return new HttpException("Aluno desativado.", HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    private async validarEmailExiste(email: string): Promise<boolean> {
        return await this.aluno_model.exists({ email });
    }

    private async validarAlunoAtivo(_id: string): Promise<boolean> {
        try {
            return await this.aluno_model.exists({ _id, status: true });
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}