import express from 'express'
import moment from 'moment'
import fetch from 'cross-fetch'
import isLoggedIn from '../utils/authGuard'
import { CLOUDFLARE_ZONE, CLOUDFLARE_TOKEN } from '../utils/secrets'

const analyticRouter = express.Router()

/**
 * Lists all users from the database.
 *
 * @remarks
 * GET /api/v1/analytics/list
 *
 * @returns <JSON> { User[] }
 */
analyticRouter.get('/list', isLoggedIn, async (req, res) => {
  const data = await queryGraphQL()
  res.status(200).json(data)
})

// Purge Madness... Blame cloudflare
// Use this for documentation:
// https://pages.johnspurlock.com/graphql-schema-docs/cloudflare.html
const queryGraphQL = async () => {
  let now = moment()
  now = now.subtract(1, 'months')
  // Months start from 0
  const date = now.format('YYYY-MM-DD')
  const query = `query {
    viewer {
      zones(filter: {zoneTag: "${CLOUDFLARE_ZONE}"}) {
        httpRequests1dGroups(
          orderBy: [date_ASC], 
          limit: 100, 
          filter: {
            date_gt: "${date}"
          }
        ) {
          dimensions {
            date
          }
          sum {
            browserMap {
              pageViews
              uaBrowserFamily
            }
            countryMap {
              clientCountryName
            }
            pageViews
            requests
          }
          uniq {
            uniques
          }
        }
      }
    }
  }`
  const data = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_TOKEN}`
    }
  }).then(res => res.json())
    .catch(error => console.error(error))

  const length = data.data.viewer.zones[0].httpRequests1dGroups.length
  // Get # of page views
  let monthlyViews = 0
  for (let i = 0; i < length; i++) {
    const item = data.data.viewer.zones[0].httpRequests1dGroups[i]
    monthlyViews += item.sum.pageViews
  }
  return { monthly: monthlyViews, data: data.data.viewer.zones[0].httpRequests1dGroups }
}

export default analyticRouter

// Example Data[]
// {
//   "dimensions": {
//       "date": "2022-04-19"
//   },
//   "sum": {
//       "browserMap": [
//           {
//               "pageViews": 2,
//               "uaBrowserFamily": "Unknown"
//           },
//           {
//               "pageViews": 87,
//               "uaBrowserFamily": "Chrome"
//           },
//           {
//               "pageViews": 35,
//               "uaBrowserFamily": "Firefox"
//           }
//       ],
//       "countryMap": [
//           {
//               "clientCountryName": "CN"
//           },
//           {
//               "clientCountryName": "US"
//           },
//           {
//               "clientCountryName": "RU"
//           },
//           {
//               "clientCountryName": "FR"
//           }
//       ],
//       "pageViews": 124,
//       "requests": 1508
//   },
//   "uniq": {
//       "uniques": 19
//   }
// }
