import { Controller, Get } from "@nestjs/common";

@Controller("api/")
export class IndexController {
    constructor() { }

    @Get("")
    index() {
        return "Bem vindo";
    }
}