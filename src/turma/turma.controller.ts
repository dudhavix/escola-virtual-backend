import { Body, Controller, Delete, Get, Header, Headers, HttpException, Param, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { Professor } from "src/professor/professor.interface";
import { TurmaService } from "src/turma/turma.service";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "./turma.dto";


@Controller("api/turma")
export class TurmaController {

    constructor(
        private readonly turmaService: TurmaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() turma: TurmaCreateViewModel ): Promise<HttpException> {
        return this.turmaService.create(turma);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.turmaService.getAll(professor);
    }

    @Get("/getId/:turma")
    async getId( @Param("turma") turma: string ): Promise<any> {
        return this.turmaService.getId(turma);
    }

    @Put("/update")
    async update( @Body() turma: TurmaUpdateViewModel ): Promise<HttpException> {
        return this.turmaService.update(turma);
    }

    @Delete("/delete/:turma")
    async delete( @Param("turma") turma: string ): Promise<HttpException> {
        return this.turmaService.delete(turma);
    }
}