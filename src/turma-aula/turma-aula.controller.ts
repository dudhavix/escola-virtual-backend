import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Aula } from "../aula/aula.interface";
import { NivelAcessoGuard } from "../auth/estrategia/nivelacesso.guard";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelAcessoDecorator } from "../helpers/nivel-acesso.decorator";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { Token } from "../usuario/usuario.interface";
import { UsuarioService } from "../usuario/usuario.service";
import { TurmaAulaCreateViewModel, TurmaAulaUpdateViewModel } from "./turma-aula.dto";
import { TurmaAulaService } from "./turma-aula.service";

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/turma-aula")
export class TurmaAulaController {

    constructor(
        private readonly turmaAulaService: TurmaAulaService,
        private readonly usuarioService: UsuarioService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Post("/create")
    @UsePipes(ValidationPipe)
    async create(
        @Req() req: Token,
        @Body() turmaAula: TurmaAulaCreateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.turmaAulaService.create(turmaAula, professor);
    }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Get("/getAllTurma/:turma")
    // async getAllTurma( @Param("turma") turma: Turma, @Headers("professor") professor: Professor ): Promise<any> {
    //     return this.turmaAulaService.getAllTurma(turma);
    // }

    // @Get("/getAllAula/:aula")
    // async getAllAula( @Param("aula") aula: Aula, @Headers("professor") professor: Professor ): Promise<any> {
    //     return this.turmaAulaService.getAllAula(aula);
    // }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Get("/getAll")
    // async getAll( @Headers("professor") professor: Professor ): Promise<any> {
    //     return this.turmaAulaService.getAll();
    // }

    // @Get("/getId/:turmaAula")
    // async getId( @Param("turmaAula") turmaAula: string, @Headers("professor") professor: Professor ): Promise<any> {
    //     return this.turmaAulaService.getId(turmaAula);
    // }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Put("/update")
    // async update( @Body() turmaAula: TurmaAulaUpdateViewModel ): Promise<void> {
    //     return this.turmaAulaService.update(turmaAula);
    // }

    // @NivelAcessoDecorator(NivelAcessoEnum.professor)
    // @Delete("/delete/:turmaAula")
    // async delete( @Param("turmaAula") turmaAula: string ): Promise<void> {
    //     return this.turmaAulaService.delete(turmaAula);
    // }
}