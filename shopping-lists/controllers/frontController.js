import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewFrontPage = async () => {
  const data = {
    numberOfLists: await listService.countLists(),
    numberOfItems: await itemService.countItems(),
  };
  return new Response(await renderFile("front.eta", data), responseDetails);
};

export { viewFrontPage };
