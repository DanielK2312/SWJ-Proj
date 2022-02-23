import datetime
import pandas
import json
import helper
import requests
import time

columns = helper.columns
people = []

def loadData(date_range):
    excel_data_df = pandas.read_excel('addOne.xlsx', sheet_name=date_range)
    json_str = excel_data_df.to_json()
    return json.loads(json_str)

def formatRaw(range_index, raw_json):
    global people

    for index in range(len(raw_json[columns[0]])):
        person = {}
        for c_index in range(len(columns)):
            # Replace NULL values with empty string
            try:
                if raw_json[columns[c_index]][str(index)] is None:
                    value = ''
                elif isinstance(raw_json[columns[c_index]][str(index)], int):
                    timestamp = raw_json[columns[c_index]][str(index)]
                    date = datetime.datetime.fromtimestamp(timestamp / 1e3)
                    value = date.strftime("%m/%d/%Y")
                elif isinstance(raw_json[columns[c_index]][str(index)], float):
                    value = str(int(raw_json[columns[c_index]][str(index)]))
                else:
                    value = raw_json[columns[c_index]][str(index)]

                column = {
                    helper.db_col[c_index]: value
                }
                person.update(column)
            except:
                formatted = json.dumps(raw_json, indent=4)
                print(formatted)
        column = {
            "date_range": helper.date_ranges[range_index]
        }
        person.update(column)
        people.append(person)
    return people;

def createArrays(people):
    for index in range(len(people)):
        orgs = []
        for org_index in range(len(helper.org_list)):
            if people[index][helper.org_list[org_index]] != '':
                orgs.append(people[index][helper.org_list[org_index]])
            del people[index][helper.org_list[org_index]]
        people[index].update({ 'orgs': orgs })
    return people

def mergePerson(index):
    # global people
    for o_index in range(len(people)):
        try:
            if index == o_index:
                pass
            elif people[index]['surname'] == people[o_index]['surname'] and people[index]['firstname'] == people[o_index]['firstname']:
                if type(people[index]['date_range']) != list:
                    date_range = []
                    date_range.append(people[index]['date_range'])
                    people[index]['date_range'] = date_range
                if not people[o_index]['date_range'] in people[index]['date_range']:
                    people[index]['date_range'].append(people[o_index]['date_range'])
                if not people[o_index]['prefix'] in people[index]['prefix']:
                    if people[index]['prefix'] == '':
                        people[index]['prefix'] += people[o_index]['prefix']
                    else:
                        people[index]['prefix'] += "; " + people[o_index]['prefix']

                elif not people[o_index]['pen_name'] in people[index]['pen_name']:
                    if people[index]['pen_name'] == '':
                        people[index]['pen_name'] += people[o_index]['pen_name']
                    else:
                        people[index]['pen_name'] += "; " + people[o_index]['pen_name']

                elif not people[o_index]['position'] in people[index]['position']:
                    if people[index]['position'] == '':
                        people[index]['position'] += people[o_index]['position']
                    else:
                        people[index]['position'] += "; " + people[o_index]['position']

                elif not people[o_index]['address'] in people[index]['address']:
                    if people[index]['address'] == '':
                        people[index]['address'] += people[o_index]['address']
                    else:
                        people[index]['address'] += "; " + people[o_index]['address']

                elif not people[o_index]['neighborhood'] in people[index]['neighborhood']:
                    if people[index]['neighborhood'] == '':
                        people[index]['neighborhood'] += people[o_index]['neighborhood']
                    else:
                        people[index]['neighborhood'] += "; " + people[o_index]['neighborhood']

                elif not people[o_index]['city'] in people[index]['city']:
                    if people[index]['city'] == '':
                        people[index]['city'] += people[o_index]['city']
                    else:
                        people[index]['city'] += "; " + people[o_index]['city']

                elif not people[o_index]['post_code'] in people[index]['post_code']:
                    if people[index]['post_code'] == '':
                        people[index]['post_code'] += people[o_index]['post_code']
                    else:
                        people[index]['post_code'] += "; " + people[o_index]['post_code']

                elif not people[o_index]['proposer'] in people[index]['proposer']:
                    if people[index]['proposer'] == '':
                        people[index]['proposer'] += people[o_index]['proposer']
                    else:
                        people[index]['proposer'] += "; " + people[o_index]['proposer']

                elif not people[o_index]['periodicals'] in people[index]['periodicals']:
                    if people[index]['periodicals'] == '':
                        people[index]['periodicals'] += people[o_index]['periodicals']
                    else:
                        people[index]['periodicals'] += "; " + people[o_index]['periodicals']

                elif not people[o_index]['sources'] in people[index]['sources']:
                    if people[index]['sources'] == '':
                        people[index]['sources'] += people[o_index]['sources']
                    else:
                        people[index]['sources'] += "; " + people[o_index]['sources']

                elif not people[o_index]['other'] in people[index]['other']:
                    if people[index]['other'] == '':
                        people[index]['other'] += people[o_index]['other']
                    else:
                        people[index]['other'] += "; " + people[o_index]['other']

                elif not people[o_index]['joined'] in people[index]['joined']:
                    if people[index]['joined'] == '':
                        people[index]['joined'] += people[o_index]['joined']
                    else:
                        people[index]['joined'] += "; " + people[o_index]['joined']

                for org in people[o_index]['orgs']:
                    if not org in people[index]['orgs']:
                        people[index]['orgs'].append(org)

                del people[o_index]
        except IndexError:
            break
    return people

def upload():
    for index in range(len(people)):
        URL = "http://localhost:3000/api/v1/person/create"
        data = people[index]
        r = requests.post(url = URL, data = data)

def main():
    global people
    
    # CHANGE ME to index (starting from 0)
    # from array on helper.date_ranges
    index = 1

    raw_json = loadData(helper.date_ranges[index])
    formatRaw(index, raw_json)
        

    createArrays(people)

    for index in range(len(people)):
        mergePerson(index)

    upload()

    formatted = json.dumps(people, indent=4)
    print(formatted)

if __name__=="__main__":
    main()
