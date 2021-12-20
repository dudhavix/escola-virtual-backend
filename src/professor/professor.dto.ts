import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IdiomaEnum } from "src/enum/idioma.enum";

export class ProfessorCreateViewModel {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    idioma: IdiomaEnum;
}