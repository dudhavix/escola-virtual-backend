import { Arquivo } from "../arquivo/arquivo.interface";
import { Professor } from "../professor/professor.interface";

export class AulaCreateEntity {
    constructor(
        public professor: Professor,
        public temaAula: string,
        public observacao: string,
        public arquivos: Array<Arquivo>
    ) { }
}

export class AulaUpdateEntity {
    constructor(
        public temaAula: string,
        public observacao: string,
        public arquivos: Array<Arquivo>,
        public _id: string,
    ) { }
}