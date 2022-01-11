import { hashSync } from 'bcrypt';
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { StatusEnum } from "../enum/status.enum";
import { UsuarioEditEntity, UsuarioEntity } from "./usuario.entity";
import { Usuario } from "./usuario.interface";

export const UsuarioFactory = (viewModel: Usuario): UsuarioEntity => {
    var { email, nome, senha, status, foto, telefone, nivelAcesso, dataNascimento } = viewModel;
    nivelAcesso = NivelAcessoEnum[nivelAcesso];
    status ? status = StatusEnum[status] : status = StatusEnum.pendente;
    senha = hashSync(senha, 10);
    return new UsuarioEntity(nome, email, senha, telefone, dataNascimento, foto, nivelAcesso ,status);
}

export const UsuarioEditFactory = (viewModel: Usuario): UsuarioEditEntity => {
    var { nome, email, telefone, dataNascimento, foto, _id } = viewModel;
    return new UsuarioEditEntity(nome, email, telefone, dataNascimento, foto, _id)
}