import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { MockMatchOpt } from 'src/const/schema.const';

export interface MockConditionMatcher {
  opt: MockMatchOpt,
  value: string
}

export interface MockCondition {
  [key: string]: MockConditionMatcher,
}

@Entity()
export class Mock {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  api: string; // api ID

  @Column()
  condition: { query?: MockCondition[], path?: MockCondition[] };

  @Column()
  response: object;

  @Column('datetime')
  createAt: string;

  @Column('datetime')
  updateAt: string;
}

