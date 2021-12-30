import { encriptar } from "../configs/criptografia.service";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { StatusEnum } from "../enum/status.enum";
import { UsuarioEntity } from "./usuario.entity";
import { Usuario } from "./usuario.interface";

export const UsuarioFactory = (viewModel: Usuario): UsuarioEntity => {
    var { email, nome, senha, status, foto, telefone, nivelAcesso, dataNascimento } = viewModel;
    nivelAcesso = NivelAcessoEnum[nivelAcesso];
    status ? status = StatusEnum[status] : status = StatusEnum.pendente;
    senha = encriptar(senha);
    return new UsuarioEntity(nome, email, senha, telefone, dataNascimento, foto, nivelAcesso ,status);
}