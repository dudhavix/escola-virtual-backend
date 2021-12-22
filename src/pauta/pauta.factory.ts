import { PautaCreateViewModel, PautaUpdateViewModel } from "./pauta.dto";
import { PautaEntity } from "./pauta.entity";

export const PautaFactory = (viewModel: PautaCreateViewModel | PautaUpdateViewModel): PautaEntity => {
    var { aluno, atraso, observacao, presente } = viewModel;
    return new PautaEntity(aluno, presente, atraso, observacao);
}