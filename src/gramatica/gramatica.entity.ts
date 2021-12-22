import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";

export class GramaticaEntity {
    constructor(
        public professor: Professor,
        public sentenca1: string,
        public sentenca2: string,
        public sentenca3: string,
        public nivel: NivelEnum
    ) { }
}