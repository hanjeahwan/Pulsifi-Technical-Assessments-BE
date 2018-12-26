import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { JobEntity } from './job/entity/job.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.DATABASE_URL || 'postgresql://postgres:fgacyc94@localhost:5432/nestjs',
            entities: [UserEntity, JobEntity],
            synchronize: true
        }),
        UserModule,
        AuthModule,
        JobModule
    ],
    controllers: [
        AppController
    ],
    providers: [],
})

export class AppModule {
    constructor(private readonly connection: Connection) { }
}