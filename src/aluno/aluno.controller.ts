import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NivelAcessoGuard } from '../auth/estrategia/nivelacesso.guard';
import { NivelAcessoDecorator } from '../helpers/nivel-acesso.decorator';
import { NivelAcessoEnum } from '../enum/nivel-acesso.enum';
import { Aluno } from './aluno.interface';
import { AlunoService } from './aluno.service';

@Controller("api/aluno")
@UseGuards(AuthGuard("jwt"), NivelAcessoGuard)
export class AlunoController {
    constructor(
        private readonly alunoService: AlunoService
    ) { }

    @NivelAcessoDecorator(NivelAcessoEnum.professor)
    @Get("getAll")
    async getAll(@Req() req: any): Promise<any> {
        console.log(req.user);

    }
}
