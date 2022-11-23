import { executeQuery } from "../database/database.js";

const countItems = async () => {
  const result = await executeQuery(
    "SELECT COUNT (id) as n FROM shopping_list_items",
  );
  return result.rows[0].n;
};

const addItem = async (listID, name) => {
  await executeQuery(
    "INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($listID, $name)",
    { listID: listID, name: name },
  );
};

const getItems = async (listID) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $listID ORDER BY collected ASC, name ASC",
    { listID: listID },
  );

  return result.rows;
};

const collectItem = async (itemID) => {
  await executeQuery(
    "UPDATE shopping_list_items SET collected = true WHERE id = $itemID",
    { itemID: itemID },
  );
};

export { addItem, collectItem, countItems, getItems };
