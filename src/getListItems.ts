import { IList } from "./IConfig.js";
import { buildPath } from "./buildPath.js";
import { writeJsonObjectFileSync } from "./writeJsonObjectFileSync.js";
import { handleCliError } from "./handleCliError.js";


export async function getListItems(list: IList) {
  try {
    const cli = await import("@pnp/cli-microsoft365")
    const listitemListCommandOutput = await cli.executeCommand("spo listitem list", { webUrl: list.webUrl, listTitle:list.title} )
    handleCliError(listitemListCommandOutput)

    const listitemGetJSON = await JSON.parse(listitemListCommandOutput.stdout)

    buildPath(list.localPath)

    const itemCollection = listitemGetJSON.map(async (item: any, index: number) => {
      const listitemGetCommandOutput = await cli.executeCommand("spo listitem get", { webUrl: list.webUrl, listTitle: list.title, id: item.Id, properties: list.properties.join(",")} )
      handleCliError(listitemGetCommandOutput)

      const json = await JSON.parse(listitemGetCommandOutput.stdout)
      return json
    })

    const json: object[] = await Promise.all(itemCollection)
    const path = `./${list.localPath.join("/")}/${list.title}.json`

    writeJsonObjectFileSync(path, json);
    console.log("file created:", path)
  }catch(e) {
    console.log(e)
  }

}