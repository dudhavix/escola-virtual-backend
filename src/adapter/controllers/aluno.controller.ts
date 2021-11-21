import { Body, Controller, Get, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateAlunoViewModel } from "src/domain/dtos/create-aluno.dto";
import { UpdateAlunoViewModel } from "src/domain/dtos/update-aluno.dto";
import { AlunoInformacoes } from "src/domain/interfaces/aluno-informacoes";
import { Aluno } from "src/domain/interfaces/aluno.inteface";
import { AlunoService } from "src/domain/services/aluno.service";

@Controller("api/aluno")
export class AlunoController {

    constructor(
        private readonly aluno_service: AlunoService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() aluno: CreateAlunoViewModel ): Promise<HttpException> {
        return await this.aluno_service.create(aluno);
    }

    @Get("/readAll")
    async readAll(): Promise<Aluno[]> {
        return this.aluno_service.readAll();
    }

    @Get("/readOneID/:idAluno")
    async readOneID( @Param("idAluno") idAluno: string ): Promise<AlunoInformacoes> {
        return this.aluno_service.readOneID(idAluno);
    }

    @Put("/update")
    @UsePipes(ValidationPipe)
    async update( @Body() aluno: UpdateAlunoViewModel ): Promise<HttpException> {
        return this.aluno_service.update(aluno);
    }

    @Put("/ativar/:idAluno")
    async ativar_aluno( @Param("idAluno") idAluno: string ): Promise<HttpException> {
        return this.aluno_service.ativar_aluno(idAluno);
    }

    @Put("/desativar/:idAluno")
    async desativar_aluno( @Param("idAluno") idAluno: string ): Promise<HttpException> {
        return this.aluno_service.desativar_aluno(idAluno);
    }
}