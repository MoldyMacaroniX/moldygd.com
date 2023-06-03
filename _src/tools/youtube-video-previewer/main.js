// Super epic JS file









function generateVideo() {
    thumb();
    username();
    title();

    if (document.getElementById("new-views").value !== '') {
        document.getElementById("views").innerText = document.getElementById("new-views").value;
    }
    if (document.getElementById("new-time").value !== '') {
        document.getElementById("time").innerText = document.getElementById("new-time").value;
    }
    if (document.getElementById("new-length").value !== '') {
        document.getElementById("length").innerText = document.getElementById("new-length").value;
    }
    if (document.getElementById("new-avatar").value !== '') {
        document.getElementById("avatar").src = document.getElementById("new-avatar").value;
    }

    if (document.getElementById("new-verified").checked == true) {
        document.documentElement.style
        .setProperty('--verified', 'inline-block');
    } else {
        document.documentElement.style
        .setProperty('--verified', 'none');
    }

    if (document.getElementById("new-truncate").checked == true) {
        document.documentElement.style
        .setProperty('--truncate', '999');
    } else {
        document.documentElement.style
        .setProperty('--truncate', '2');
    }

    if (document.getElementById("new-premiere").checked == true) {
        document.getElementById("length").innerText = "PREMIERE";
        document.documentElement.style
        .setProperty('--premiere', 'unset');
    } else {
        document.documentElement.style
        .setProperty('--premiere', 'none');
    }

    if (document.getElementById("new-live").checked == true) {
        document.documentElement.style
        .setProperty('--live', 'unset');
        document.documentElement.style
        .setProperty('--live-time', 'none');
    } else {
        document.documentElement.style
        .setProperty('--live', 'none');
        document.documentElement.style
        .setProperty('--live-time', 'unset');
    }

}

function title() {
    if (document.getElementById("new-title").value !== '') {
        document.getElementById("title").innerText = document.getElementById("new-title").value;
        document.getElementById("title").title = document.getElementById("new-title").value;
    }
}

function username() {
    if (document.getElementById("new-username").value !== '') {
        document.getElementById("username1").innerText = document.getElementById("new-username").value;
        document.getElementById("username2").innerText = document.getElementById("new-username").value;
    }
}

function thumb() {
    if (document.getElementById("new-thumb").value !== '') {
        document.documentElement.style
        .setProperty('--thumbnail', 'url(' + document.getElementById("new-thumb").value + ')');
    }
}