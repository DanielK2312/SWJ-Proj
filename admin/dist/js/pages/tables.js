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
        '<button class="btn" style="border:1px; border-style:solid, padx:5px;">Manage Member</button>' +
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

    //Attempt at showing the organizations
    console.log("Here are the orgs for: " + d.firstname)
    console.log(typeof (d.orgs))
    console.log(d.orgs[0])
    if (d.orgs[0] != '') {
        memberInfo +=
            '<tr>' +
            '<td>Other Organizations:</td>';
        for (var i = 0; i < orgs.length; i++) {
            memberInfo +=
                '<td>' + d.orgs[i] + '</td>';
        }
        memberInfo +=
            '</tr>';
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

