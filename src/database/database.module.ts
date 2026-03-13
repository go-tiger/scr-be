import { Module, Global } from '@nestjs/common';
import { createClient, Client } from '@libsql/client';

export const LIBSQL_CLIENT = 'LIBSQL_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: LIBSQL_CLIENT,
      useFactory: async (): Promise<Client> => {
        const client = createClient({
          url: process.env.TURSO_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN,
        });
        await client.execute(`
          CREATE TABLE IF NOT EXISTS streamers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            platform TEXT NOT NULL,
            channelId TEXT NOT NULL,
            name TEXT NOT NULL
          )
        `);
        return client;
      },
    },
  ],
  exports: [LIBSQL_CLIENT],
})
export class DatabaseModule {}
