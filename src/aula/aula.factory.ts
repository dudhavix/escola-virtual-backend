import { Professor } from "../professor/professor.interface";
import { AulaCreateViewModel, AulaUpdateViewModel } from "./aula.dto";
import { AulaCreateEntity, AulaUpdateEntity } from "./aula.entity";

export const AulaCreateFactory = (viewModel: AulaCreateViewModel, professor: Professor): AulaCreateEntity => {
    var { arquivos, observacao, temaAula } = viewModel;
    return new AulaCreateEntity(professor, temaAula, observacao, arquivos);
}

export const AulaUpdateFactory = (viewModel: AulaUpdateViewModel): AulaUpdateEntity => {
    var { arquivos, observacao, temaAula, _id } = viewModel;
    return new AulaUpdateEntity(temaAula, observacao, arquivos, _id);
}