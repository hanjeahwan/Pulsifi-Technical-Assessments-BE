import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';

@Module({
    imports: [
    TypeOrmModule.forRoot({  
        type: "postgres",
        url: process.env.DATABASE_URL || 'postgresql://postgres:fgacyc94@localhost:5432/nestjs',
        entities: [User],
        synchronize: true
    }),
    UsersModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {
    constructor(private readonly connection: Connection) {}
}