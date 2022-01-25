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
            console.log("Made it to here at line 22")
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
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' + d.prefix + " " + d.firstname + " " + d.surname + '</td>' +
        '</tr>';

        if (d.pen_name != ''){
            memberInfo += '<tr>' +
                '<td>Pen Name:</td>' +
                '<td>' + d.pen_name + '</td>' +
                '</tr>';
        }

        memberInfo += '</table>';

        return memberInfo;
}

