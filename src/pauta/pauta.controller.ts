import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Aluno } from "../aluno/aluno.interface";
import { Professor } from "../professor/professor.interface";
import { PautaCreateViewModel, PautaUpdateViewModel } from "./pauta.dto";
import { PautaService } from "./pauta.service";

@Controller("api/pauta")
export class PautaController {
    constructor(
        private readonly pautaService: PautaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() pauta: PautaCreateViewModel ): Promise<HttpException> {
        return this.pautaService.create(pauta);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.pautaService.getAll();
    }

    @Get("/getAllAluno/:aluno")
    async getAllAluno( @Param("aluno") aluno: Aluno, @Headers("professor") professor: Professor ): Promise<any> {
        return this.pautaService.getAllAluno(aluno);
    }

    @Get("/getId/:pauta")
    async getId( @Param("pauta") pauta: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.pautaService.getId(pauta);
    }

    @Put("/update")
    async update( @Body() pauta: PautaUpdateViewModel ): Promise<HttpException> {
        return this.pautaService.update(pauta);
    }

    @Delete("/delete/:pauta")
    async delete( @Param("pauta") pauta: string ): Promise<HttpException> {
        return this.pautaService.delete(pauta);
    }
}