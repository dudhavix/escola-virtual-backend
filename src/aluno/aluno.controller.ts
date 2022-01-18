import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NivelAcessoGuard } from '../auth/estrategia/nivelacesso.guard';
import { NivelAcessoDecorator } from '../helpers/nivel-acesso.decorator';
import { NivelAcessoEnum } from '../enum/nivel-acesso.enum';
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.interface';
import { AlunoUpdateViewModel } from './aluno.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { Token } from '../usuario/usuario.interface';

@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
@Controller("api/aluno")
export class AlunoController {
    constructor(
        private readonly alunoService: AlunoService,
        private readonly usuarioService: UsuarioService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("getAll")
    async getAll(@Req() req: Token): Promise<Aluno[]> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.alunoService.getAll(professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("getId/:aluno")
    async getId(
        @Req() req: Token,
        @Param("aluno") aluno: string
    ): Promise<Aluno> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.alunoService.getId(aluno, professor);
    }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Put("update")
    async update(
        @Req() req: Token,
        @Body() aluno: AlunoUpdateViewModel
    ): Promise<void> {
        const professor = await this.usuarioService.recuperarId(req.user.nivelAcesso, req.user._id);
        return this.alunoService.update(aluno, professor);
    }
}
