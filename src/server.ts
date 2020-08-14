import Instagram from "./instagram";

const instagram = new Instagram();

async function launch() {
  await instagram.init();
}

launch();
