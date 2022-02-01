const excelToJson = require('convert-excel-to-json');
const http = require('http');

/**
 * Script to upload historical figures from an Excel Collection to MongoDB.
 * 
 * Gabe Hoban - 01/14/2022
 */

const result = excelToJson({
    sourceFile: 'source.xlsx',
    columnToKey: {
        A: 'surname',
        B: 'firstname',
        C: 'prefix',
        D: 'pen_name',
        E: 'dob',
        F: 'dod',
        G: 'position',
        H: 'address',
        I: 'neighborhood',
        J: 'city',
        K: 'post_code',
        L: 'proposer',
        M: 'org1',
        N: 'org2',
        O: 'org3',
        P: 'org4',
        Q: 'org5',
        R: 'periodicals',
        S: 'sources',
        T: 'other',
        U: 'joined'
    },
    sheetStubs: true
});

const filled_data = [];

/**
 * The excelToJson tool works pretty well, however, it does
 * not fill in any blank/null entries from the excel sheet.
 * 
 * This is needed to stay uniform when adding the enteries to the DB.
 */
var keysArray = Object.keys(result);
for (var i = 0; i < keysArray.length; i++) {
    var key = keysArray[i];

    for (var j = 0; j < result[key].length; j++) {
        // As a person can appear accross multiple date ranges,
        // lets add a field specifying which one.

        result[key][j]['date_range'] = key

        if (result[key][j]['surname'] == null) {
            result[key][j]['surname'] = ''
        }
        if (result[key][j]['firstname'] == null) {
            result[key][j]['firstname'] = ''
        }
        if (result[key][j]['prefix'] == null) {
            result[key][j]['prefix'] = ''
        }
        if (result[key][j]['pen_name'] == null) {
            result[key][j]['pen_name'] = ''
        }
        if (result[key][j]['dob'] == null) {
            result[key][j]['dob'] = ''
        }
        if (result[key][j]['dod'] == null) {
            result[key][j]['dod'] = ''
        }
        if (result[key][j]['position'] == null) {
            result[key][j]['position'] = ''
        }
        if (result[key][j]['address'] == null) {
            result[key][j]['address'] = ''
        }
        if (result[key][j]['neighborhood'] == null) {
            result[key][j]['neighborhood'] = ''
        }
        if (result[key][j]['city'] == null) {
            result[key][j]['city'] = ''
        }
        if (result[key][j]['post_code'] == null) {
            result[key][j]['post_code'] = ''
        }
        if (result[key][j]['proposer'] == null) {
            result[key][j]['proposer'] = ''
        }

        // I created the orgs as an array in the database, lets convert it.
        let orgs = [];
        if (!result[key][j]['org1'] == null) {
            orgs.push(result[key][j]['org1'])
        }
        if (!result[key][j]['org2'] == null) {
            orgs.push(result[key][j]['org2'])
        }
        if (!result[key][j]['org3'] == null) {
            orgs.push(result[key][j]['org3'])
        }
        if (!result[key][j]['org4'] == null) {
            orgs.push(result[key][j]['org4'])
        }
        if (!result[key][j]['org5'] == null) {
            orgs.push(result[key][j]['org5'])
        }

        if (orgs.length == 0) {
            orgs.push('')
        }

        result[key][j]['orgs'] = orgs

        if (result[key][j]['periodicals'] == null) {
            result[key][j]['periodicals'] = ''
        }
        if (result[key][j]['sources'] == null) {
            result[key][j]['sources'] = ''
        }
        if (result[key][j]['other'] == null) {
            result[key][j]['other'] = ''
        }
        if (result[key][j]['joined'] == null) {
            result[key][j]['joined'] = ''
        }

        filled_data.push(result[key][j])
    }
}

console.log("All Missing Data is Filled")

console.log(filled_data.length)


function JSON_to_URLEncoded(element, key, list) {
    var list = list || [];
    if (typeof (element) == 'object') {
        for (var idx in element)
            JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    } else {
        list.push(key + '=' + encodeURIComponent(element));
    }
    return list.join('&');
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function upload(person) {
    await sleep(5000)
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/persons/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ2hvYmFuMTRAZ21haWwuY29tIiwiaWF0IjoxNjQyMjA4OTk4LCJleHAiOjE2NDIyMTA3OTh9.MN1BkREALhGLz8IzTkR49rJp136gL9kLxmpWPrkQXTY',
        }
    }

    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(JSON_to_URLEncoded(person))
    req.end()

    console.log("Added ", person)
}

// LET THE FUN BEGIN

for (let x = 0; x < filled_data.length; x++) {
    if (filled_data[x].surname == 'Surname') {
        console.log("Found row #1 in sheet, ignoring.")
    } else {
        upload(filled_data[x])
    }
}