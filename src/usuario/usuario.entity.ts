import { Arquivo } from "../arquivo/arquivo.interface";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { StatusEnum } from "../enum/status.enum";

export class UsuarioEntity {
    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public telefone: string,
        public dataNascimento: string,
        public foto: Arquivo,
        public nivelAcesso: NivelAcessoEnum,
        public status: StatusEnum,
        public _id?: string,
    ) { }
}