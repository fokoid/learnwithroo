import API_KEY from './api-key.js'

const API_HOST = 'https://westus.api.cognitive.microsoft.com/emotion'
const API_VERSION = 'v1.0'
const API_ENDPOINT = 'recognize'
const API_URL = [ API_HOST, API_VERSION, API_ENDPOINT ].join('/')

const API_METHOD = 'POST'
const API_HEADERS = new Headers({
  'Content-Type': 'application/octet-stream',
  'Ocp-Apim-Subscription-Key': API_KEY
})
const API_HEADERS_URL = new Headers({
  'Content-Type': 'application/json',
  'Ocp-Apim-Subscription-Key': API_KEY
})

export const emotionNames = {
  happiness: 'Happy',
  sadness: 'Sad',
  disgust: 'Disgusted',
  surprise: 'Surprised',
  fear: 'Afraid',
  anger: 'Angry',
  contempt: 'Contempt',
  neutral: 'Neutral'
}

export const getEmotions = image => fetch(
  API_URL, {
    method: API_METHOD,
    headers: API_HEADERS,
    body: image
  }
).then(response => response.json())

export const getEmotionsFromUrl = url => fetch(
  API_URL, {
    method: API_METHOD,
    headers: API_HEADERS_URL,
    body: { url }
  }
)

// number of allowed queries per minute
export const rateLimit = 20

// value below which to ignore emotion score
export const emotionCutoff = 0.3
