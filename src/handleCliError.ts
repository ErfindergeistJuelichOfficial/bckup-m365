interface CommandOutput {
  error?: {
    message: string;
    code?: number;
  }
  stdout: string;
  stderr: string;
}

export function handleCliError(co: CommandOutput) {
  if(co.error) {
    throw Error(co.error.message)
  }

  if(co.stderr) {
    throw Error(co.stderr)
  }

  return null
}