import { Schema } from "mongoose";
import { hashSync } from "bcrypt";
import { AcessoEnum, IdiomaEnum, NivelFluenciaEnum, StatusEnum } from "../helpers/index.enum";
import { Aluno, Usuario } from "../interfaces/usuario.interface";
import { Arquivo } from "../interfaces/arquivo.interface";
import { UsuarioCreateModel } from "../models/usuario.model";

export class UsuarioEntity {
    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public endereco: string,
        public idioma: IdiomaEnum,
        public acesso: AcessoEnum,
        public status: StatusEnum,
        public foto: Arquivo,
        public telefone: string,
        public dataNascimento: string,
        public aluno?: Aluno
    ){}
}

export const UsuarioCreateFactory = (viewModel: UsuarioCreateModel): UsuarioEntity => {
    let { aluno, dataNascimento, email, endereco, idioma, nome, telefone } = viewModel;
    idioma =  IdiomaEnum[viewModel.idioma];
    let acesso = AcessoEnum.professor;

    if(aluno){
        acesso =  AcessoEnum.aluno; 
        aluno = {
            nivelFluenciaDesejado: NivelFluenciaEnum[viewModel.aluno.nivelFluenciaDesejado],
            nivelFluenciaAtual: NivelFluenciaEnum[viewModel.aluno.nivelFluenciaAtual],
            turma: viewModel.aluno.turma,
            professor: viewModel.aluno.professor,
            observacao: viewModel.aluno.observacao
        }
    }

    const senha =  hashSync(process.env.SENHA_PADRAO_NOVO_USUARIO, 10);
    const status =  StatusEnum.pendente;
    const foto =  process.env.FOTO_PADRAO_NOVO_USUARIO as unknown as Arquivo;

    return new UsuarioEntity(nome, email, senha, endereco, idioma, acesso, status, foto, telefone, dataNascimento, aluno);
}

export interface UsuarioDocument extends Usuario { }

export const UsuarioSchema = new Schema<Usuario>({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    endereco: { type: String, required: true },
    idioma: { type: String, enum: Object.values(IdiomaEnum), required: true },
    acesso: { type: String, enum: Object.values(AcessoEnum), required: true },
    status: { type: String, enum: Object.values(StatusEnum), required: true },
    foto: { type: Schema.Types.ObjectId, ref: "arquivo", required: true },
    telefone: { type: String, required: true },
    dataNascimento: { type: String, required: true },
    aluno: {
        nivelFluenciaDesejado: { type: String, enum: Object.values(NivelFluenciaEnum), required: true },
        nivelFluenciaAtual: { type: String, enum: Object.values(NivelFluenciaEnum), required: true },
        turma: { type: String, required: true },
        professor: { type: Schema.Types.ObjectId, ref: "usuario", required: true },
        observacao: { type: String, required: false },
        required: false
    },
}, {
    timestamps: true,
    collection: "usuario"
})