// https://jasonwatmore.com/post/2021/08/04/next-js-11-jwt-authentication-tutorial-with-example-app#api-users-authenticate-js
import { publicRuntimeConfig } from '@/config'

import { fetchWrapper } from '../helpers/fetch-wrapper'

const baseUrl = `${publicRuntimeConfig.apiUrl}/suggestions`

export const suggestService = {
  getSuggestion,
}

async function getSuggestion(goalAndContext: any, taskDescription: any) {
  console.log('getSuggestions', goalAndContext, taskDescription)
  return await fetchWrapper
    .post(`${baseUrl}/get`, { goalAndContext, taskDescription })
    .then((state) => {
      return state
    })
}
