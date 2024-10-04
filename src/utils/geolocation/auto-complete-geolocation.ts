import { COUNTRIES } from '@/assets/options/countries'
import { Cities, Countries, States } from '@/utils/feathers'

const BRAZIL_COUNTRY_ID = '5d0bf4ec0146598cf3dd13bc'

export const getCountries = async (text: string) => {
  const filter = text
    ? { name: { $search: text } }
    : { isoCode: ['BR', 'US', 'MX', 'IN'] }

  return Countries.find({
    query: {
      ...filter,
      $select: ['_id', 'name', 'isoCode'],
      $sort: { name: 1 },
      $limit: 10
    }
  })
    .then((response: any) => {
      return formatGeolocationResponse(response)
    })
    .catch(() => {
      return COUNTRIES
    })
}

export const getStatesByCountry = async (
  text: string,
  countryId: string | undefined = undefined
) => {
  const options = {
    sort: {
      score: {
        $meta: 'textScore'
      }
    },
    project: {
      score: {
        $meta: 'textScore'
      }
    }
  }

  return States.find({
    query: {
      countryId: countryId ?? BRAZIL_COUNTRY_ID,
      $text: text.length !== 2 ? { $search: text } : undefined,
      isoCode: text.length === 2 ? text : undefined,
      $select: ['_id', 'name', 'isoCode']
    },
    ...options
  }).then(formatGeolocationResponse)
}

export const getCitiesByState = async (
  text: string,
  stateId: string | undefined
) => {
  if (!stateId) {
    return Promise.resolve([])
  }

  const query = {
    stateId,
    $text: { $search: text },
    $select: ['_id', 'name'],
    $limit: 10
  }

  const options = {
    sort: {
      score: {
        $meta: 'textScore'
      }
    },
    project: {
      score: {
        $meta: 'textScore'
      }
    }
  }

  return await Cities.find({
    query,
    ...options
  }).then(formatGeolocationResponse)
}

function formatGeolocationResponse(response: {
  data: { _id: string; name: string; isoCode: string }[]
}) {
  return response.data.map(
    (document: { _id: string; name: string; isoCode: string }) => ({
      id: document._id,
      name: document.name,
      ...(document.isoCode && { isoCode: document.isoCode })
    })
  )
}
