$(document).ready(function () {
    var url = "https://swj-capstone-staging.herokuapp.com/api/persons/list";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("x-access-token", localStorage.getItem('accessToken'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const data = JSON.parse(xhr.responseText);
            console.log(data[0])
            var table = $("#main-table").DataTable(
                {
                    data: data,
                    columns: [
                        {
                            "className": 'dt-control',
                            "orderable": false,
                            "data": null,
                            "defaultContent": ''
                        },
                        { data: 'date_range' },
                        { data: 'surname' },
                        { data: 'firstname' },
                        { data: 'proposer' },
                        { data: 'city' },
                        { data: 'joined' }
                    ],
                    "responsive": true,
                    "lengthChange": false,
                    "autoWidth": false,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#main-table_wrapper .col-md-6:eq(0)');

            $('#main-table tbody').on('click', 'td.dt-control', function () {
                console.log("Made it to here at line 41")
                var tr = $(this).closest('tr');
                var row = $('#main-table').DataTable().row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }
            });

        }
    };
    xhr.send()

})

/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    let memberInfo = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<button class="btn" style="border:1px; border-style:solid;">Manage Member</button>' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' + d.prefix + " " + d.firstname + " " + d.surname + '</td>' +
        '</tr>';

    if (d.pen_name != '') {
        memberInfo +=
            '<tr>' +
            '<td>Pen Name:</td>' +
            '<td>' + d.pen_name + '</td>' +
            '</tr>';
    }

    if (d.dob != '') {
        memberInfo +=
            '<tr>' +
            '<td>Born:</td>' +
            '<td>' + d.dob + '</td>' +
            '</tr>';
    }

    if (d.dod != '') {
        memberInfo +=
            '<tr>' +
            '<td>Died:</td>' +
            '<td>' + d.dod + '</td>' +
            '</tr>';
    }

    if (d.position != '') {
        memberInfo +=
            '<tr>' +
            '<td>Position Held:</td>' +
            '<td>' + d.position + '</td>' +
            '</tr>';
    }

    if (d.address != '') {
        memberInfo +=
            '<tr>' +
            '<td>Address:</td>' +
            '<td>' + d.address + '<br>' + d.neighborhood + '<br>' +
            d.city + '<br>' + d.post_code + '</td>' +
            '</tr>';
    }

    //Already shows before dropdown, but will leave here if we want it to show twice
    // if (d.proposer != '') {
    //     memberInfo +=
    //         '<tr>' +
    //         '<td>Proposer:</td>' +
    //         '<td>' + d.proposer + '</td>' +
    //         '</tr>';
    // }

    if ((d.org1 != '' || d.org2 != '' || d.org3 != '' || d.org4 != '' || d.org5 != '')
        && (d.org1 != undefined || d.org2 != undefined || d.org3 != undefined ||
            d.org4 != undefined || d.org5 != undefined)) {
        memberInfo +=
            '<tr>' +
            '<td>Other Organizations:</td>'
            ;
        if (d.org1 != '' && d.org1 != undefined) {
            memberInfo += '<td>' + d.org1 + '</td>';
        }
        if (d.org2 != '' && d.org2 != undefined) {
            memberInfo += '<td>' + d.org2 + '</td>';
        }
        if (d.org3 != '' && d.org3 != undefined) {
            memberInfo += '<td>' + d.org3 + '</td>';
        }
        if (d.org4 != '' && d.org4 != undefined) {
            memberInfo += '<td>' + d.org4 + '</td>';
        }
        if (d.org5 != '' && d.org5 != undefined) {
            memberInfo += '<td>' + d.org5 + '</td>';
        }
        memberInfo += '</tr>';
    }

    if (d.periodicals != '') {
        memberInfo +=
            '<tr>' +
            '<td>Periodicals:</td>' +
            '<td>' + d.periodicals + '</td>' +
            '</tr>';
    }

    if (d.sources != '') {
        memberInfo +=
            '<tr>' +
            '<td>Source of Info:</td>' +
            '<td>' + d.sources + '</td>' +
            '</tr>';
    }

    if (d.other != '') {
        memberInfo +=
            '<tr>' +
            '<td>Additional Info:</td>' +
            '<td>' + d.other + '</td>' +
            '</tr>';
    }

    memberInfo += '</table>';
    return memberInfo;
}

