import { handleCliError } from '../handleCliError.js';

interface Props {
  webUrl: string;
  listTitle: string;
  id?: string; // use only id OR uniqueId!
  uniqueId?: string; // use only id or uniqueId!
  properties?: string 
}

export async function spoListItemGet(props: Props): Promise<Object> {
  try {
    if(props.id && props.uniqueId) {
      throw new Error("do not use id and uniqueId at the same time")
    }
    
    const cli = await import("@pnp/cli-microsoft365")
    const listitemGetCommandOutput = await cli.executeCommand("spo listitem get", {
      webUrl: props.webUrl,
      listTitle: props.listTitle,
      id: props.id ?? undefined,
      uniqueId: props.uniqueId ?? undefined,
      properties: props.properties ?? undefined
    })

    handleCliError(listitemGetCommandOutput)

    const json = await JSON.parse(listitemGetCommandOutput.stdout)
    return json

  }
  catch(e) {
    console.log(e)
    return []
  }
}