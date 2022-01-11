import { Usuario } from "../usuario/usuario.interface";

export class ArquivoEntity {
    constructor(
        public nome: string,
        public tamanho: string,
        public caminho: string,
        public formato: string,
        public usuario: Usuario,
    ){ }
}