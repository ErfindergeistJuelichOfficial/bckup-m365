import { IDocLib } from "./IConfig.js";
import { IFile } from "./IFilte.js";
import { buildPath } from "./buildPath.js";


export async function getDocLibFiles(docLib: IDocLib) {



  try {

    
    const cli = await import("@pnp/cli-microsoft365")
    const fileListCommandOutput = await cli.executeCommand("spo file list", { 
      webUrl: docLib.webUrl,
      folderUrl:docLib.folderUrl,
      //recursive: true,
      // fields:  ["Name", "UniqueId", "Betrag", "Jahr"].join(",")
      properties: ["Betrag", "Jahr"].join(",")
   })
    const fileListJSON = await JSON.parse(fileListCommandOutput.stdout)
    console.log("fileListJSON", fileListJSON)
    buildPath(docLib.localPath)
  
    fileListJSON.map(async (item: IFile, index: number) => {
      
      let path = `./${docLib.localPath.join("/")}/${item.Name}`
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
      void await cli.executeCommand("spo file get", { webUrl: docLib.webUrl, id: item.UniqueId, asFile: true, path: path} )
      console.log("file created:", path)
    })
  }
  catch(e) {
    console.log(e)
  }
}
