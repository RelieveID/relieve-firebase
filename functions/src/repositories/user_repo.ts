import SQLRepo from './base/sql_repository';
import { Context } from '../typings/common';
import { User } from '../typings/user';

export default class UserRepository extends SQLRepo<User> {
    public constructor(context?: Context) {
        super('User', context);
    }
}
