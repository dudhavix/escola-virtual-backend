import { Body, Controller, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { Resposta } from "../helpers/resposta.interface";
import { AlunoViewModel, LoginViewModel, ProfessorViewModel, UsuarioViewModel } from "./usuario.dto";
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

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create-aluno")
    @UsePipes(ValidationPipe)
    async createAluno(
        @Body() usuario: AlunoViewModel
    ): Promise<Resposta> {
        return this.usuarioService.createAluno(usuario);
    }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/ativar/:usuario")
    async ativar(
        @Param("usuario") usuario: string
    ): Promise<Resposta> {
        return this.usuarioService.ativar(usuario);
    }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/desativar/:usuario")
    @UsePipes(ValidationPipe)
    async desativar(
        @Param("usuario") usuario: string
    ): Promise<Resposta> {
        return this.usuarioService.desativar(usuario);
    }

    @UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("/update")
    async update(
        @Body() usuario: UsuarioViewModel
    ): Promise<Resposta> {
        return this.usuarioService.update(usuario);
    }

}