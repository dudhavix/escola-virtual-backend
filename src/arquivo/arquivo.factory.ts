import { ArquivoEntity } from "./arquivo.entity";

export const ArquivoFactory = (nome: string, tamanho: string, caminho: string, formato: string): ArquivoEntity => {
    return new ArquivoEntity(nome, tamanho, caminho, formato);
}