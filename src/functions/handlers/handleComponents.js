const { readdirSync } = require("fs");
module.exports = (client) => {
  client.handleComponents = async () => {
    const compoentFolder = readdirSync(`./src/components`);

    for (const folder of compoentFolder) {
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(
        (filter) => filter.endsWith(`.js`)
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
