function update_table(table_id, url, search=null) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE ) {
            if (xhr.status == 200) {
                // Replace the existing table with the table fetched from the request.
                var table_element = document.getElementById(table_id);
                table_element.innerHTML = xhr.responseText;
            }
        }
    };
    if (search) xhr.open('GET', url + "?search=" + search, true);
    else xhr.open('GET', url, true);
    xhr.send();
}