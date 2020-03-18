"use strict";

let current;
let img;
let i;
let voci;
let title;
let value;

$(document).ready(function() {
    i = 0;
    img = $("#picture");
    voci = $("#values_list li");
    title = $("#user_title");
    value = $("#user_value");
    let aus=$("#partial");

    $(voci).on("mouseover", function() {
        reset(this);
    })

    $("#slider").on("input", function() {
        $("#range").text($("#slider").prop("value"));
    });
    $(".avanti").on("click", function() {
        if (i < current["results"].length - 1)
        {
            i++;
            visualizza(i);
        }
        aus.text((i + 1).toString() + "/" + (current["results"].length).toString());
    });
    $(".indietro").on("click", function() {
        if (i > 0)
        {
            i--;
            visualizza(i);
        }
        aus.text((i + 1).toString() + "/" + (current["results"].length).toString());
    });
    $("#loader").css({ "display": "none" });
});

function genera(par) {
    $("#wait img").fadeOut(0);
    $("#wait").css({ "color": "#0000" }).slideDown(200);
    $("#loader").css({ "display": "block" });
    setTimeout(function() {
        $("#loader").css({ "display": "none" });
        $("#wait").slideUp(500);
    }, random(2500, 500));
    $.ajax({
        url: 'https://randomuser.me/api/?',
        dataType: 'json',
        data: par,
        success: function(data) {
            current = data;
            i = 0;
            visualizza(i);
            $("#partial").text((i + 1).toString() + "/" + (data["results"].length).toString());
        }
    });
}

function downloadAll() {
    let links = ["'index.html","index.css","index.js"];
    let link = document.createElement('a');
    link.setAttribute('download', "index");
    for (let j = 0; j < links.length; j++)
    {
        link.setAttribute('href', links[j]);
        link.click();
    }
}

function visualizza(iAus) {
    let data = current["results"][iAus];
    for (let j = 0; j < voci.length; j++)
    {
        switch (voci[j].getAttribute("data-label"))
        {
            case 'name':
                voci[j].setAttribute("data-value", data["name"]["first"] + " " + data["name"]["last"]);
                break;
            case 'location':
                voci[j].setAttribute("data-value", data["location"]["street"]["number"] + " " + data["location"]["street"]["name"]);
                break;
            case 'birthday':
                voci[j].setAttribute("data-value", data["dob"]["date"].split('T')[0]);
                break;
            case 'pass':
                voci[j].setAttribute("data-value", data["login"]["password"]);
                break;
            default:
                voci[j].setAttribute("data-value", data[voci[j].getAttribute("data-label")]);
                break;
        }
    }
    $(img).prop("src", data["picture"]["large"]);
    reset(voci[0]);
}

function reset(sender) {
    for (let j = 0; j < voci.length; j++)
    {
        voci[j].className = voci[j].className.replace(/\bactive\b/, "");
    }
    sender.className += " active";
    $(value).text(sender.getAttribute("data-value"));
    $(title).text(sender.getAttribute("data-title"));
}

function val() {
    let _checkboxChecked = $("input[type=checkbox]:checked");
    let aus = 'results=' + $('#slider').prop('value') + ($('input[type=radio]:checked').prop('value') != "" ? '&' + $('input[type=radio]:checked').prop('value') : "");
    if (_checkboxChecked.length > 0)
    {
        aus += "&nat=";
    }
    for (let j = 0; j < _checkboxChecked.length; j++)
    {
        aus += (j > 0 ? "," : "") + $(_checkboxChecked[j]).prop("value");
    }
    return aus;
}


function random(max, min) {
    return Math.floor((max - min + 1) * Math.random()) + min;
}