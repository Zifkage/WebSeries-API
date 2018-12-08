function deleteUser(req, { User }) {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: req.params.userId }, function(err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

export default deleteUser;
