import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../data/stories.db');

let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    console.log('Database initialized at:', dbPath);
    db = new Database(dbPath, { verbose: console.log });
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    
    // Configure database for better performance
    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
    db.pragma('cache_size = 1000000');
    db.pragma('temp_store = MEMORY');
  }
  return db;
}

// Initialize database tables
export function initDb() {
  const db = getDb();
  
  // Stories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS stories (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      publish_date DATETIME NOT NULL,
      genre TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Comments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_slug TEXT NOT NULL,
      name TEXT NOT NULL,
      comment TEXT NOT NULL,
      date DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (story_slug) REFERENCES stories(slug)
    )
  `);

  // Admins table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database tables created');
}

// Helper function for queries
export function run(sql: string, params: any[] = []): any {
  return getDb().prepare(sql).run(params);
}

// Helper function for queries that return multiple rows
export function query(sql: string, params: any[] = []): any[] {
  return getDb().prepare(sql).all(params);
}

// Helper function for queries that return a single row
export function queryOne(sql: string, params: any[] = []): any {
  return getDb().prepare(sql).get(params);
}

// Close database connection when the application exits
process.on('exit', () => {
  if (db) {
    console.log('Database connection closed');
    db.close();
  }
});