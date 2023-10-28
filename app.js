document.addEventListener("DOMContentLoaded", function () {
    // Fügt einen Event-Listener zum Button mit der ID "upscale-button" hinzu
    document.getElementById("upscale-button").addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentURL = tabs[0].url;
            if (!currentURL.includes("static-cdn.jtvnw.net")) {
                return; // Beende die Funktion, wenn die Bedingung nicht erfüllt ist
            }

            var newUrl = currentURL.replace(/profile_image-70x70.png/g, "profile_image-300x300.png");

            // Der HTML-Code, der in der neuen Seite angezeigt werden soll
            var newHTML = '<html><head><style> body {background-color:#372b25;} </style><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Twitch profile pic upscaler</title></head><body>Hier ist der Link: <a href="' + currentURL + '">' + currentURL + '</a><br><img src="' + newUrl + '" width="300" height="300"></body></html>';

            // Erstellen einer Blob-URL aus dem HTML-Code
            var blob = new Blob([newHTML], { type: 'text/html' });
            var url = URL.createObjectURL(blob);

            // Erstellen eines neuen Tabs mit der Blob-URL
            chrome.tabs.create({ url: url });
        });
    });
});