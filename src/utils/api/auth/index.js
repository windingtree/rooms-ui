import {
  checkStatus,
  makeHeaders,
  parseJSON,
} from '../helpers'

import {
  CONSTANTS
} from '../../constants'

import {
  ApiCache,
} from '../../api_cache'

const apiCache = ApiCache.getInstance()

function login(data) {
  return fetch(`${CONSTANTS.API_URL}/api/v1/login`, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then((profile) => {
      apiCache.setProfile(profile)

      return profile
    })
}

function emailOneTimePassword(data) {
  return fetch(`${CONSTANTS.API_URL}/api/v1/one_time_password`, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)}

export {
  login,
  emailOneTimePassword,
}
