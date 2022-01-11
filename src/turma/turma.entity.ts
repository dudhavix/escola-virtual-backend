import { FrequenciaEnum } from "../enum/frequencia.enum";
import { TagEnum } from "../enum/tag.enum";
import { Professor } from "../professor/professor.interface";

export class TurmaCreateEntity {
    constructor(
        public tag: TagEnum,
        public nome: string,
        public frequencia: FrequenciaEnum,
        public observacao: string,
        public professor: Professor,
    ){ }
}

export class TurmaUpdateEntity {
    constructor(
        public nome: string,
        public frequencia: FrequenciaEnum,
        public observacao: string,
        public _id: string,
    ){ }
}