import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CompanyModel } from './company.model.js';
import { ProjectModel } from './project.model.js';

@ObjectType()
export class ExperienceModel {
  @Field(() => Int)
  id: number;

  @Field()
  position: string;

  @Field()
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate: Date | null;

  @Field(() => CompanyModel)
  company: CompanyModel;

  @Field(() => [ProjectModel])
  projects: ProjectModel[];
}
