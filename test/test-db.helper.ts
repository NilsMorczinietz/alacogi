import { DataSource, DataSourceOptions } from 'typeorm';

// Test-Datenbank-Konfiguration
export const testDbConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'testuser',
  password: 'testpass',
  database: 'alacogi_test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Automatisch Schema erstellen für Tests
  dropSchema: true, // Schema vor jedem Test-Run löschen
  logging: false,
};

let dataSource: DataSource | null = null;

/**
 * Initialisiert die Test-Datenbank
 */
export async function initTestDb(): Promise<DataSource> {
  if (dataSource === null) {
    dataSource = new DataSource(testDbConfig);
    await dataSource.initialize();
  }
  return dataSource;
}

/**
 * Räumt die Test-Datenbank auf
 */
export async function cleanupTestDb(): Promise<void> {
  if (dataSource !== null && dataSource.isInitialized) {
    await dataSource.destroy();
    dataSource = null;
  }
}

/**
 * Löscht alle Daten aus allen Tabellen
 */
export async function clearDatabase(ds: DataSource): Promise<void> {
  const entities = ds.entityMetadatas;

  for (const entity of entities) {
    const repository = ds.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`);
  }
}
