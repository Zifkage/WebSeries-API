import express from 'express';

import handlers from '../handlers';
import injectHandlerDependencies from '../utils/inject-handler-dependencies';
import engines from '../engines';
import generateErrorMessage from '../system-messages/errors';
import db from '../models';

const handlerToEngineMap = new Map([
  [handlers.users.create, engines.users.create],
  [handlers.users.retrieve, engines.users.retrieve],
  [handlers.users.list, engines.users.list],
  [handlers.users.delete, engines.users.delete]
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
  injectHandlerDependencies(handlers.users.retrieve, db, handlerToEngineMap)
);

router.get(
  '/users',
  injectHandlerDependencies(handlers.users.list, db, handlerToEngineMap)
);

router.delete(
  '/users/:userId',
  injectHandlerDependencies(handlers.users.delete, db, handlerToEngineMap)
);

export default router;
