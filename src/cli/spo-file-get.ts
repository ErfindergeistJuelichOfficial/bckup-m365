import { handleCliError } from "../handleCliError";

interface IProps {
  webUrl: string;
  uniqueId: string;
  asFile?: boolean;
  path?: string;
}

export async function spoFileGet(props: IProps): Promise<void> {
  try {
  const cli = await import("@pnp/cli-microsoft365")
  const resposneCommandOutput = await cli.executeCommand("spo file get", { 
    webUrl: props.webUrl,
    id: props.uniqueId,
    asFile: props.asFile ?? undefined,
    path: props.path ?? undefined
  })

  handleCliError(resposneCommandOutput)
  // const json = await JSON.parse(resposneCommandOutput.stdout)
  // return json
 }
 catch(e) {
  console.error(e)
  
 }
}