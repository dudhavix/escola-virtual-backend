import { Usuario } from "../usuario/usuario.interface";
import { ArquivoEntity } from "./arquivo.entity";

export const ArquivoFactory = (nome: string, tamanho: string, caminho: string, formato: string, usuario: Usuario): ArquivoEntity => {
    return new ArquivoEntity(nome, tamanho, caminho, formato, usuario);
}