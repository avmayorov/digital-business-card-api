import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class GetProfilesDto {
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  skip: number;

  @Field(() => Int, { defaultValue: 20 })
  @IsInt()
  @Min(1)
  @Max(100)
  take: number;
}
