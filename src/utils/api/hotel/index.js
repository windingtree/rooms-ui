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

function getHotel(id) {
  return fetch(`${CONSTANTS.API_URL}/api/v1/hotel/${id}`, {
    method: 'GET',
    headers: makeAuthHeaders(),
  }).then(checkStatus)
    .then(parseJSON)
    .then((hotel) => {
      apiCache.setHotel(hotel)

      return hotel
    })
}

function updateHotel(id, data) {
  apiCache.updateHotel(data)

  return fetch(`${CONSTANTS.API_URL}/api/v1/hotel/${id}`, {
    method: 'PATCH',
    headers: makeAuthHeaders(),
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then((hotel) => {
      apiCache.setHotel(hotel)

      return hotel
    })
}

export {
  getHotel,
  updateHotel,
}
