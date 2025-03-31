import "reflect-metadata";

import { loadEnvConfig } from "@next/env";
import { Folders } from "@/models/folders";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [Folders],
});

await AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error(
            "Error during Data Source initialization ==============>",
            err
        );
    });
