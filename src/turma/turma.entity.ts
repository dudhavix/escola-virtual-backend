import { FrequenciaEnum } from "../enum/frequencia.enum";
import { TagEnum } from "../enum/tag.enum";
import { Professor } from "../professor/professor.interface";

export class TurmaEntity {
    constructor(
        public professor: Professor,
        public tag: TagEnum,
        public nome: string,
        public frequencia: FrequenciaEnum,
        public observacao: string,
    ){ }
}