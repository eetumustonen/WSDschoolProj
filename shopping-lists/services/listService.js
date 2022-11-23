import { executeQuery } from "../database/database.js";

const countLists = async () => {
  const result = await executeQuery(
    "SELECT COUNT (id) as n FROM shopping_lists",
  );
  return result.rows[0].n;
};

const findAllActiveLists = async () => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE active = true;",
  );
  return result.rows;
};

const addNewList = async (name) => {
  await executeQuery(
    "INSERT INTO shopping_lists (name) VALUES ($name);",
    { name: name },
  );
};

const deactivate = async (id) => {
  await executeQuery(
    "UPDATE shopping_lists SET active = false WHERE id = $id;",
    {
      id: id,
    },
  );
};

const listById = async (id) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE id = $id;",
    {
      id: id,
    },
  );

  return result.rows;
};

export { addNewList, countLists, deactivate, findAllActiveLists, listById };
