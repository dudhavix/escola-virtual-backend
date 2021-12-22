import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { AlunoCreateViewModel, AlunoUpdateViewModel } from "./aluno.dto";
import { AlunoService } from "./aluno.service";

@Controller("api/aluno")
export class AlunoController {
    constructor(
        private readonly alunoService: AlunoService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() aluno: AlunoCreateViewModel ): Promise<HttpException> {
        return this.alunoService.create(aluno);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.alunoService.getAll(professor);
    }

    @Get("/getAllTurma/:turma")
    async getAllTurma( @Param("turma") turma: Turma ): Promise<any> {
        return this.alunoService.getAllTurma(turma);
    }

    @Get("/getId/:aluno")
    async getId( @Param("aluno") aluno: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.alunoService.getId(aluno);
    }

    @Put("/ativar/:aluno")
    async ativar( @Param("aluno") aluno: string ): Promise<HttpException> {
        return this.alunoService.ativar(aluno);
    }

    @Put("/desativar/:aluno")
    async desativar( @Param("aluno") aluno: string ): Promise<HttpException> {
        return this.alunoService.desativar(aluno);
    }

    @Put("/update")
    async update( @Body() aluno: AlunoUpdateViewModel ): Promise<HttpException> {
        return this.alunoService.update(aluno);
    }

    @Delete("/delete/:aluno")
    async delete( @Param("aluno") aluno: string ): Promise<HttpException> {
        return this.alunoService.delete(aluno);
    }
}