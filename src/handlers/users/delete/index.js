function deleteUser(req, res, db, deleteEngine) {
  res.set('Content-Type', 'application/json');

  return deleteEngine(req, db)
    .then(result => {
      if (result.n === 0) {
        res.status(404);
        return res.json({ message: 'This user does not exist' });
      }
      res.json({ message: 'User deleted' });
    })
    .catch(err => {
      res.status(500);
      res.json({ message: 'Internal Server Error' });
    });
}

export default deleteUser;
