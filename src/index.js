// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

getUserData(1)
  .then((userData) => console.log(userData))
  .catch((err) => console.log(err));

// RUNNING PROMISE SEQUENTIALLY, USING ASYNC AWAIT

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  const databaseName = await central(id);
  const basicInfo = await dbs[databaseName](id);
  const personalData = await vault(id);

  let userDataObj = {
    id: id,
    ...personalData,
    ...basicInfo,
  };

  // async function auto wrap return value in a promise
  return userDataObj;
}

//////////////////////////////////
// RUNNING PROMISES CONCURRENTLY, USING THEN/CATCH
// function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3,
//   };

//   let userDataObj = {
//     id: id,
//   };

//   Promise.all([central(id), vault(id)])
//     .then(([dbsNum, personalData]) => {
//       // Get the basic info from one of the database
//       try {
//         Object.assign(userDataObj, { ...dbs[dbsNum](id) });
//       } catch (err) {
//         console.log(err);
//         return `Failure at database ${dbsNum}.`;
//       }
//       // Get personal info from the vault
//       Object.assign(userDataObj, { ...personalData });
//     })
//     .catch((err) => console.log(err));

//   return new Promise((resolve) => {
//     resolve(userDataObj);
//   });
// }
