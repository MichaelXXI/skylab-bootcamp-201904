import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { createRandomUser, fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { UserModel } from '../../../data/models/user';
import { gCall } from '../../../common/test-utils/gqlCall';
import { SUPERADMIN_ROLE } from '../../../data/models/user';

chai.use(chaiAsPromised);
const { expect } = chai;


describe ('retrieve  own user data', () => {
  it('should retrieve user with correct data');
})