var express = require('express');
var router = express.Router();
var userData = []

router.post('/todo', function(req, res) {
  var userIndex = findUser(req.body.name)
  if (userIndex == -1) {
    var firstUser = false
    if (userData.length == 0) {
      firstUser =true
    }
    var newUser = {
      name: req.body.name,
      todos: [req.body.task]
    }
    userData.push(newUser)
    res.send({"msg": "user added", "first": firstUser})
  } else {
    userData[userIndex].todos.push(req.body.task)
    res.send({"msg": "Todo added"})
  }
});

function findUser(name) {
  var userIndex = -1 
  for (let index = 0; index < userData.length; index++) {
    if (name.toLowerCase() == userData[index].name.toLowerCase()) {
      userIndex = index
      break
    }  
  }
  return userIndex
}

router.delete("/user/:id", (req, res) => {
  var userIndex = findUser(req.params.id)
  if (userIndex == -1) {
    res.send({"msg": "User not found"})
  } else {
    delete userData[userIndex]
    res.send({"msg": "User Deleted"})
  }
})

router.get("/user/:id", (req, res) => {
  var userIndex = findUser(req.params.id)
  if (userIndex == -1) {
    res.send({"msg": "User not found"})
  } else {
    res.send(userData[userIndex])
  }
})

module.exports = router;