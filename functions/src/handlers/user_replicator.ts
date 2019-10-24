import * as functions from 'firebase-functions';
import { EventContext } from 'firebase-functions'; // tslint:disable-line

import { determineFirestoreAction } from '../utils/helpers';
import { FirestoreProfile } from '../typings/profile'
import UserRepository from '../repositories/user_repo';
import { ACTION } from '../utils/constant';
import { User } from '../typings/user';

const { region }: { region: any } = { region: String(process.env.FB_REGION) };

const userSqlTranformer = (data: FirestoreProfile, context: EventContext): Partial<User> => ({
    firebase_id: context.params.userId,
    email: data.email,
    username: data.username,
    name: data.fullName,
    gender: data.gender,
    image_url: data.imageUrl,
    phone: data.phone,
});

export const userOnChangeHandler = functions.region(region).firestore.document('/profiles/{userId}')
    .onWrite(async (change, context): Promise<void> => {
        try {
            const userRepo = new UserRepository();
            const { action, data } = determineFirestoreAction<FirestoreProfile>(change);

            // create or update user profile
            if ([ACTION.CREATE, ACTION.UPDATE].includes(action)){
                const payload = userSqlTranformer(data, context);
                await userRepo.upsert({ firebase_id: context.params.userId }, payload);
            } 
        } catch (err) {
            console.error(err.message);
        }
    })