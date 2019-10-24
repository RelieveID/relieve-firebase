import { HttpError, FirebaseContext, MongoContext, DBContext } from 'tymon';
import { loadEnv } from './utils/env';

import Handlers from './handlers';

/** load env */
loadEnv();

/** initiate singletons */
HttpError.initialize();
FirebaseContext.initialize({});

MongoContext.initialize({
    connection_string: String(process.env.MONGO_CONNECTION_STRING),
    database: String(process.env.MONGO_DATABASE)
}); // tslint:disable-line

DBContext.initialize({
    connection_string: String(process.env.SQL_CONNECTION_STRING),
    models_path: String(process.env.SQL_MODELS)
}); // tslint:disable-line

export default {
    ...Handlers
}