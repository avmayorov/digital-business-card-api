import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  url: string | null;

  @Field(() => String, { nullable: true })
  repoUrl: string | null;

  @Field(() => [String])
  achievements: string[];
}
