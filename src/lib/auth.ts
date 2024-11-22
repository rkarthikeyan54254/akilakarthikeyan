import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function createAdminUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await db.run(`
    INSERT INTO admins (username, password)
    VALUES (?, ?)
  `, [username, hashedPassword]);
}

export async function verifyAdmin(username: string, password: string) {
  const admin = await db.get(`
    SELECT * FROM admins WHERE username = ?
  `, [username]);

  if (!admin) {
    return false;
  }

  return bcrypt.compare(password, admin.password);
}

export function generateToken(username: string) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Middleware to protect admin routes
export async function isAdmin(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) return false;
  
  const payload = verifyToken(token);
  return Boolean(payload);
}