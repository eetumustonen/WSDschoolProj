import * as requestUtils from "../utils/requestUtils.js";
import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.addNewList(name);
  return requestUtils.redirectTo("/lists");
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];

  await listService.deactivate(id);
  return requestUtils.redirectTo("/lists");
};

const viewLists = async () => {
  const data = {
    lists: await listService.findAllActiveLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const listID = parts[2];

  const data = {
    items: await itemService.getItems(listID),
    theList: await listService.listById(listID),
    listIdForLink: listID,
  };
  return new Response(await renderFile("list.eta", data), responseDetails);
};

export { addList, deactivateList, viewList, viewLists };
