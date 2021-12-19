import { ProfessorCreateViewModel } from "src/adapter/view/professor.dto";
import { ProfessorEntity } from "../entity/professor.entity";
import { IdiomaEnum } from "../enum/idioma.enum";
import { encriptar } from "../service/criptografia.service";

export const ProfessorFactory = (viewModel: ProfessorCreateViewModel): ProfessorEntity => {
    var { email, nome, senha, idioma } = viewModel;
    
    senha = encriptar(senha);
    idioma = IdiomaEnum[idioma];
    
    const entity = new ProfessorEntity(nome, email, senha, idioma);
    return entity
}