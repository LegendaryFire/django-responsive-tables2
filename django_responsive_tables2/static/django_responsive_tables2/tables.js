function updateHeaders(tableId, url, tableElement) {
    // Get the column header elements.
    headerElements = tableElement.getElementsByTagName('TH');
    for (let x = 0; x < headerElements.length; x++) {
        const headerLinks = headerElements[x].getElementsByTagName('A');
        for (let y = 0; y < headerLinks.length; y++) {
            headerLinks[y].onclick = function(e) {
                e.preventDefault();
                url = buildUrl(url, decodeParameters(headerLinks[y].getAttribute('href')));
                updateTable(tableId, url);
            };
        }
    }
}

function updateTable(tableId, url, search=null) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE ) {
            if (xhr.status == 200) {
                // Replace the existing table with the table fetched from the request.
                var tableElement = document.getElementById(tableId);
                tableElement.innerHTML = xhr.responseText;
                updateHeaders(tableId, url, tableElement);
            }
        }
    };
    if (search) {
        let searchParam = {"search": search};
        url = buildUrl(url, searchParam);
    }
    xhr.open('GET', url, true);
    xhr.send();
}

function encodeParameters(params) {
    let result = '?';
    for (let i = 0; i < Object.keys(params).length; i++) {
        let currentKey = Object.keys(params).at(i)
        result += currentKey + "=" + params[currentKey];
        if (i < Object.keys(params).length - 1) {
            result += "&";
        }
    }
    return result;
}

function decodeParameters(url) {
    let result = {};
    let parameters = url.split("?");
    // If no question mark was found, there were no parameters.
    if (parameters.length <= 1) return { };
    else parameters = parameters[1];
    parameters = parameters.split("&");
    for (i in parameters) {
        pair = parameters[i].split("=");
        if (pair.length == 2) {
            if (pair[1]) {
                result[pair[0]] = pair[1];
            }
        }
    }
    return result;
}

function clearParameters(url) {
    split = url.split("?");
    if (split.length > 1) return split[0];
    else return url;
}

function buildUrl(url, params, keep_params=true) {
    let new_params = { };
    if (keep_params==true) new_params = decodeParameters(url);

    for (const [key, value] of Object.entries(params)) {
        new_params[key] = value;
    }

    return clearParameters(url) + encodeParameters(new_params);
}