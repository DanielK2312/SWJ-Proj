"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const authGuard_1 = __importDefault(require("../utils/authGuard"));
const secrets_1 = require("../utils/secrets");
const analyticRouter = express_1.default.Router();
/**
 * Lists all users from the database.
 *
 * @remarks
 * GET /api/v1/analytics/list
 *
 * @returns <JSON> { User[] }
 */
analyticRouter.get('/list', authGuard_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield queryGraphQL();
    res.status(200).json(data);
}));
// Purge Madness... Blame cloudflare
// Use this for documentation:
// https://pages.johnspurlock.com/graphql-schema-docs/cloudflare.html
const queryGraphQL = () => __awaiter(void 0, void 0, void 0, function* () {
    let now = (0, moment_1.default)();
    now = now.subtract(1, 'months');
    // Months start from 0
    const date = now.format('YYYY-MM-DD');
    const query = `query {
    viewer {
      zones(filter: {zoneTag: "${secrets_1.CLOUDFLARE_ZONE}"}) {
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
  }`;
    const data = yield (0, cross_fetch_1.default)('https://api.cloudflare.com/client/v4/graphql', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            Authorization: `Bearer ${secrets_1.CLOUDFLARE_TOKEN}`
        }
    }).then(res => res.json())
        .catch(error => console.error(error));
    const length = data.data.viewer.zones[0].httpRequests1dGroups.length;
    // Get # of page views
    let monthlyViews = 0;
    for (let i = 0; i < length; i++) {
        const item = data.data.viewer.zones[0].httpRequests1dGroups[i];
        monthlyViews += item.sum.pageViews;
    }
    return { monthly: monthlyViews, data: data.data.viewer.zones[0].httpRequests1dGroups };
});
exports.default = analyticRouter;
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
//# sourceMappingURL=analyticRouter.js.map