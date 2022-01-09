import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Resposta } from "../helpers/resposta.interface";
import { AlunoViewModel, LoginViewModel, ProfessorViewModel } from "./usuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller("api/usuario")
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService
    ) { }

    @Post("/create-professor")
    @UsePipes(ValidationPipe)
    async createProfessor(@Body() usuario: ProfessorViewModel): Promise<Resposta> {
        return this.usuarioService.createProfessor(usuario);
    }

    @Post("/login")
    @UsePipes(ValidationPipe)
    async login(@Body() usuario: LoginViewModel): Promise<Resposta> {
        return this.usuarioService.login(usuario);
    }

    @Post("/create-aluno")
    @UsePipes(ValidationPipe)
    async createAluno(
        @Headers() { token },
        @Body() usuario: AlunoViewModel
    ): Promise<Resposta> {
        await this.usuarioService.validToken(token, NivelAcessoEnum.professor);
        return this.usuarioService.createAluno(usuario);
    }

    @Put("/ativar/:usuario")
    async ativar(
        @Param("usuario") usuario: string
    ): Promise<Resposta> {
        return this.usuarioService.ativar(usuario);
    }

    @Put("/desativar/:usuario")
    @UsePipes(ValidationPipe)
    async desativar(
        @Param("usuario") usuario: string
    ): Promise<Resposta> {
        return this.usuarioService.desativar(usuario);
    }

}