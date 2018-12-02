chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('window.html', {
        'id': 'mainWindow',
        'bounds': {
            'width': Math.round(window.screen.availWidth * 0.8),
            'height': Math.round(window.screen.availHeight * 0.8)
        },
        'outerBounds': {
            'width': Math.round(window.screen.availWidth * 0.8),
            'height': Math.round(window.screen.availHeight * 0.8)
        }
    });
});



