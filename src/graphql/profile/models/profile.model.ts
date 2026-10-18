import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  githubUrl: string | null;

  @Field(() => String, { nullable: true })
  linkedinUrl: string | null;

  @Field(() => String, { nullable: true })
  websiteUrl: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
