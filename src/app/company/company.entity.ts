import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field({ nullable: true })
  cost?: number;

  @Field(() => [Company], { nullable: true })
  children?: Company[];
}
