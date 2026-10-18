import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { isFieldSelected } from '../utils/index.js';
import { GetProfileDto, GetProfilesDto } from './dto/index.js';
import { ProfileModel, ProfilesPageModel } from './models/index.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly _profileService: ProfileService) {}

  @Query(() => ProfileModel, { nullable: true })
  profile(@Args() { id }: GetProfileDto) {
    return this._profileService.getById(id);
  }

  @Query(() => ProfilesPageModel)
  profiles(
    @Args() { skip, take }: GetProfilesDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this._profileService.getAll(
      skip,
      take,
      isFieldSelected(info, 'totalCount'),
    );
  }
}
