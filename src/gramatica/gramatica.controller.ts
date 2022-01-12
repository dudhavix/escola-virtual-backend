import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { GramaticaCreateViewModel, GramaticaUpdateViewModel } from "./gramatica.dto";
import { GramaticaService } from "./gramatica.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/gramatica")
export class GramaticaController {
    constructor(
        private readonly gramaticaService: GramaticaService
    ){}

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() gramatica: GramaticaCreateViewModel ): Promise<HttpException> {
        return this.gramaticaService.create(gramatica);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.gramaticaService.getAll();
    }

    @Get("/getId/:gramatica")
    async getId( @Param("gramatica") gramatica: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.gramaticaService.getId(gramatica);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update( @Body() gramatica: GramaticaUpdateViewModel ): Promise<HttpException> {
        return this.gramaticaService.update(gramatica);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Delete("/delete/:gramatica")
    async delete( @Param("gramatica") gramatica: string ): Promise<HttpException> {
        return this.gramaticaService.delete(gramatica);
    }
}