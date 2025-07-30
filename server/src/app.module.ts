import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
// No necesitas importar un UsersModule separado

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true, // Perfecto para desarrollo
    }),
    AuthModule,
    TeamsModule,
    UsersModule,
    // Aquí irían los otros módulos como ProjectsModule, TasksModule, etc.
  ],
})
export class AppModule { }