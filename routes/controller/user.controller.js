const fs = require("fs");

// update multiple user functionality
function findUserTwoArray(userId, allUser) {
  userId.map((user) => {
    allUser.map((user2) => {
      if (user.id == user2.id) {
        user?.name ? (user2.name = user?.name) : user2?.name;
        user?.gender ? (user2.gender = user?.gender) : user2?.gender;
        user?.contact ? (user2.contact = user?.contact) : user2?.contact;
        user?.address ? (user2.address = user?.address) : user2?.address;
        user?.photoUrl ? (user2.photoUrl = user?.photoUrl) : user2.photoUrl;
      } else {
        console.log(`${user.id} is not found`);
      }
    });
  });
  // console.log(allUsers);
  return allUser;
}

// get all user
const getAllUser = (req, res) => {
  const { limits } = req?.query;
  const allUserJson = fs.readFileSync("user.json");
  let allUsers = JSON.parse(allUserJson);
  const limitUser = allUsers.slice(0, limits);
  res.send(limitUser);
};

//random user
const randomUser = (req, res) => {
  fs.readFile("./user.json", (err, data) => {
    if (err) {
      res.write("failed data can not find");
      res.status(403, "failed data");
    } else {
      const allUser = JSON.parse(data);
      const random = allUser[Math.ceil(Math.random() * allUser.length)];
      res.send(random);
    }
  });
};

// save a user in json file api
const saveAUser = (req, res) => {
  const newData = req.body;
  const allUser = fs.readFileSync("user.json");
  let allUsers = JSON.parse(allUser);
  allUsers.push(newData);
  const allUsersStringfy = JSON.stringify(allUsers);
  fs.writeFile("user.json", allUsersStringfy, (err) => {
    if (err) {
      res.write("Data failed can not save");
      res.status(403, "can not save data");
      res.end();
    } else {
      res.write(allUsersStringfy);
      res.status(200, "user saved successfully");
      res.end();
    }
  });
};

// update a user api by using id
const updateAUser = (req, res) => {
  const { id } = req.params;
  const { name, gender, contact, address, photoUrl } = req?.body;

  const allUser = fs.readFileSync("user.json");
  let allUsers = JSON.parse(allUser);

  const idExits = allUsers.some((userExits) => userExits.id === Number(id));
  if (idExits) {
    let findUser = allUsers.find((user) => user.id === Number(id));
    if (findUser) {
      name ? (findUser.name = name) : findUser?.name;
      gender ? (findUser.gender = gender) : findUser?.gender;
      contact ? (findUser.contact = contact) : findUser?.contact;
      address ? (findUser.address = address) : findUser?.address;
      photoUrl ? (findUser.photoUrl = photoUrl) : findUser?.photoUrl;
    }

    const allUsersStringfy = JSON.stringify(allUsers);

    fs.writeFile("user.json", allUsersStringfy, (err) => {
      if (err) {
        res.write(err);
        res.end();
      } else {
        res.write(allUsersStringfy);
        res.end();
      }
    });
  } else {
    res.send(`The ${id} id is not found`);
  }

  //   res.send();
};

// update multiple user update
const updateMultipleUser = (req, res) => {
  const ids = req.body;

  const allUser = fs.readFileSync("user.json");
  let allUsers = JSON.parse(allUser);

  const updateMultipleUser = findUserTwoArray(ids, allUsers);

  const allUsersStringfy = JSON.stringify(updateMultipleUser);

  fs.writeFile("user.json", allUsersStringfy, (err) => {
    if (err) {
      res.write(err);
      res.end();
    } else {
      res.write(allUsersStringfy);
      res.end();
    }
  });
};

// delete a user by using id
const deleteAUser = (req, res) => {
  const { id } = req.params;

  const allUserJson = fs.readFileSync("user.json");
  let allUsers = JSON.parse(allUserJson);

  const idExits = allUsers.some((userExits) => userExits.id === Number(id));
  if (idExits) {
    let deleteUser = allUsers.filter((user) => user.id !== Number(id));
    const allUsersStringfy = JSON.stringify(deleteUser);

    fs.writeFile("user.json", allUsersStringfy, (err) => {
      if (err) {
        res.write(err);
        res.end();
      } else {
        res.write(allUsersStringfy);
        res.end();
      }
    });
  } else {
    res.send(`${id} id not found`);
  }

  
};

module.exports = {
  randomUser,
  getAllUser,
  saveAUser,
  updateAUser,
  updateMultipleUser,
  deleteAUser,
};
