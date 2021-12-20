import { Body, Controller, Get, Header, Headers, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Professor } from "src/professor/professor.interface";
import { TurmaService } from "src/turma/turma.service";
import { TurmaCreateViewModel } from "./turma.dto";


@Controller("api/turma")
export class TurmaController {

    constructor(
        private readonly turmaService: TurmaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(@Body() turma: TurmaCreateViewModel): Promise<HttpException> {
        return await this.turmaService.create(turma);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return await this.turmaService.getAll(professor);
    }

    @Get("/getId/:turma")
    async getId( @Param("turma") turma: string ): Promise<any> {
        return await this.turmaService.getId(turma);
    }
}