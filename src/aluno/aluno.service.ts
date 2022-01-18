import { Inject, Injectable, Logger } from "@nestjs/common";
import { MensagemEnum } from "../enum/mensagem.enum";
import { EmitirMensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
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
        try {
            const alunos = await this.repository.getAll(professor);
            if (!alunos) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return alunos;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async getId(_id: string, professor: Professor): Promise<Aluno> {
        try {
            const aluno = await this.repository.getId(_id, professor);
            if (!aluno) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return aluno;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async update(aluno: AlunoUpdateViewModel, professor: Professor): Promise<void> {
        try {
            const entity = AlunoUpdateFactory(aluno);
            await this.repository.update(entity, professor);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.ALTERACOES_ERRO);
        }
    }

    async recuperarId(usuario: Usuario): Promise<Aluno> {
        const aluno = await this.repository.recuperarId(usuario);
        const id = aluno._id as unknown;
        return id as Aluno;
    }
}