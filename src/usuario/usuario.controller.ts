import { Body, Controller, Get, HttpException, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
//import { JwtGuard } from "../auth/jwt.guard";
import { Resposta } from "../resposta.interface";
import { AlunoViewModel, ProfessorViewModel } from "./usuario.dto";
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

    // @UseGuards(JwtGuard)
    // @Post("/create-aluno")
    // @UsePipes(ValidationPipe)
    // async createAluno(@Body() usuario: AlunoViewModel ): Promise<Resposta> {
    //     return this.usuarioService.createAluno(usuario);
    // }

    // @Put("/ativar/:usuario")
    // @UsePipes(ValidationPipe)
    // async ativar(@Param("usuario") usuario: string): Promise<void> {
    //     await this.usuarioService.ativar(usuario);
    // }

}