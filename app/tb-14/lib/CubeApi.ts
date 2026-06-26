export class CubeApi {
  private secretKey = '527bed62fe2c4177b283b64c222091c4'
  private agent = '00fe1e6f43704a75baa7777638902981'
  private url = 'https://ktencallback.pwdice.com/api/v1/platform/'

  private async getHash(body: string, secretKey: string): Promise<string> {
    const result = body + secretKey
    const encoder = new TextEncoder()
    const data = encoder.encode(result)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return btoa(hashHex)
  }

  private async request(endpoint: string, data: any = {}): Promise<any> {
    const url = this.url + endpoint
    const jsonBody = Object.keys(data).length > 0 ? JSON.stringify(data) : ''
    const hash = await this.getHash(jsonBody, this.secretKey)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'hash': hash,
        'agent': this.agent,
        'Content-Type': 'application/json'
      },
      body: jsonBody
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  public async getVendors(): Promise<any[]> {
    return this.request('vendors')
  }

  public async getGameList(vendorKey: string, type: string | null = null): Promise<any[]> {
    const data: any = {
      vendorKey
    }

    if (type !== null) {
      data.type = type
    }

    return this.request('game/game-list', data)
  }
}
