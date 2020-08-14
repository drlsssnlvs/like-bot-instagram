import puppeteer from "puppeteer";

import { BASE_ULR } from "./consts";

let browser: any = null;
let page: any = null;

class Instagram {
  init = async (): Promise<void> => {
    browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();
  };

  auth = async (user: any, pass: any): Promise<void> => {
    await page.goto(`${BASE_ULR}accounts/login/?source=auth_switcher`, {
      waitUntil: "networkidle2",
    });

    await page.waitFor(2500);

    await page.type("input[name='username']", user);
    await page.type("input[name='password']", pass);

    const confirmLogin = await page.$x(
      "/html/body/div[1]/section/main/div/article/div/div[1]/div/form/div/div[3]/button/div"
    );

    await confirmLogin[0].click();
  };
}

export default Instagram;
