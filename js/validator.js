
function submitForm() {

    //Validation triggers
    let X_valid = false;
    let Y_valid = false;
    let R_valid = false;

    //Values of fields
    let X_val, Y_val, R_val;

    let form = document.values;

    let X_select = form.X;
    let Y_text = form.Y;
    let R_text = form.R;

    //X validation
    X_val = X_select.value;
    if (X_val !== "err") X_valid = true;


    //Y validation
    Y_val = Y_text.value;
    if ((Y_val.match(/^-?[0-3](\.\d+)?$/) || Y_val.match(/^-5$/) || Y_val.match(/^-4$/)) && !Y_val.match(/^-0(\.0+)?$/)) Y_valid = true;

    //R validation
    R_val = R_text.value;
    if ((R_val.match(/^[2-4](\.\d+)?$/) || R_val.match(/^5$/)) && !R_val.match(/^-0$/) && !R_val.match(/^-?0.0+$/)) R_valid = true;

    if (!(X_valid && Y_valid && R_valid)) {
        if (!X_valid) {
            document.getElementById("x").style = "color: #E51C22;"
            document.getElementById("x_err").innerHTML = "*Please choose X value";
        } else {
            document.getElementById("x").style = "color: black";
            document.getElementById("x_err").innerHTML = "<br>";
        }

        if (!Y_valid) {
            document.getElementById("y_err").innerHTML = "*Please input correct Y value";
            document.getElementById("style").innerHTML = "#values input[type=\"text\"]::placeholder{\n" +
                "    color: #E51C22;\n" +
                "}"
        } else {
            document.getElementById("y_err").innerHTML = "<br>";
            document.getElementById("style").innerHTML = "#values input[type=\"text\"]::placeholder{\n" +
                "    color: grey;\n" +
                "}"
        }

        if (!R_valid) {
            document.getElementById("r_err").innerHTML = "*Please input correct R value";
            document.getElementById("style").innerHTML = "#values input[type=\"text\"]::placeholder{\n" +
                "    color: #E51C22;\n" +
                "}"
        } else {
            document.getElementById("r_err").innerHTML = "<br>";
            document.getElementById("style").innerHTML = "#values input[type=\"text\"]::placeholder{\n" +
                "    color: grey;\n" +
                "}"
        }
    } else {
        resetForm();
        getPHP(X_val, Y_val, R_val);
    }

    return false;

}

function resetForm() {

        document.getElementById("x").style = "color: grey";

        document.getElementById("x_err").innerHTML = "<br>";
        document.getElementById("y_err").innerHTML = "<br>";
        document.getElementById("r_err").innerHTML = "<br>";

        document.getElementById("style").innerHTML = "#values input[type=\"text\"]::placeholder{\n" +
            "    color: grey;\n" +
            "}"
}

function getPHP(x, y, r) {
    let request = new XMLHttpRequest();
    const url = "php/main.php?x=" + x + "&y=" + y + "&r=" + r + "&date=" + new Date().getTimezoneOffset();
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText);
            document.getElementById("rows").innerHTML += row(data.x, data.y, data.r, data.current, data.execution, data.result);
        }
    });
    request.send();
}

function row(x, y, r, cur_time, ex_time, res) {
    let link = "img/" + res + ".png";
    let img = "<img src=\"" + link + "\" alt=\"" + res + "\" style=\"width: 50%\" align='center'>"
    return  "<tr>" + col(x) + col(y) + col(r) + col(cur_time) + col(ex_time) + "<td class=\"" + res + "\">\n" + img + "</td>\n" + "</tr>"
}

function col(val) {
    return "<td>\n" + val + "</td>\n"
}






