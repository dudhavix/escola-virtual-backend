import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Aula } from "../aula/aula.interface";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { TurmaAulaCreateViewModel, TurmaAulaUpdateViewModel } from "./turma-aula.dto";
import { TurmaAulaService } from "./turma-aula.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/turma-aula")
export class TurmaAulaController {

    constructor(
        private readonly turmaAulaService: TurmaAulaService
    ){}

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() turmaAula: TurmaAulaCreateViewModel ): Promise<HttpException> {
        return this.turmaAulaService.create(turmaAula);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAllTurma/:turma")
    async getAllTurma( @Param("turma") turma: Turma, @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getAllTurma(turma);
    }

    @Get("/getAllAula/:aula")
    async getAllAula( @Param("aula") aula: Aula, @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getAllAula(aula);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getAll();
    }

    @Get("/getId/:turmaAula")
    async getId( @Param("turmaAula") turmaAula: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaAulaService.getId(turmaAula);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update( @Body() turmaAula: TurmaAulaUpdateViewModel ): Promise<HttpException> {
        return this.turmaAulaService.update(turmaAula);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:turmaAula")
    async delete( @Param("turmaAula") turmaAula: string ): Promise<HttpException> {
        return this.turmaAulaService.delete(turmaAula);
    }
}