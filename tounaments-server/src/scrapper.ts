import { GoogleSheets } from './app/utils/google-sheet'

export const scrapper = async () => {
  const credentials = {
    client_email: 'atp-tournaments@atp-tournaments.iam.gserviceaccount.com',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyh0hE9g59eulb\nOs0pk5E23uhACjky7JZ8UqAeWcN4sh0+skFQ1YTB1qdGKzE9qC2IDJ1QEkhA4jO8\ncvUxlVMsgGeowV/segSPaPiAcwswOSykk1ToLAf6KQqtL+LuvJv4Hk8sc8LXRRCu\nIa19Fv4+N9AaNwZi0VdNxKHDdFwD+L/bldVfDqz4uMSINfAQJB7fg6jDF2cJHuXd\n40KduZlIBTSDcSCxD0uONQ5Y8iiQiypppCb+3ZjsfA7wkAxq1ofUwmb0mJzF/PJT\neaHc5CkQclYXD+02vMeU1D977LHXNYOYJOqbNr0rqj8DHntcVxLHoSVbpXFJUcoz\n81T4MwbvAgMBAAECggEAOavwEa73AVwaVElLi3nLOFGL71weHDBHcMP0S7mtpqjL\nP7yv0uAW8dNY2BcN4iAZDVEd5IbzZlpsYh00zh6x7rdQRTiqtya3oGhFlqETZTGj\nFUsu642Fyi9F7qqAgaTWMbIA25hNweLiv43LkJRD729yP3W1D2kW7d1ucEh/jRxd\nJaitu9Q9eob5Nqt5hDoOlXc8TM8735nC35VExB32HgDsMzntEATSK7OQ8eJL5ji+\nZW39DVoGa5DRFvK2kRioRO6ckT8R0XfTYxJupvyxRCy1ZhYR7RwkViy4/Kayxdm3\n8bRtR78xQ5pt3WMNoq5aI2K3YBDQMvzK3MV0qE40aQKBgQDXbzN6Otlq2Yj4dK/h\nDwMdynXz5T2oh9Nm/x+fMLqaWCs9cTh4WTr7wn8VqlXgWGQmpq4dZHu3Gag6BUWW\nrz6xI2RMHi2djwl0FUoUGFI2SfMAFIUIvXEuPpLaxiJgFUvOk04ixLLpegbmW3/E\nUukdx9JwOKQ4WE1LX7dl209yawKBgQDUJRFPg87Mh6HNxgFrSDwwegMOaEwy6ret\nVerM2SytODKMenDblvaQ6sETfyiThaqg97zx/s46tGzfVUq1JUZMO2+F/JKY9UWK\nCKsvk/4JKMgWMNZSgkp7Kd1tQTDawNrfaIuUoEz9USv0yf+h175b58timWtpSaoJ\nce8uS+eGjQKBgEsAS8uh8U9hrG3TMegIce1NLwNaK70gjFivOTMSo+RYDbW2VRKQ\n/hfn/pZsVrlkDHnoTXWuJeP46rhIXZG4MPs6dxCI8RiJU6E2SDP2w6hi1laQzj/c\ntCqFXlsL36vTvjCM2AcCs8bU1NIdyL1wn/feOUUYcxOqqj4zdIXhdCdBAoGACbHj\n96FLaxdrso6w8+kqLwD0cM0dZlpJqJc7kr7+BrCBxt+1lqNwgzDnP+/Yt90s7gxE\nSz7cx9wE+bPZJSwd6U/yCcqAHJNg6Sz6PcNioaKGelUjBkRECRrhrqODCwwzNHB/\nqHwm6JC0FIzCrO/CGEsghVIDkZ03MxVM2+3GF+UCgYBo61JrgDHjfU8wUuQRdH+j\n6J88KCPLP/MUxOsvSvlaY72rfem1JXbwhJH41a+jVrMAtfbT+ITNpUAyFxZpLabw\nyxS1q4RGJsQlnYRbQB4k8tJ3SA1zKGV8ja0qwtqRiGRd8cT+fVCaIeYbxuRSFryU\n+GX+EHK87wFJc+H9UgoGdg==\n-----END PRIVATE KEY-----\n'
  }

  const googleSheet = new GoogleSheets(credentials)
  const sheetData = await googleSheet.getData(
    '139Bw_k1bBrrDL0hmdHaoVG3_jFvqkkAX7J26KrXPjBc',
    'A2:AB'
  )
  const tournaments = sheetData.map((row: string[]) => ({
    code: row[3],
    name: row[2],
    date: new Date(row[6]),
    location: row[5],
    winner: row[15],
    winnerId: row[18]
  }))

  return tournaments.filter(
    (item: any) => item.code != '' && item.winnerId != ''
  )
}
