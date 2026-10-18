import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ExperienceModel } from './experience.model.js';
import { SkillModel } from './skill.model.js';

@ObjectType()
export class BaseProfileModel {
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

@ObjectType()
export class ProfileModel extends BaseProfileModel {
  @Field(() => [SkillModel])
  skills: SkillModel[];

  @Field(() => [ExperienceModel])
  experiences: ExperienceModel[];
}

@ObjectType()
export class ProfilesPageModel {
  @Field(() => [BaseProfileModel])
  items: BaseProfileModel[];

  @Field(() => Int)
  totalCount: number;
}
