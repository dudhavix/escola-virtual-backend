import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { Token } from "../usuario/usuario.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { TarefaCreateViewModel, TarefaUpdateViewModel } from "./tarefa.dto";
import { Tarefa } from "./tarefa.interface";
import { TarefaService } from "./tarefa.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/tarefa")
export class TarefaController {
    constructor(
        private readonly tarefaService: TarefaService,
        private readonly usuarioService: UsuarioService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: Token,
        @Body() tarefa: TarefaCreateViewModel
    ): Promise<void> {
        return this.tarefaService.create(tarefa);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("/getAll")
    async getAll(
        @Req() req: Token
    ): Promise<Tarefa[]> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.tarefaService.getAll(professor);
    }

    @Get("/getId/:tarefa")
    async getId(
        @Req() req: Token,
        @Param("tarefa") tarefa: string
    ): Promise<Tarefa> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.tarefaService.getId(tarefa, professor);
    }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Put("/update")
    // async update( 
    //     @Req() req: Token,
    // @Body() tarefa: TarefaUpdateViewModel 
    // ): Promise<HttpException> {
    //     return this.tarefaService.update(tarefa);
    // }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Delete("/delete/:tarefa")
    // async delete( @Param("tarefa") tarefa: string ): Promise<HttpException> {
    //     return this.tarefaService.delete(tarefa);
    // }
}