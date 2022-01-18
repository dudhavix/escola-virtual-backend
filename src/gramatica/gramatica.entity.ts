import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";

export class GramaticaCreateEntity {
    constructor(
        public professor: Professor,
        public sentenca1: string,
        public sentenca2: string,
        public sentenca3: string,
        public nivel: NivelEnum,
    ) { }
}

export class GramaticaUpdateEntity {
    constructor(
        public sentenca1: string,
        public sentenca2: string,
        public sentenca3: string,
        public nivel: NivelEnum,
        public _id: string
    ) { }
}