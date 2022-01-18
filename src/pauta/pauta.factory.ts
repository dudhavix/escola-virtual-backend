import { Professor } from "../professor/professor.interface";
import { PautaUpdateViewModel } from "./pauta.dto";
import { PautaCreateEntity, PautaUpdateEntity } from "./pauta.entity";
import { Pauta } from "./pauta.interface";

export const PautaCreateFactory = (viewModel: Pauta, professor: Professor): PautaCreateEntity => {
    var { professor, turma, aluno, frequencia, atraso, observacao } = viewModel;
    return new PautaCreateEntity(professor, turma, aluno, frequencia, atraso, observacao);
}

export const PautaUpdateFactory = (viewModel: PautaUpdateViewModel): PautaUpdateEntity => {
    var { frequencia, atraso, observacao, _id } = viewModel;
    return new PautaUpdateEntity(frequencia, atraso, observacao, _id);
}