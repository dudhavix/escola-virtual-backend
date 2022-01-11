import { IdiomaEnum } from "../enum/idioma.enum";
import { Usuario } from "../usuario/usuario.interface";

export interface Professor {
    usuario?: Usuario;
    idioma?: IdiomaEnum;
    _id?: string;
}