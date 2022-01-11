import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Resposta } from "../helpers/resposta.interface";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";
import { Usuario } from "../usuario/usuario.interface";
import { AlunoUpdateViewModel } from "./aluno.dto";
import { AlunoUpdateFactory } from "./aluno.factory";
import { Aluno } from "./aluno.interface";
import { AlunoRepository } from "./aluno.repository";

@Injectable()
export class AlunoService {
    private logger = new Logger(AlunoService.name);

    constructor(
        @Inject("AlunoRepository") private readonly repository: AlunoRepository,
    ) { }


    async getAll(professor: Professor): Promise<Aluno[]> {
        var alunos = await this.repository.getAll(professor);
        if (!alunos.length) {
            throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO)
        }
        return alunos;
    }

    async getId(_id: string, professor: Professor): Promise<Aluno> {
        var aluno = await this.repository.getId(_id, professor);
        if (!aluno) {
            throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO);      
        }
        return aluno;
    }

    async update(aluno: AlunoUpdateViewModel, professor: Professor): Promise<Resposta> {
        try {
            const entity = AlunoUpdateFactory(aluno);
            await this.repository.update(entity, professor);
            return {status: HttpStatus.OK, menssagem: MensagemHelper.ALTERACOES_REALIZADAS};
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.ALTERACOES_NAO_REALIZADAS);
        }
    }

    async recuperarId(usuario: Usuario): Promise<Aluno> {
        const aluno = await this.repository.recuperarId(usuario);
        const id = aluno._id as unknown;
        return id as Aluno;
    }
}