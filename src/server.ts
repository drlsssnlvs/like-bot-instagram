import { config } from "dotenv";
import Instagram from "./instagram";

config();

const instagram = new Instagram();

async function launch() {
  await instagram.init();

  await instagram.auth(process.env.INSTA_USER, process.env.INSTA_PASS);
}

launch();
