import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Api {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  schema: string;

  @Column()
  host: string;

  @Column()
  path: string;

  @Column()
  query: JSON;

  @Column()
  request: JSON;

  @Column()
  response: JSON;

  @Column('datetime')
  createAt: string;

  @Column('datetime')
  updateAt: string;
}
