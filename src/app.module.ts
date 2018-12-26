import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
    TypeOrmModule.forRoot({  
        type: "postgres",
        url: process.env.DATABASE_URL || 'postgresql://postgres:fgacyc94@localhost:5432/nestjs',
        entities: [UserEntity],
        synchronize: true
    }),
    UserModule,
    AuthModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {
    constructor(private readonly connection: Connection) {}
}