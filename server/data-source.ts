import { DataSource } from 'typeorm';

// Versión final apuntando a los archivos de TypeScript en 'src'
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'teamflow_user',
  password: 'teamflow_password',
  database: 'teamflow',

  // Apuntamos a los archivos fuente (.ts)
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
});