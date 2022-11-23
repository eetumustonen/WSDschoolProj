import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addItem = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const listID = parts[2];
  await itemService.addItem(listID, name);
  return await requestUtils.redirectTo(`/lists/${listID}`);
};

const collect = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const itemID = parts[4];
  const listID = parts[2];
  await itemService.collectItem(itemID);
  return await requestUtils.redirectTo(`/lists/${listID}`);
};

export { addItem, collect };
