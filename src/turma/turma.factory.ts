import { TurmaViewModel } from "src/turma/turma.dto";
import { FrequenciaEnum } from "../enum/frequencia.enum";
import { TagEnum } from "../enum/tag.enum";
import { TurmaEntity } from "./turma.entity";

export const TurmaFactory = (viewModel: TurmaViewModel): TurmaEntity => {
    var { professor, nome, tag,  frequencia, observacao } = viewModel;
    
    tag = TagEnum[tag];
    frequencia = FrequenciaEnum[frequencia];
    
    const entity = new TurmaEntity(professor, tag, nome, frequencia, observacao);
    return entity
}