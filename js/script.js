// === Конфигурация Twitch API ===
const clientId = 'mhksczpxroty6pz3gyr9tzzdd4xmj';
const accessToken = 'oyhh130skgyzxqxvxwv1d2pr1cricz';

// === Смена Twitch канала ===
function changeTwitchChannel(channel) {
    document.getElementById('channelName').innerText = channel;

    const twitchPlayer = document.getElementById('twitchPlayer');
    twitchPlayer.src = `https://player.twitch.tv/?channel=${channel}&parent=twitch-viewer.ru`;
    twitchPlayer.style.display = 'block';

    document.getElementById('youtubePlayer').style.display = 'none';

    // Проверяем онлайн/офлайн
    checkStreamStatus(channel);
}

// === Показываем YouTube ===
function showYoutube(url) {
    document.getElementById('youtubePlayer').src = url;
    document.getElementById('youtubePlayer').style.display = 'block';

    document.getElementById('twitchPlayer').style.display = 'none';
    document.getElementById('offlineMessage').style.display = 'none';

    document.getElementById('channelName').innerText = 'YouTube';
}

// === Категории ===
function showCategory(category) {
    document.getElementById('moviesCategory').style.display = (category === 'movies') ? 'block' : 'none';
}

// === Переключатель темы ===
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

// === Проверка онлайн/офлайн ===
function checkStreamStatus(channel) {
    fetch(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
        method: 'GET',
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const offlineMessage = document.getElementById('offlineMessage');
        if (data.data && data.data.length > 0) {
            // Стрим идет
            offlineMessage.style.display = 'none';
        } else {
            // Стрим оффлайн
            offlineMessage.innerText = `Канал ${channel} сейчас оффлайн.`;
            offlineMessage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Ошибка проверки стрима:', error);
    });
}
