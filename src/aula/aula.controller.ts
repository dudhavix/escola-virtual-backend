import { Body, Controller, Delete, Get, Header, Headers, HttpException, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { AulaCreateViewModel, AulaUpdateViewModel } from "./aula.dto";
import { AulaService } from "./aula.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/aula")
export class AulaController {

    constructor(
        private readonly aulaService: AulaService
    ){}

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() aula: AulaCreateViewModel ): Promise<HttpException> {
        return this.aulaService.create(aula);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.aulaService.getAll(professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getId/:aula")
    async getId( @Param("aula") aula: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.aulaService.getId(aula);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update( @Body() aula: AulaUpdateViewModel ): Promise<HttpException> {
        return this.aulaService.update(aula);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:aula")
    async delete( @Param("aula") aula: string ): Promise<HttpException> {
        return this.aulaService.delete(aula);
    }
}