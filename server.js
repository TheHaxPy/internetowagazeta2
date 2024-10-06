const rssUrl = 'https://cors-anywhere.herokuapp.com/https://news.google.com/rss?hl=pl&gl=PL&ceid=PL:pl';

// Użycie Fetch API do pobrania danych
fetch(rssUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Sieć odpowiedziała błędem.');
        }
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'text/xml');
        const items = xml.querySelectorAll('item');
        let newsHtml = '';

        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            newsHtml += `<h2><a href="${link}" target="_blank">${title}</a></h2>`;
        });

        document.getElementById('news').innerHTML = newsHtml || '<p>Brak wiadomości do wyświetlenia.</p>';
    })
    .catch(error => {
        console.error('Błąd:', error);
        document.getElementById('news').innerHTML = '<p>Nie można załadować wiadomości.</p>';
    });
