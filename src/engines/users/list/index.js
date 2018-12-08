function usersList(db) {
  return new Promise((resolve, reject) => {
    db.User.find({}, function(err, users) {
      if (err) {
        return reject(new Error('Internal Server Error'));
      }

      resolve(users);
    });
  });
}

export default usersList;
