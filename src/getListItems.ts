import { IList } from "./IConfig.js";
import { buildPath } from "./buildPath.js";
import { writeJsonObjectFileSync } from "./writeJsonObjectFileSync.js";
import { handleCliError } from "./handleCliError.js";
import { getListItem } from "./getListItem.js";

export async function getListItems(list: IList) {
  try {
    const cli = await import("@pnp/cli-microsoft365")
    
    // TODO: is there a Limit like top 5000, check this!
    const listitemListCommandOutput = await cli.executeCommand("spo listitem list", { webUrl: list.webUrl, listTitle:list.title} )
    void handleCliError(listitemListCommandOutput)

    const listitemGetJSON = await JSON.parse(listitemListCommandOutput.stdout)

    buildPath(list.localPath)

    const itemCollection = listitemGetJSON.map(async (item: any, index: number) => {
      return await getListItem({
        webUrl: list.webUrl,
        listTitle: list.title,
        id: item.Id,
        properties: list.properties.join(",")
      })
    })

    const json: object[] = await Promise.all(itemCollection)
    return json

  }catch(e) {
    console.log(e)
  }

}