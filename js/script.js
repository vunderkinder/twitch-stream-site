const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko'; // это "публичный" client_id для embed (можно не регать OAuth)
const API_URL = 'https://api.twitch.tv/helix/streams?user_login=';

async function changeTwitchChannel(channel) {
    document.getElementById('channelName').innerText = channel;

    // Проверяем онлайн статус
    const isLive = await checkIfLive(channel);

    if (isLive) {
        // Если в эфире — вставляем плеер
        document.getElementById('twitchPlayer').src = `https://player.twitch.tv/?channel=${channel}&parent=twitch-viewer.ru`;
        document.getElementById('twitchPlayer').style.display = 'block';
        document.getElementById('youtubePlayer').style.display = 'none';
        document.getElementById('offlineMessage').style.display = 'none';
    } else {
        // Если оффлайн — убираем плеер, показываем сообщение
        document.getElementById('twitchPlayer').style.display = 'none';
        document.getElementById('youtubePlayer').style.display = 'none';
        document.getElementById('offlineMessage').style.display = 'block';
        document.getElementById('offlineMessage').innerText = `Канал ${channel} сейчас оффлайн.`;
    }
}

function showYoutube(url) {
    document.getElementById('youtubePlayer').src = url;
    document.getElementById('youtubePlayer').style.display = 'block';
    document.getElementById('twitchPlayer').style.display = 'none';
    document.getElementById('offlineMessage').style.display = 'none';
    document.getElementById('channelName').innerText = 'YouTube';
}

function showCategory(category) {
    document.getElementById('moviesCategory').style.display = (category === 'movies') ? 'block' : 'none';
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

async function checkIfLive(channel) {
    try {
        const response = await fetch(`${API_URL}${channel}`, {
            headers: {
                'Client-ID': CLIENT_ID,
                'Accept': 'application/vnd.twitchtv.v5+json'
            }
        });

        const data = await response.json();
        return data.data && data.data.length > 0 && data.data[0].type === 'live';
    } catch (error) {
        console.error('Ошибка при проверке онлайн статуса:', error);
        return false;
    }
}
