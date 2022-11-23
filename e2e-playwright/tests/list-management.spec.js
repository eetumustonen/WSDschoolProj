const { test, expect } = require("@playwright/test");

test("Main page has expected title, headings and link.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Shared shopping lists");
  await expect(page.locator("a")).toHaveText("Lists");
});

test("Can create a list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit] >> text=Create list").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

//This test doesnt work

test("Can deactivate list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = "Deactivate";
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit] >> text=Create list").click();
  await page.locator("input[type=submit] >> text=Deactivate list!").click();
  
  await expect(page.locator(`a >> text='${listName}'`)).not.toHaveText(
    listName,
  );
});
await page.locator(`:nth-match(:text(Deactivate list!), 0)`).click();
:nth-match(text="Deactivete list", 3)

test("Individual list page has the right heading and list of items.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit] >> text=Create list").click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
  await page.locator(`a >> text='${listName}'`).click();

  await expect(page.locator("h1")).toHaveText(listName);
  const itemName = `My item: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit] >> text=Add item!").click();
  await expect(page.locator("li")).toHaveText(itemName);
});
