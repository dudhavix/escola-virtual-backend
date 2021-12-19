import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { ProfessorCreateViewModel } from "src/adapter/view/professor.dto";
import { ProfessorFactory } from "../factory/professor.factory";
import { Professor } from "../interface/professor.interface";
import { ProfessorRepository } from "../repository/professor.repository";

@Injectable()
export class ProfessorService {

    private logger = new Logger(ProfessorService.name);

    constructor(
        @Inject("ProfessorRepository") private readonly repository: ProfessorRepository,
    ) { }
    
    async create(professor: ProfessorCreateViewModel): Promise<HttpException> {
        try {
            const entity = ProfessorFactory(professor);
            await this.repository.create(entity);
            return new HttpException('Professor criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getAll(): Promise<Professor[] | HttpException> {
        try {
            var professores = await this.repository.getAll();
            if (!professores.length) {
                return new HttpException('Nenhum professor encontrado', HttpStatus.NOT_FOUND);
            }
            return professores;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Professor | HttpException> {
        try {
            var professor = await this.repository.getId(_id);
            if (!professor) {
                return new HttpException('Nenhum professor encontrado', HttpStatus.NOT_FOUND);
            }
            return professor;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
}