import { Usuario } from "./usuario.interface";

export interface Auditoria {
    dataHora: string;
    usuario: Usuario;
    acao: string
}