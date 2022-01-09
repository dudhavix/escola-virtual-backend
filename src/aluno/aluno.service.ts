import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { Aluno } from "./aluno.interface";
import { AlunoRepository } from "./aluno.repository";

@Injectable()
export class AlunoService {
    private logger = new Logger(AlunoService.name);

    constructor(
        @Inject("AlunoRepository") private readonly repository: AlunoRepository,
    ){ }

   
    async getAll(professor: Professor): Promise<Aluno[] | HttpException> {
        try {
            var alunos = await this.repository.getAll(professor);
            if (!alunos.length) {
                return new HttpException('Nenhum aluno encontrado', HttpStatus.NOT_FOUND);
            }
            return alunos;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getAllTurma(turma: Turma): Promise<Aluno[] | HttpException> {
        try {
            var alunos = await this.repository.getAllTurma(turma);
            if (!alunos.length) {
                return new HttpException('Nenhum aluno com essa turma encontrado', HttpStatus.NOT_FOUND);
            }
            return alunos;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Aluno | HttpException> {
        try {
            var aluno = await this.repository.getId(_id);
            if (!aluno) {
                return new HttpException('Nenhum aluno encontrado', HttpStatus.NOT_FOUND);
            }
            return aluno;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async delete(_id: string): Promise<HttpException> {
        try {
            await this.repository.delete(_id);
            return new HttpException('Aluno excluido', HttpStatus.OK);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
}