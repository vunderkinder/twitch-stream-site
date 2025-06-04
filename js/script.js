function changeTwitchChannel(channel) {
    document.getElementById('channelName').innerText = channel;
    document.getElementById('twitchPlayer').src = `https://player.twitch.tv/?channel=${channel}&parent=twitch-viewer.ru`;
    document.getElementById('twitchPlayer').style.display = 'block';
    document.getElementById('youtubePlayer').style.display = 'none';
    document.getElementById('offlineMessage').innerText = `Канал ${channel} сейчас оффлайн.`;
    document.getElementById('offlineMessage').style.display = 'block';

    // Убираем категорию "Фильмы"
    document.getElementById('moviesCategory').style.display = 'none';
}

function showYoutube(url) {
    document.getElementById('youtubePlayer').src = url;
    document.getElementById('youtubePlayer').style.display = 'block';
    document.getElementById('twitchPlayer').style.display = 'none';
    document.getElementById('offlineMessage').style.display = 'none';
    document.getElementById('channelName').innerText = 'YouTube';
}

function showCategory(category) {
    if (category === 'movies') {
        document.getElementById('moviesCategory').style.display = 'block';
        document.getElementById('twitchPlayer').style.display = 'none';
        document.getElementById('youtubePlayer').style.display = 'none';
        document.getElementById('offlineMessage').style.display = 'none';
        document.getElementById('channelName').innerText = 'Фильмы';
    } else {
        document.getElementById('moviesCategory').style.display = 'none';
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.style.backgroundColor === 'white') {
        body.style.backgroundColor = '#111';
        body.style.color = '#eee';
    } else {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
    }
}
