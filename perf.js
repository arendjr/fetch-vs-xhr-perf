'use strict';

function runBenchmarks() {

    const suite = new Benchmark.Suite;
    const resultsEl = document.getElementById('results');
    resultsEl.textContent = '';

    suite
        .add('useFetch', useFetch, { defer: true })
        .add('useXhr', useXhr, { defer: true })
        .add('useXhrWithResponseTypeJson', useXhrWithResponseTypeJson, { defer: true })
        .on('cycle', event => resultsEl.textContent += event.target + '\n')
        .on('complete', () => resultsEl.textContent += '\n' + JSON.stringify(suite, null, 4))
        .run({ async: true });
}

function useFetch(deferred) {

    fetch('/test-data.json')
        .then(response => response.json())
        .then(json => {
            console.log('ID of first element: ' + json[0]._id);
            deferred.resolve();
        });
}

function useXhr(deferred) {

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        const json = JSON.parse(xhr.responseText);
        console.log('ID of first element: ' + json[0]._id);
        deferred.resolve();
    });
    xhr.open('GET', '/test-data.json');
    xhr.send();
}

function useXhrWithResponseTypeJson(deferred) {

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        const json = xhr.response;
        console.log('ID of first element: ' + json[0]._id);
        deferred.resolve();
    });
    xhr.open('GET', '/test-data.json');
    xhr.responseType = 'json';
    xhr.send();
}
