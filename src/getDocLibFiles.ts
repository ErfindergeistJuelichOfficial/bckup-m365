import { IDocLib } from "./IConfig.js";
import { IFile } from "./IFilte.js";
import { buildPath } from "./buildPath.js";
import { spoFileGet } from "./cli/spo-file-get.js";
import { spoFileList } from "./cli/spo-file-list.js";
import { spoListItemGet } from "./cli/spo-listitem-get.js";

export async function getDocLibFiles(docLib: IDocLib) {
  try {
    let json = await spoFileList<IFile[]>({
      webUrl: docLib.webUrl,
      folderUrl:docLib.folderUrl
    })
    
    if(!json) {
      throw Error("No Data")
    }

    json = json.filter(item => item.Name.indexOf(".aspx") < 1)

    buildPath(docLib.localPath)

    const listItemCollection = []
  
    json.map(async (item: IFile, index: number) => {
      
      let path = `./${docLib.localPath.join("/")}/${item.Name}`

      if(docLib.properties && docLib.title) {
        // We want some props
        const itemProperties = await spoListItemGet({
          webUrl: docLib.webUrl,
          listTitle: docLib.title,
          uniqueId: item.UniqueId,
          properties: docLib.properties.join(",")
        })

        listItemCollection.push(itemProperties)
      }


      if(docLib?.groupBy && docLib.groupBy.length > 0) {
        const groupByValues = docLib.groupBy.map(gb => {
          // console.log("gb", gb)
          console.log(item)
          return item[gb as keyof IFile]
        })

        console.log("groupByValues", groupByValues)

        path = `./${docLib.localPath.join("/")}/${groupByValues.join("/")}/${item.Name}`
        console.log(path)
        buildPath([...docLib.localPath, ...docLib.groupBy])
      }

      // console.log(item)
      await spoFileGet({
        webUrl: docLib.webUrl,
        uniqueId: item.UniqueId,
        asFile: true,
        path
      })
      
      //await cli.executeCommand("spo file get", { webUrl: docLib.webUrl, id: item.UniqueId, asFile: true, path: path} )
      console.log("file created:", path)
    })
  }
  catch(e) {
    console.log(e)
  }
}
