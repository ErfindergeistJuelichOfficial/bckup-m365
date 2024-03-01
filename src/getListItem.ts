import { handleCliError } from './handleCliError.js';

interface Props {
  webUrl: string;
  listTitle: string;
  id: string;
  properties?: string 
}

export async function getListItem(props: Props): Promise<any> {
  try {
    const cli = await import("@pnp/cli-microsoft365")
    const listitemGetCommandOutput = await cli.executeCommand("spo listitem get", {
      webUrl: props.webUrl,
      listTitle: props.listTitle,
      id: props.id,
      properties: props.properties || undefined
    })

    void handleCliError(listitemGetCommandOutput)

    const json = await JSON.parse(listitemGetCommandOutput.stdout)
    return json

  }
  catch(e) {
    console.log(e)
    return []
  }
}