import { Usuario } from "../usuario/usuario.interface";

export interface Arquivo {
    usuario?: Usuario;
    nome?: string;
    tamanho?: string;
    caminho?: string;
    formato?: string;
    _id?: string;
}