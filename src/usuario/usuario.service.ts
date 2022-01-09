import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { AlunoFactory } from "../aluno/aluno.factory";
import { AlunoRepository } from "../aluno/aluno.repository";
import { IdiomaEnum } from "../enum/idioma.enum";
import { ProfessorRepository } from "../professor/professor.repository";
import { Resposta } from "../helpers/resposta.interface";
import { AlunoViewModel, LoginViewModel, ProfessorViewModel } from "./usuario.dto";
import { UsuarioFactory } from "./usuario.factory";
import { UsuarioRepository } from "./usuario.repository";
import { StatusEnum } from "../enum/status.enum";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { compareSync } from "bcrypt";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";

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
            throw new BadRequestException("Desculpe ocorreu um erro");
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
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }

    async login(usuario: LoginViewModel): Promise<Resposta>{
        try {
            const usuarioEncontrado = await this.usuarioRepository.getEmail(usuario.email);
            
            if(!usuarioEncontrado ){
                return { status: HttpStatus.NOT_FOUND, menssagem: MensagemHelper.EMAIL_INCORRETO}; 
            }
            
            const isSenhaValid = compareSync(usuario.senha, usuarioEncontrado.senha)

            if(!isSenhaValid ){
                return { status: HttpStatus.NOT_FOUND, menssagem: MensagemHelper.SENHA_INCORRETA}; 
            }

            if(usuarioEncontrado.status != StatusEnum.ativo){
                return { status: HttpStatus.NOT_FOUND, menssagem: MensagemHelper.STATUS_INCORRETO(usuarioEncontrado.status) }; 
            }
            
            return { status: HttpStatus.OK, menssagem: usuarioEncontrado._id};
            
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException("Desculpe ocorreu um erro");
        }
    }
    
    async validToken(_id: string, nivelAcesso: NivelAcessoEnum): Promise<void> {
        try {
            const usuario = await this.usuarioRepository.getId(_id)
            if(!usuario || nivelAcesso !== usuario.nivelAcesso){
                throw new BadRequestException(`${_id} ${MensagemHelper.USUARIO_NAO_AUTORIZADO}.`);
            }
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(`${MensagemHelper.USUARIO_NAO_AUTORIZADO}`);
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

    // async update(usuario: Usuario): Promise<void> {
    //     try {
    //         const entity = UsuarioFactory(usuario);
    //         await this.repository.update(entity);
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new BadRequestException("Desculpe ocorreu um erro");
    //     }
    // }

    // async delete(_id: string): Promise<void> {
    //     try {
    //         await this.repository.delete(_id);
    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new BadRequestException("Desculpe ocorreu um erro");
    //     }
    // }
}
