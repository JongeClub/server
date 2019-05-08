import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { HttpMethod } from 'src/const/schema.const';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Api {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty()
  method: HttpMethod

  @Column()
  @IsNotEmpty()
  schema: string;

  @Column()
  @IsNotEmpty()
  host: string;

  @Column()
  @IsNotEmpty()
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
