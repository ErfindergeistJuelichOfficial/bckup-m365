
import { handleCliError } from "../handleCliError";

interface IProps {
  certificateFile: string; //path to .pfx file -> /Users/user/dev/localhost.pfx
  password: string; // pfx password
  tenant: string;
  appId: string;
}

interface IResult {
  "connectedAs": string; //"john.doe@contoso.onmicrosoft.com",
  "authType": string; //"DeviceCode",
  "appId": string; //"31359c7f-bd7e-475c-86db-fdb8c937548e",
  "appTenant": string; //"common",
  "cloudType": string; //"Public"
}

// https://pnp.github.io/cli-microsoft365/cmd/login/
export async function login(props: IProps): Promise<IResult | null> {
  try {
  const cli = await import("@pnp/cli-microsoft365")
  const resposneCommandOutput = await cli.executeCommand("login", { 
    authType: "certificate",
    certificateFile: props.certificateFile,
    password: props.password,
    tenant: props.tenant,
    appId: props.appId
  })

  handleCliError(resposneCommandOutput)
  const json: IResult = await JSON.parse(resposneCommandOutput.stdout)
  return json
 }
 catch(e) {
  console.error(e)
  return null  
 }
}