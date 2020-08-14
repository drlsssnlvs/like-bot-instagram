import puppeteer from "puppeteer";

import { BASE_ULR } from "./consts";

let browser = null;
let page = null;

class Instagram {
  init = async (): Promise<void> => {
    browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();

    await page.goto(BASE_ULR, { waitUntil: "networkidle2" });
  };
}

export default Instagram;
