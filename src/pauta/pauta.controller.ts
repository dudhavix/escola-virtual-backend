import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Aluno } from "../aluno/aluno.interface";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { PautaCreateViewModel, PautaUpdateViewModel } from "./pauta.dto";
import { PautaService } from "./pauta.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/pauta")
export class PautaController {
    constructor(
        private readonly pautaService: PautaService
    ){}

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() pauta: PautaCreateViewModel ): Promise<HttpException> {
        return this.pautaService.create(pauta);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.pautaService.getAll();
    }

    @Get("/getAllAluno/:aluno")
    async getAllAluno( @Param("aluno") aluno: Aluno, @Headers("professor") professor: Professor ): Promise<any> {
        return this.pautaService.getAllAluno(aluno);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:pauta")
    async getId( @Param("pauta") pauta: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.pautaService.getId(pauta);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update( @Body() pauta: PautaUpdateViewModel ): Promise<HttpException> {
        return this.pautaService.update(pauta);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:pauta")
    async delete( @Param("pauta") pauta: string ): Promise<HttpException> {
        return this.pautaService.delete(pauta);
    }
}