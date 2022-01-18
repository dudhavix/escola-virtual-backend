import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { AlunoCreateFactory } from "../aluno/aluno.factory";
import { AlunoRepository } from "../aluno/aluno.repository";
import { IdiomaEnum } from "../enum/idioma.enum";
import { ProfessorRepository } from "../professor/professor.repository";
import { UsuarioAlunoViewModel, UsuarioProfessorViewModel, UsuarioUpdateViewModel } from "./usuario.dto";
import { UsuarioEditFactory, UsuarioFactory } from "./usuario.factory";
import { UsuarioRepository } from "./usuario.repository";
import { EmitirMensagemHelper, MensagemHelper } from "../helpers/mensagens.helper";
import { Usuario } from "./usuario.interface";
import { Professor } from "../professor/professor.interface";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { ProfessorService } from "../professor/professor.service";
import { Aluno } from "../aluno/aluno.interface";
import { AlunoService } from "../aluno/aluno.service";
import { MensagemEnum } from "../enum/mensagem.enum";

@Injectable()
export class UsuarioService {
    private logger = new Logger(UsuarioService.name);

    constructor(
        @Inject("UsuarioRepository") private readonly usuarioRepository: UsuarioRepository,
        @Inject("ProfessorRepository") private readonly professorRepository: ProfessorRepository,
        @Inject("AlunoRepository") private readonly alunoRepository: AlunoRepository,
        private readonly professorService: ProfessorService,
        private readonly alunoService: AlunoService,
    ) { }

    async createProfessor(novoUsuario: UsuarioProfessorViewModel): Promise<void> {
        const existeEmail = await this.validaExiste("email", novoUsuario.email);
        if (existeEmail) EmitirMensagemHelper(MensagemEnum.EMAIL_EXISTE);
        try {
            const usuarioEntity = UsuarioFactory(novoUsuario);
            const usuario = await this.usuarioRepository.create(usuarioEntity);
            const professorEntity = { usuario, idioma: IdiomaEnum[novoUsuario.idioma] };
            await this.professorRepository.create(professorEntity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO)
        }
    }

    async createAluno(novoUsuario: UsuarioAlunoViewModel, professor: Professor): Promise<void> {
        const existeEmail = await this.validaExiste("email", novoUsuario.email);
        if (existeEmail) EmitirMensagemHelper(MensagemEnum.EMAIL_EXISTE);
        try {
            const usuarioEntity = UsuarioFactory(novoUsuario);
            const usuario = await this.usuarioRepository.create(usuarioEntity);
            const alunoEntity = AlunoCreateFactory({
                usuario,
                endereco: novoUsuario.endereco,
                nivelAtual: novoUsuario.nivelAtual,
                nivelMeta: novoUsuario.nivelMeta,
                observacao: novoUsuario.observacao,
                turma: novoUsuario.turma
            }, professor)
            await this.alunoRepository.create(alunoEntity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.CRIADO_ERRO);
        }
    }

    async ativar(_id: string): Promise<void> {
        try {
            await this.usuarioRepository.ativar(_id);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.OCORREU_ERRO);
        }
    }

    async desativar(_id: string): Promise<void> {
        try {
            await this.usuarioRepository.desativar(_id);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.OCORREU_ERRO);
        }
    }

    async getEmail(email: string): Promise<Usuario> {
        try {
            const usuario = await this.usuarioRepository.getEmail(email);
            if(!usuario) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return usuario;
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_ERRO);
        }
    }

    async update(editUsuario: UsuarioUpdateViewModel): Promise<void> {
        try {
            const usuarioEntity = UsuarioEditFactory(editUsuario);
            await this.usuarioRepository.update(usuarioEntity);
        } catch (error) {
            this.logger.error(error);
            EmitirMensagemHelper(MensagemEnum.ALTERACOES_ERRO);
        }
    }

    async getId(_id: string): Promise<Usuario> {
        try {
            const usuario = await this.usuarioRepository.getId(_id);
            if(!usuario) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return usuario;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.OCORREU_ERRO);
        }
    }

    async getAll(): Promise<Usuario[]> {
        try {
            const usuarios = await this.professorRepository.getAll();
            if(!usuarios) EmitirMensagemHelper(MensagemEnum.NADA_ENCONTRADO_SUCESSO);
            return usuarios;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async recuperarId(entity: string, usuario: Usuario): Promise<Professor | Aluno>{
        if (entity == NivelAcessoEnum.professor) {
            return this.professorService.recuperarId(usuario);
        }

        if (entity == NivelAcessoEnum.aluno) {
            return this.alunoService.recuperarId(usuario);
        }
    }

    private async validaExiste(key: string, value: string): Promise<boolean> {
        const usuario = await this.usuarioRepository.validarExiste(key, value);
        if (usuario) return true;
        return false;
    }
}
