import createUserHandler from './create';
import retrieveUserHandler from './retrieve';
import userListHandler from './list';
import deleteUserHandler from './delete';

const handlers = {
  create: createUserHandler,
  retrieve: retrieveUserHandler,
  list: userListHandler,
  delete: deleteUserHandler
};

export default handlers;
