import {
  checkStatus,
  makeAuthHeaders,
  parseJSON,
} from '../helpers'

import {
  ApiCache,
} from '../../api_cache'

import {
  CONSTANTS
} from '../../constants'

const apiCache = ApiCache.getInstance()

function getProfile(id) {
  return fetch(`${CONSTANTS.API_URL}/api/v1/profile/${id}`, {
    method: 'GET',
    headers: makeAuthHeaders(),
  }).then(checkStatus)
    .then(parseJSON)
    .then((profile) => {
      apiCache.setProfile(profile)

      return profile
    })
}

function updateProfile(id, data) {
  apiCache.updateProfile(data)

  return fetch(`${CONSTANTS.API_URL}/api/v1/profile/${id}`, {
    method: 'PATCH',
    headers: makeAuthHeaders(),
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then((profile) => {
      apiCache.setProfile(profile)

      return profile
    })
}

export {
  getProfile,
  updateProfile,
}
