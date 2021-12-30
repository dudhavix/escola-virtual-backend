import { Arquivo } from "../arquivo/arquivo.interface";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { StatusEnum } from "../enum/status.enum";

export interface Usuario {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    dataNascimento: string;
    foto: Arquivo;
    nivelAcesso: NivelAcessoEnum;
    status?: StatusEnum;
    _id?: string;
}