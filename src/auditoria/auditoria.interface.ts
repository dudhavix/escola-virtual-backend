import { AcaoEnum } from "../enum/acao.enum";
import { Usuario } from "../usuario/usuario.interface";

export interface Auditoria {
    usuario?: Usuario;
    acao?: AcaoEnum;
    token?: string;
    _id?: string;
}