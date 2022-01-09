import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { TurmaService } from "src/turma/turma.service";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { Resposta } from "../helpers/resposta.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { TurmaCreateViewModel, TurmaUpdateViewModel } from "./turma.dto";


@Controller("api/turma")
export class TurmaController {

    constructor(
        private readonly turmaService: TurmaService,
        private readonly usuarioService: UsuarioService
    ) { }

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Headers() { token },
        @Body() turma: TurmaCreateViewModel
    ): Promise<Resposta> {
        await this.usuarioService.validToken(token, NivelAcessoEnum.professor);
        return this.turmaService.create(turma);
    }

    @Get("/getAll")
    async getAll(
        @Headers() { token },
    ): Promise<any> {
        await this.usuarioService.validToken(token, NivelAcessoEnum.professor);
        return this.turmaService.getAll(token);
    }

    @Get("/getId/:turma")
    async getId(
        @Headers() { token },
        @Param("turma") turma: string
    ): Promise<any> {
        await this.usuarioService.validToken(token, NivelAcessoEnum.professor);
        return this.turmaService.getId(turma);
    }

    @Put("/update")
    async update(
        @Headers() { token },
        @Body() turma: TurmaUpdateViewModel
    ): Promise<HttpException> {
        await this.usuarioService.validToken(token, NivelAcessoEnum.professor);
        return this.turmaService.update(turma);
    }

    @Delete("/delete/:turma")
    async delete(
        @Headers() { token },
        @Param("turma") turma: string
    ): Promise<HttpException> {
        await this.usuarioService.validToken(token, NivelAcessoEnum.professor);
        return this.turmaService.delete(turma);
    }
}