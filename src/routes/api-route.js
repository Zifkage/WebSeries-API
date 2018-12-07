import express from 'express';

import handlers from '../handlers';
import injectHandlerDependencies from '../utils/inject-handler-dependencies';
import engines from '../engines';
import generateErrorMessage from '../system-messages/errors';
import db from '../models';

const handlerToEngineMap = new Map([
  [handlers.users.create, engines.users.create],
  [handlers.users.retrieve, engines.users.retrieve]
]);

const router = express.Router();

router.post(
  '/users',
  injectHandlerDependencies(
    handlers.users.create,
    db,
    handlerToEngineMap,
    generateErrorMessage
  )
);

router.get(
  '/users/:userId',
  injectHandlerDependencies(
    handlers.users.retrieve,
    db,
    handlerToEngineMap,
    generateErrorMessage
  )
);

export default router;