import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/example-database';
import { from, Observable } from 'rxjs';

import { ExampleDatabaseClient } from './example.database.client';

@Injectable()
export class ExampleDatabaseService {
  constructor(protected readonly usersDB: ExampleDatabaseClient) {}

  getBy = (ids: Array<number>): Observable<Users[]> =>
    from(
      this.usersDB.users.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      }),
    );
}
