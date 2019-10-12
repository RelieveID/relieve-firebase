import { HttpError, FirebaseContext } from 'tymon';
import { loadEnv } from './utils/env';

import Handlers from './handlers';

/** load env */
loadEnv();

/** initiate singletons */
HttpError.initialize();
FirebaseContext.initialize({});

export default {
    ...Handlers
}