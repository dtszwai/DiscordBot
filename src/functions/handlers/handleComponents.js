const { readdirSync, existsSync } = require("fs");
module.exports = (client) => {
  client.handleComponents = async () => {
    const path = `./src/components`;
    if (!existsSync(path)) return;
    const componentFolder = readdirSync(path);

    for (const folder of componentFolder) {
      const componentFiles = readdirSync(`${path}/${folder}`).filter((filter) =>
        filter.endsWith(`.js`)
      );
      const { buttons, selectMenus, modals } = client;

      switch (folder) {
        case "buttons":
          loadComponents(folder, componentFiles, buttons);
          break;
        case "selectMenus":
          loadComponents(folder, componentFiles, selectMenus);
          break;
        case "modals":
          loadComponents(folder, componentFiles, modals);
          break;
        default:
          break;
      }
    }
  };
};

const loadComponents = (folder, componentFiles, componentMap) => {
  for (const file of componentFiles) {
    const component = require(`../../components/${folder}/${file}`);
    componentMap.set(component.data.name, component);
  }
};
