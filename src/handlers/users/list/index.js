function usersList(req, res, db, list) {
  res.set('Content-Type', 'application/json');

  return list(db)
    .then(users => {
      res.status(200);
      res.json(users);
    })
    .catch(err => {
      res.status(404);
      res.json({ message: err.message });
    });
}

export default usersList;
