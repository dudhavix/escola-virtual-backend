import { Usuario } from "./usuario.interface";

export interface Arquivo {
    usuario: Usuario;
    nome: string;
    caminho: string;
    tamanho: string;
    formato: string;
    _id?: string;
}