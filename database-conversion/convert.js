const excelToJson = require('convert-excel-to-json');

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

// Go through each sheet

var keysArray = Object.keys(result);
for (var i = 0; i < keysArray.length; i++) {
    var key = keysArray[i];
    
    for (var j = 0; j < result[key].length; j++ ) {
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

        if (!result[key][j]['surname'] == 'Surname') {
            filled_data.push(result[key][j])
        }
    }
 }

