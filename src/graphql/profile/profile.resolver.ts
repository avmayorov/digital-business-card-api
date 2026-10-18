import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProfileModel } from './models/profile.model.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, { nullable: true })
  profile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.getById(id);
  }

  @Query(() => [ProfileModel])
  profiles() {
    return this.profileService.getAll();
  }
}
