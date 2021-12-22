import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Aula } from "../aula/aula.interface";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { TurmaAulaCreateViewModel, TurmaAulaUpdateViewModel } from "./turma-aula.dto";
import { TurmaAulaService } from "./turma-aula.service";

@Controller("api/turma-aula")
export class TurmaAulaController {

    constructor(
        private readonly turmaAulaService: TurmaAulaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() turmaAula: TurmaAulaCreateViewModel ): Promise<HttpException> {
        return this.turmaAulaService.create(turmaAula);
    }

    @Get("/getAllTurma/:turma")
    async getAllTurma( @Param("turma") turma: Turma, @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getAllTurma(turma);
    }

    @Get("/getAllAula/:aula")
    async getAllAula( @Param("aula") aula: Aula, @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getAllAula(aula);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getAll();
    }

    @Get("/getId/:turmaAula")
    async getId( @Param("turmaAula") turmaAula: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getId(turmaAula);
    }

    @Put("/update")
    async update( @Body() turmaAula: TurmaAulaUpdateViewModel ): Promise<HttpException> {
        return this.turmaAulaService.update(turmaAula);
    }

    @Delete("/delete/:turmaAula")
    async delete( @Param("turmaAula") turmaAula: string ): Promise<HttpException> {
        return this.turmaAulaService.delete(turmaAula);
    }
}