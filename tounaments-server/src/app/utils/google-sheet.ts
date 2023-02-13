import { google, sheets_v4 } from 'googleapis'

export class GoogleSheets {
  private sheets: sheets_v4.Sheets

  constructor(private readonly credentials: any) {
    this.sheets = google.sheets({
      version: 'v4',
      auth: this.authorize(credentials)
    })
  }

  private authorize(credentials: any) {
    const { client_email, private_key } = credentials
    const jwtClient = new google.auth.JWT(
      client_email,
      undefined,
      private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      undefined
    )
    return jwtClient
  }

  async getData(spreadsheetId: string, range: string): Promise<any> {
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    })
    return res.data.values
  }
}
