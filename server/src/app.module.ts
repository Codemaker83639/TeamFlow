// En: server/src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// Se eliminaron las importaciones de AppController y AppService que no se usan
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { User } from './auth/entities/user.entity';
import { Team } from './teams/entities/team.entity';
import { TeamMember } from './teams/entities/team-member.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Team, TeamMember],
      synchronize: true, // true solo para desarrollo
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
  ],
  // Se eliminaron AppController y AppService de aquí
  controllers: [],
  providers: [],
})
export class AppModule { }