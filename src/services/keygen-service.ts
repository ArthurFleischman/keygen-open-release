
export async function createRelease(body: string, keygenAuthKey: string, keygenAccountID: string): Promise<string> {

  const response = await fetch(`https://api.keygen.sh/v1/accounts/${keygenAccountID}/releases`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${{ keygenAuthKey }}`,
      "Content-Type": "application/vnd.api+json",
      "Accept": "application/vnd.api+json"
    },
    body: body
  })
  const { data, errors } = await response.json()
  console.log(errors)
  console.log(data)
  return data.id
}
