import createUserHandler from './create';
import retrieveUserHandler from './retrieve';

const handlers = {
  create: createUserHandler,
  retrieve: retrieveUserHandler
};

export default handlers;
