import { IDocLib } from "./IConfig.js";
import { IFile } from "./IFilte.js";
import { buildPath } from "./buildPath.js";

export async function getDocLibFiles(docLib: IDocLib) {

  // if(docLib.groupBy) {
  //   const parameter = `--properties`
  // }

  try {
    const cli = await import("@pnp/cli-microsoft365")
    const fileListCommandOutput = await cli.executeCommand("spo file list", { webUrl: docLib.webUrl, folderUrl:docLib.folderUrl} )
    

    const fileListJSON = await JSON.parse(fileListCommandOutput.stdout)

    buildPath(docLib.localPath)
  
    fileListJSON.map(async (item: IFile, index: number) => {
      const path = `./${docLib.localPath.join("/")}/${item.Name}`
 
      // console.log(item)
      void await cli.executeCommand("spo file get", { webUrl: docLib.webUrl, id: item.UniqueId, asFile: true, path: path} )
      console.log("file created:", path)
    })
  }
  catch(e) {
    console.log(e)
  }
}
