const excelToJson = require('convert-excel-to-json');
const http = require('http');

/**
 * Script to work magic on the Excel Spreadsheet.
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

let filled_data = [];

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
        } else if (typeof (result[key][j]['dob']) == 'object') {
            result[key][j]['dob'] = result[key][j]['dob'].toISOString().slice(0, 10);
        }

        if (result[key][j]['dod'] == null) {
            result[key][j]['dod'] = ''
        } else if (typeof (result[key][j]['dod']) == 'object') {
            result[key][j]['dod'] = result[key][j]['dod'].toISOString().slice(0, 10);
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
        } else if (typeof (result[key][j]['joined']) == 'object') {
            result[key][j]['joined'] = result[key][j]['joined'].toISOString().slice(0, 10);
        }

        filled_data.push(result[key][j])
    }
}


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
        path: '/api/v1/person/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
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
let fixed = []
for (let x = 0; x < filled_data.length; x++) {
    for (let y = 0; y < filled_data.length; y++) {
        if (filled_data[x].surname == filled_data[y].surname) {
            if (filled_data[x].date_range != filled_data[y].date_range) {
                if (!fixed.includes(filled_data[y].surname + ";" + filled_data[y].firstname + ";" + filled_data[y].date_range)) {
                    fixed.push(filled_data[y].surname + ";" + filled_data[y].firstname + ";" + filled_data[y].date_range)

                    // Convert string to array
                    if (typeof(filled_data[x].date_range) == 'string') {
                        filled_data[x].date_range = [ filled_data[x].date_range ]
                    }

                    // Push date range of other version
                    filled_data[x].date_range.push(filled_data[y].date_range)

                    // Needs more validators
                    if (filled_data[x].prefix != filled_data[y].prefix) {
                        if (filled_data[x].prefix.search(filled_data[y].prefix) == -1) {
                            if (filled_data[x].prefix != '' && filled_data[y].prefix != '') {
                                filled_data[x].prefix += ", "
                            }

                            filled_data[x].prefix += filled_data[y].prefix;
                        }

                    }

                    if (filled_data[x].pen_name != filled_data[y].pen_name) {
                        if (filled_data[x].pen_name != '' && filled_data[y].pen_name != '') {
                            filled_data[x].pen_name += ", "
                        }

                        filled_data[x].pen_name += filled_data[y].pen_name;
                    }

                    if (filled_data[x].dob != filled_data[y].dob) {
                        if (filled_data[x].dob != '' && filled_data[y].dob != '') {
                            filled_data[x].dob += ", "
                        }

                        filled_data[x].dob += filled_data[y].dob;
                    }

                    if (filled_data[x].dod != filled_data[y].dod) {
                        if (filled_data[x].dod != '' && filled_data[y].dod != '') {
                            filled_data[x].dod += ", "
                        }

                        filled_data[x] += filled_data[y].dod;
                    }

                    if (filled_data[x].position != filled_data[y].position) {
                        if (filled_data[x].position != '' && filled_data[y].position != '') {
                            filled_data[x].position += ", "
                        }

                        filled_data[x].position += filled_data[y].position;
                    }

                    if (filled_data[x].address != filled_data[y].address) {
                        if (filled_data[x].address != '' && filled_data[y].address != '') {
                            filled_data[x].address += ", ";
                        }

                        filled_data[x].address += filled_data[y].address;
                    }

                    if (filled_data[x].neighborhood != filled_data[y].neighborhood) {
                        if (filled_data[x].neighborhood != '' && filled_data[y].neighborhood != '') {
                            filled_data[x].neighborhood += ", ";
                        }

                        filled_data[x].neighborhood += filled_data[y].neighborhood;
                    }

                    if (filled_data[x].city != filled_data[y].city) {
                        if (filled_data[x].city != '' && filled_data[y].city != '') {
                            filled_data[x].city += ", ";
                        }

                        filled_data[x].city += filled_data[y].city;
                    }

                    if (filled_data[x].post_code != filled_data[y].post_code) {
                        if (filled_data[x].post_code != '' && filled_data[y].post_code != '') {
                            filled_data[x].post_code += ", ";
                        }

                        filled_data[x].post_code += filled_data[y].post_code;
                    }

                    if (filled_data[x].proposer != filled_data[y].proposer) {
                        if (filled_data[x].proposer != '' && filled_data[y].proposer != '') {
                            filled_data[x].proposer += ", ";
                        }

                        filled_data[x].proposer += filled_data[y].proposer;
                    }

                    if (filled_data[x].periodicals != filled_data[y].periodicals) {
                        if (filled_data[x].periodicals != '' && filled_data[y].periodicals != '') {
                            filled_data[x].periodicals += ", ";
                        }

                        filled_data[x].periodicals += filled_data[y].periodicals;
                    }

                    if (filled_data[x].sources != filled_data[y].sources) {
                        if (filled_data[x].sources != '' && filled_data[y].sources != '') {
                            filled_data[x].sources += ", ";
                        }

                        filled_data[x].sources += filled_data[y].sources;
                    }

                    if (filled_data[x].other != filled_data[y].other) {
                        if (filled_data[x].other != '' && filled_data[y].other != '') {
                            filled_data[x].other += ", ";
                        }

                        filled_data[x].other += filled_data[y].other;
                    }

                    if (filled_data[x].joined != filled_data[y].joined) {
                        if (filled_data[x].joined != '' && filled_data[y].joined != '') {
                            filled_data[x].joined += ", ";
                        }

                        filled_data[x].joined += filled_data[y].joined;
                    }

                    if (filled_data[x].orgs != filled_data[y].orgs) {
                        if (filled_data[x].orgs != [''] || filled_data[y].orgs != [''])
                        filled_data[x].orgs += filled_data[y].orgs
                    }

                    filled_data.splice(y, 1)
                }
            }
        }
    }

    for (let x = 0; x < filled_data.length; x++) {
        if (filled_data[x].surname == "") {
            filled_data.splice(x, 1)
        } else if (filled_data[x].surname == undefined) {
            filled_data.splice(x, 1)
        }  else if (filled_data[x].surname == 'Surname') {
            filled_data.splice(x, 1)
        }
    }

    // Upload to the database
    upload(filled_data[x])
}

// console.log(JSON.stringify(filled_data))