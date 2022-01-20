// On page load, check for auth
document.addEventListener("DOMContentLoaded", function () {
    // Check for access token
    const access_token = localStorage.getItem('swj-access');

    if (access_token == null) {
        const refresh_exists = doesHttpOnlyCookieExist('swj-refresh');

        if (refresh_exists) {
            // Attempt to refresh access... ill figure this out later
        } else {
            // Send to login window
            // window.location.replace("https://swj-capstone.herokuapp.com/admin/pages/login.html");
            window.location.replace("https://swj-capstone-staging.herokuapp.com/admin/pages/login.html");
        }
    }
});

// Once everything is loaded, get the data
window.addEventListener("load", function () {
    refreshTable()
});


// Magic script to get the nice datatable
function refreshTable() {
    var url = "https://swj-capstone-staging.herokuapp.com/api/persons/list";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("x-access-token", localStorage.getItem('swj-access'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const data = JSON.parse(xhr.responseText);
            console.log(data[0])

            $("#main-table").DataTable(
                {
                    data: data,
                    columns: [
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
                    var row = table.row(tr);
            
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
}

//
/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' + d.name + '</td>' +
        '</tr>' +
        '</table>';
}

// $(document).ready(function () {
//     var table = $('#main-table').DataTable({
//         data: data,
//         columns: [
//             { data: 'date_range' },
//             { data: 'surname' },
//             { data: 'firstname' },
//             { data: 'proposer' },
//             { data: 'city' },
//             { data: 'joined' }
//         ],
//         "responsive": true,
//         "lengthChange": false,
//         "autoWidth": false,
//         "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
//     });

//     // Add event listener for opening and closing details
    
// });