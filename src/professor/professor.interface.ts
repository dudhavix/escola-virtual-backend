import { IdiomaEnum } from "../enum/idioma.enum";

export interface Professor {
    nome: string;
    email: string;
    senha: string;
    idioma: IdiomaEnum;
}