import { IdiomaEnum } from "../enum/idioma.enum";

export class ProfessorEntity {
    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public idioma: IdiomaEnum,
    ) { }
}