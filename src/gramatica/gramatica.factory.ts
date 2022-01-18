import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";
import { GramaticaCreateViewModel, GramaticaUpdateViewModel } from "./gramatica.dto";
import { GramaticaCreateEntity, GramaticaUpdateEntity } from "./gramatica.entity";

export const GramaticaCreateFactory = (viewModel: GramaticaCreateViewModel, professor: Professor): GramaticaCreateEntity => {
    var { nivel, sentenca1, sentenca2, sentenca3 } = viewModel;
    nivel = NivelEnum[nivel];
    return new GramaticaCreateEntity(professor, sentenca1, sentenca2, sentenca3, nivel);
}

export const GramaticaUpdateFactory = (viewModel: GramaticaUpdateViewModel): GramaticaUpdateEntity => {
    var { nivel, sentenca1, sentenca2, sentenca3, _id } = viewModel;
    nivel = NivelEnum[nivel];
    return new GramaticaUpdateEntity(sentenca1, sentenca2, sentenca3, nivel, _id);
}