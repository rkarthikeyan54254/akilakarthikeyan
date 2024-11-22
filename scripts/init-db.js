import { initDb, run } from '../src/lib/db.js';
import bcrypt from 'bcryptjs';

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create tables
    await initDb();

    // Create default admin user if none exists
    const defaultAdmin = {
      username: 'admin',
      password: 'admin123' // Change this in production
    };

    const adminCount = await run('SELECT COUNT(*) as count FROM admins');
    
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(defaultAdmin.password, 10);
      await run(
        'INSERT INTO admins (username, password) VALUES (?, ?)',
        [defaultAdmin.username, hashedPassword]
      );
      
      console.log('Default admin user created');
      console.log('Username:', defaultAdmin.username);
      console.log('Password:', defaultAdmin.password);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();