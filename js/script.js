const clientId = 'mhksczpxroty6pz3gyr9tzzdd4xmj'; // твой Client ID
const accessToken = '5oxb7sgmi275e83cti11z5nhyu62w7'; // твой Access Token (новый вставь сюда)

function changeTwitchChannel(channel) {
    document.getElementById('channelName').innerText = channel;
    document.getElementById('twitchPlayer').src = `https://player.twitch.tv/?channel=${channel}&parent=twitch-viewer.ru`;
    document.getElementById('twitchPlayer').style.display = 'block';
    document.getElementById('youtubePlayer').style.display = 'none';

    // Очистим старое сообщение
    const offlineMessage = document.getElementById('offlineMessage');
    offlineMessage.style.display = 'none';
    offlineMessage.innerText = '';

    // --- Debug: запрос в Twitch API ---
    console.log(`Запрос в Twitch API для канала: ${channel}`);

    fetch(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
        method: 'GET',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        console.log('HTTP Status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Ответ Twitch API:', data);

        if (data.data && data.data.length > 0) {
            console.log(`✅ Канал ${channel} — ОНЛАЙН`);
            offlineMessage.style.display = 'none';
        } else {
            console.log(`❌ Канал ${channel} — ОФФЛАЙН (по данным API)`);
            offlineMessage.style.display = 'block';
            offlineMessage.innerText = `Канал ${channel} сейчас оффлайн.`;
        }
    })
    .catch(error => {
        console.error('Ошибка при запросе к Twitch API:', error);
        offlineMessage.style.display = 'block';
        offlineMessage.innerText = `Ошибка получения статуса канала.`;
    });
}

function showYoutube(url) {
    document.getElementById('youtubePlayer').src = url;
    document.getElementById('youtubePlayer').style.display = 'block';
    document.getElementById('twitchPlayer').style.display = 'none';
    document.getElementById('channelName').innerText = 'YouTube';
    document.getElementById('offlineMessage').style.display = 'none';
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
