
import {TypeOrmModule} from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'db',
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true,
            logging: false,
        }),
    ],
    })

export class DBConfig {}
