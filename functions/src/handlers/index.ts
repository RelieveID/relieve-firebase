import * as functions from 'firebase-functions';
import * as UserHandler from './user_replicator';

const health = functions.https.onRequest((request, response) => {
 response.send("relieve is up !");
});

export default {
    ...UserHandler,
    health
}