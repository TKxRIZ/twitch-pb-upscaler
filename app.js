document.addEventListener("DOMContentLoaded", function () {
    // Fügt einen Event-Listener zum Button mit der ID "upscale-button" hinzu
    document.getElementById("upscale-button").addEventListener("click", function () {
        // Abfrage des aktuellen aktiven Tabs in Chrome
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentURL = tabs[0].url;
            var mytext = "WARNUNG";
            if (!currentURL.includes("static-cdn.jtvnw.net")) {
                document.getElementById('error-box').innerHTML = mytext;
                return; // Beende die Funktion, wenn die Bedingung nicht erfüllt ist
            }

            // Ersetzen des Bild-URLs
            var newUrl = currentURL.replace(/profile_image-70x70.png/g, "profile_image-300x300.png");

            // Der HTML-Code, der in der neuen Seite angezeigt werden soll
            var newHTML = '<html><head><style> body {background-color:#0d0d0d;} </style><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE-edge"><title>Twitch profile pic upscaler</title></head><body><font color="white">Hier ist der Link: <a href="' + currentURL + '">' + currentURL + '</a></font><br><img src="' + newUrl + '" width="300" height="300"></body></html>';

            // Erstellen einer Blob-URL aus dem HTML-Code
            var blob = new Blob([newHTML], { type: 'text/html' });
            var url = URL.createObjectURL(blob);

            // Erstellen eines neuen Tabs mit der Blob-URL
            chrome.tabs.create({ url: url });
        });
    });
});