import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { AlunoFactory } from "../aluno/aluno.factory";
import { AlunoRepository } from "../aluno/aluno.repository";
import { IdiomaEnum } from "../enum/idioma.enum";
import { ProfessorRepository } from "../professor/professor.repository";
import { Resposta } from "../helpers/resposta.interface";
import { AlunoViewModel, ProfessorViewModel } from "./usuario.dto";
import { UsuarioFactory } from "./usuario.factory";
import { Usuario } from "./usuario.interface";
import { UsuarioRepository } from "./usuario.repository";

@Injectable()
export class UsuarioService {
    private logger = new Logger(UsuarioService.name);

    constructor(
        @Inject("UsuarioRepository") private readonly usuarioRepository: UsuarioRepository,
        @Inject("ProfessorRepository") private readonly professorRepository: ProfessorRepository,
        @Inject("AlunoRepository") private readonly alunoRepository: AlunoRepository,
    ){ }

    async createProfessor(novoUsuario: ProfessorViewModel): Promise<Resposta> {
        try {
            const usuarioEntity = UsuarioFactory(novoUsuario);
            const usuario = await this.usuarioRepository.create(usuarioEntity);
            const professorEntity = { usuario, idioma: IdiomaEnum[novoUsuario.idioma] };
            await this.professorRepository.create(professorEntity);
            return { menssagem: "Professor criado", status: HttpStatus.CREATED }
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
    
    async createAluno(novoUsuario: AlunoViewModel): Promise<Resposta> {
        try {
            const usuarioEntity = UsuarioFactory(novoUsuario);
            const usuario = await this.usuarioRepository.create(usuarioEntity);
            const alunoEntity = AlunoFactory({
                usuario,
                endereco: novoUsuario.endereco,
                nivelAtual: novoUsuario.nivelAtual,
                nivelMeta: novoUsuario.nivelMeta,
                observacao: novoUsuario.observacao,
                professor: novoUsuario.professor,
                turma: novoUsuario.turma
            })
            await this.alunoRepository.create(alunoEntity);
            return { menssagem: "Aluno criado", status: HttpStatus.CREATED };
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }
    
    async getEmail(email: string): Promise<Usuario> {
        try {
            const usuario = await this.usuarioRepository.getEmail(email);
            if (usuario) {
                return usuario;
            }
            this.logger.warn("Usuário não encontrado ou não esta ativo");
            return null;
        } catch (error) {
            this.logger.error(error);
            throw new Error("Desculpe ocorreu um erro");
        }
    }

    // async ativar(_id: string): Promise<void> {
    //     try {
    //         await this.repository.ativar(_id);
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new Error("Desculpe ocorreu um erro");
    //     }
    // }

    // async update(usuario: Usuario): Promise<void> {
    //     try {
    //         const entity = UsuarioFactory(usuario);
    //         await this.repository.update(entity);
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new Error("Desculpe ocorreu um erro");
    //     }
    // }

    // async delete(_id: string): Promise<void> {
    //     try {
    //         await this.repository.delete(_id);
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new Error("Desculpe ocorreu um erro");
    //     }
    // }
}
