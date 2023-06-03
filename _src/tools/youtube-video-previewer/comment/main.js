// Super epic JS file v2

function generateVideo() {

    if (document.getElementById("new-name").value !== '') {
        document.getElementById("name").innerText = document.getElementById("new-name").value;
    }

    if (document.getElementById("new-age").value !== '') {
        document.getElementById("age").innerText = document.getElementById("new-age").value;
    }

    if (document.getElementById("new-content").value !== '') {
        document.getElementById("content").innerText = document.getElementById("new-content").value;
    }

    if (document.getElementById("new-likes").value !== '') {
        document.getElementById("likes").innerText = document.getElementById("new-likes").value;
    }

    if (document.getElementById("new-reply").value !== '') {
        document.getElementById("reply").innerText = document.getElementById("new-reply").value;
    }

    if (document.getElementById("new-avatar").value !== '') {
        document.getElementById("avatar").src = document.getElementById("new-avatar").value;
    }

    if (document.getElementById("new-dislikes").value !== '') {
        document.documentElement.style
        .setProperty('--dislikes', 'display-block');
        document.getElementById("dislikes").innerText = document.getElementById("new-dislikes").value;
    } else {
        document.documentElement.style
        .setProperty('--dislikes', 'none');
    }

    if (document.getElementById("new-verified").checked == false) {
        document.documentElement.style
        .setProperty('--verified', 'none');
    } else {
        document.documentElement.style
        .setProperty('--verified', 'inline-block');
    }

    if (document.getElementById("new-replies").checked == false) {
        document.documentElement.style
        .setProperty('--replies', 'none');
    } else {
        document.documentElement.style
        .setProperty('--replies', 'unset');
    }

}