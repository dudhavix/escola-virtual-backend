import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as momentTimezone from 'moment-timezone'
import * as dotenv from "dotenv";
import { join } from "path";
import * as express from "express";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(express.static(join("public")));
    
    // app.use((req, res, next) => {
    //     res.header();
    //     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    // })

    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })

    Date.prototype.toJSON = function (): any {
        return momentTimezone(this)
            .tz('America/Sao_Paulo')
            .format('DD-MM-YYYY HH:mm:ss')
    }

    await app.listen(process.env.PORT || 3333);
}

bootstrap();