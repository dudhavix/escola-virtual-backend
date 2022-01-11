import { Arquivo } from "../arquivo/arquivo.interface";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { StatusEnum } from "../enum/status.enum";

export interface Usuario {
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    foto: Arquivo;
    nivelAcesso?: NivelAcessoEnum;
    senha?: string;
    status?: StatusEnum;
    _id?: string;
}

export interface Token {
    user: {
        nivelAcesso: NivelAcessoEnum;
        _id: Usuario;
    }
}