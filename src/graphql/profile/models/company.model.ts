import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanyModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  websiteUrl: string | null;
}
