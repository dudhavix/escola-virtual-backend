import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { AlunoCreateFactory } from "../aluno/aluno.factory";
import { AlunoRepository } from "../aluno/aluno.repository";
import { IdiomaEnum } from "../enum/idioma.enum";
import { ProfessorRepository } from "../professor/professor.repository";
import { Resposta } from "../helpers/resposta.interface";
import { UsuarioAlunoViewModel, UsuarioProfessorViewModel, UsuarioUpdateViewModel } from "./usuario.dto";
import { UsuarioEditFactory, UsuarioFactory } from "./usuario.factory";
import { UsuarioRepository } from "./usuario.repository";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Usuario } from "./usuario.interface";
import { Professor } from "../professor/professor.interface";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { ProfessorService } from "../professor/professor.service";
import { Aluno } from "../aluno/aluno.interface";
import { AlunoService } from "../aluno/aluno.service";

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

    async createProfessor(novoUsuario: UsuarioProfessorViewModel): Promise<Resposta> {
        const existeEmail = await this.validaExiste("email", novoUsuario.email);
        if (existeEmail) throw new BadRequestException(MensagemHelper.EMAIL_EXISTE);
        try {
            const usuarioEntity = UsuarioFactory(novoUsuario);
            const usuario = await this.usuarioRepository.create(usuarioEntity);
            const professorEntity = { usuario, idioma: IdiomaEnum[novoUsuario.idioma] };
            await this.professorRepository.create(professorEntity);
            return { menssagem: "Professor criado", status: HttpStatus.CREATED }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.CRIADO_ERRO);
        }
    }

    async createAluno(novoUsuario: UsuarioAlunoViewModel, professor: Professor): Promise<Resposta> {
        const existeEmail = await this.validaExiste("email", novoUsuario.email);
        if (existeEmail) throw new BadRequestException(MensagemHelper.EMAIL_EXISTE);
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
            return { menssagem: MensagemHelper.CRIADO_SUCESSO, status: HttpStatus.CREATED };
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.CRIADO_ERRO);
        }
    }

    async ativar(_id: string): Promise<Resposta> {
        try {
            await this.usuarioRepository.ativar(_id);
            return { status: HttpStatus.OK, menssagem: MensagemHelper.USUARIO_ATIVIDO }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async desativar(_id: string): Promise<Resposta> {
        try {
            await this.usuarioRepository.desativar(_id);
            return { status: HttpStatus.OK, menssagem: MensagemHelper.USUARIO_DESATIVADO }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getEmail(email: string): Promise<Usuario> {
        try {
            return this.usuarioRepository.getEmail(email);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async update(editUsuario: UsuarioUpdateViewModel): Promise<Resposta> {
        try {
            const usuarioEntity = UsuarioEditFactory(editUsuario);
            await this.usuarioRepository.update(usuarioEntity);
            return { menssagem: MensagemHelper.ALTERACOES_REALIZADAS, status: HttpStatus.OK };
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async getId(_id: string): Promise<Usuario> {
        try {
            return this.usuarioRepository.getId(_id);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(MensagemHelper.OCORREU_ERRO);
        }
    }

    async getAll(): Promise<any> {
        try {
            return this.professorRepository.getAll();
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
