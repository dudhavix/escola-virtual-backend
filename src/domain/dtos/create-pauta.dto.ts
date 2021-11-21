import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePautaViewModel {
    @IsBoolean()
    @IsNotEmpty()
    presente: boolean;

    @IsString()
    @IsNotEmpty()
    aluno: string;
}