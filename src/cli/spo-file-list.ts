import { handleCliError } from "../handleCliError";

interface ISpoFileList {
  webUrl: string;
  folderUrl: string;
  fields?: string[];
  recursive?: boolean;
}

export async function spoFileList<T>(props: ISpoFileList): Promise<T | null> {
  try {
    const cli = await import("@pnp/cli-microsoft365")
    const resposneCommandOutput = await cli.executeCommand("spo file list", { 
      webUrl: props.webUrl,
      folderUrl: props.folderUrl,
      fields: props.fields ? props.fields : ["Name", "UniqueId"],
      recursive: props.recursive ? props.recursive : true,
    })

    handleCliError(resposneCommandOutput)
    const json = await JSON.parse(resposneCommandOutput.stdout)
    return json
  }
  catch(e) {
    console.error(e)
    return null
  }
}