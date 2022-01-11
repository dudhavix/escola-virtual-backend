import { TurmaCreateViewModel, TurmaUpdateViewModel, } from "src/turma/turma.dto";
import { FrequenciaEnum } from "../enum/frequencia.enum";
import { TagEnum } from "../enum/tag.enum";
import { Professor } from "../professor/professor.interface";
import { TurmaCreateEntity, TurmaUpdateEntity } from "./turma.entity";

export const TurmaCreateFactory = (viewModel: TurmaCreateViewModel, professor: Professor): TurmaCreateEntity => {
    var { nome, tag,  frequencia, observacao } = viewModel;
    
    tag = TagEnum[tag];
    frequencia = FrequenciaEnum[frequencia];
    
    return new TurmaCreateEntity(tag, nome, frequencia, observacao, professor);
}

export const TurmaUpdateFactory = (viewModel: TurmaUpdateViewModel): TurmaUpdateEntity => {
    var { nome, frequencia, observacao, _id } = viewModel;
    
    frequencia = FrequenciaEnum[frequencia];
    
    return new TurmaUpdateEntity(nome, frequencia, observacao, _id);
}