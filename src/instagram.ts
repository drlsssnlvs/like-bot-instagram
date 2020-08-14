import puppeteer from "puppeteer";

import { BASE_URL, TAG_URL } from "./consts";

let browser: any = null;
let page: any = null;

class Instagram {
  init = async (): Promise<void> => {
    browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();
  };

  auth = async (user: any, pass: any): Promise<void> => {
    await page.goto(`${BASE_URL}accounts/login/?source=auth_switcher`, {
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

  like = async (tag: string): Promise<any> => {
    let posts = [];

    await page.waitFor(5000);

    await page.goto(TAG_URL(tag), { waitUntil: "networkidle2" });

    await page.waitFor(1500);

    posts = await page.$$('article > div:nth-child(3) img[decoding="auto"]');

    for (let i = 0; i < 3; i++) {
      const post = posts[i];

      console.log(posts);

      await post.click();

      const clickLike = await page.$$(
        "body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div"
      );

      page.waitFor(2000);

      await clickLike[0].click();

      page.waitFor(2000);

      const closeWindow = await page.$x("/html/body/div[4]/div[3]/button");

      await closeWindow[0].click();

      page.waitFor(1000);
    }

    page.waitFor(60000);
  };
}

export default Instagram;
