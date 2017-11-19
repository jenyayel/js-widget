import { ping } from './services'
import { show } from './views/message'

const supportedAPI = ['init', 'message']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
    The main entry of the application
    */
function app(window) {
    console.log('JS-Widget starting');

    // set default configurations
    let configurations = {
        someDefaultConfiguration: false
    };

    // all methods that were called till now and stored in queue
    // needs to be called now 
    let globalObject = window[window['JS-Widget']];
    let queue = globalObject.q;
    if (queue) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i][0].toLowerCase() == 'init') {
                configurations = extendObject(configurations, queue[i][1]);
                console.log('JS-Widget started', configurations);
            }
            else
                apiHandler(queue[i][0], queue[i][1]);
        }
    }

    // override temporary (until the app loaded) handler
    // for widget's API calls
    globalObject = apiHandler;
    globalObject.configurations = configurations;
}

/**
    Method that handles all API calls
    */
function apiHandler(api, params) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();

    if (supportedAPI.indexOf(api) === -1) throw Error(`Method ${api} is not supported`);

    console.log(`Handling API call ${api}`, params);

    switch (api) {
        // TODO: add API implementation
        case 'message':
            show(params);
            break;
        default:
            console.warn(`No handler defined for ${api}`);
    }
}

function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

app(window);