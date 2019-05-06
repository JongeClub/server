import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  token: string;

  @Column('datetime')
  createAt: string;

  @Column('datetime')
  updateAt: string;
}
