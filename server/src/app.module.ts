import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { ProjectsModule } from './projects/projects.module'; // 1. Importa el nuevo ProjectsModule
import { User } from './auth/entities/user.entity';
import { Team } from './teams/entities/team.entity';
import { TeamMember } from './teams/entities/team-member.entity';
import { Project } from './projects/entities/project.entity'; // Importa la entidad Project

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
      entities: [User, Team, TeamMember, Project], // 2. Asegúrate de que Project esté en la lista de entidades
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    ProjectsModule, // 3. Añade ProjectsModule a la lista de imports
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }