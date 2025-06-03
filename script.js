
function changeTwitchChannel(channel) {
    document.getElementById('channelName').innerText = channel;
    document.getElementById('twitchPlayer').src = `https://twitch-proxy.streamdev.xyz/player.html?channel=${channel}`;
    document.getElementById('twitchPlayer').style.display = 'block';
    document.getElementById('youtubePlayer').style.display = 'none';
}

function showYoutube(url) {
    document.getElementById('youtubePlayer').src = url;
    document.getElementById('youtubePlayer').style.display = 'block';
    document.getElementById('twitchPlayer').style.display = 'none';
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
