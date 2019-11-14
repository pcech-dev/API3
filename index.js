'use strict';

function getRepos(username) {
    fetch('https://api.github.com/users/' + username + '/repos')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            console.log(response);
            throw new Error(response.statusText);
        })
        .then(responseJson => showResults(responseJson))
        .catch(err => alert('Something went wrong: "' + err.message + '"'));
}

function showResults(array) {
    $('.js-results').empty();
    for (let i = 0; i < array.length; i++) {
        $('.js-results').append(`<li>${array[i].name}: <a href="${array[i].html_url}">link</a></li>`)
    }
    if (array.length === 0) {
        $('.js-results').append('There are no repos for this user.')
    }
        $('.js-section').removeClass('hidden');
}

function watchForm() {
    $('form').submit(function (event) {
        event.preventDefault();
        getRepos($('#input1').val());
        $('#input1').val('');
    })
}

$(watchForm);