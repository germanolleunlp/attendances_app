const { db } = require("@vercel/postgres");
const { users } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function createTables(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    await client.sql`
      CREATE TABLE IF NOT EXISTS attendees (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        assisted BOOLEAN NOT NULL DEFAULT FALSE,
        date DATE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;

    await client.sql`CREATE UNIQUE INDEX IF NOT EXISTS attendees_unique_index ON attendees (user_id, date)`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await createTables(client);
    await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, role, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.role}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
