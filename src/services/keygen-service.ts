export async function createRelease(
  body: string,
  keygenAuthKey: string,
  keygenAccountID: string
): Promise<string> {

  const response = await fetch(
    `https://api.keygen.sh/v1/accounts/${keygenAccountID}/releases`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${keygenAuthKey}`,
        Accept: 'application/vnd.api+json',
      },
      body: body
    })
  const { data, errors } = await response.json()
  console.log(errors)
  return data.id
}
