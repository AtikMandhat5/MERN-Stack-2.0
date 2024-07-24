var express = require('express');
var router = express.Router();
const userService = require("../services/users");

/* GET users listing. */
router.get('/', function (req, res, next) {
  userService.getAllUsers((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(users);
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  userService.getUserById(id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
});
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  userService.createUser(name, email, password, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(user);
    }
  });
});



router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  userService.updateUser(id, name, email, password, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  userService.deleteUser(id, (err, message) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(message);
    }
  });
});

module.exports = router;
