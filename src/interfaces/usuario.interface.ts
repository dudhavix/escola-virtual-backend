import { AcessoEnum, IdiomaEnum, NivelFluenciaEnum, StatusEnum } from "../helpers/index.enum";
import { Arquivo } from "./arquivo.interface";
import { Turma } from "./turma.interface";

export interface Usuario {
    nome: string;
    email: string;
    senha: string;
    endereco: string;
    idioma: IdiomaEnum;
    acesso: AcessoEnum;
    status: StatusEnum;
    foto: Arquivo ,
    telefone: string;
    dataNascimento: string;
    aluno?: Aluno,
    _id?:string
}

export interface Aluno {
    nivelFluenciaDesejado: NivelFluenciaEnum,
    nivelFluenciaAtual: NivelFluenciaEnum,
    turma: Turma,
    professor: Usuario,
    observacao: string
}

export interface Token {
    user: {
        nivelAcesso: AcessoEnum;
        _id: Usuario;
    }
}