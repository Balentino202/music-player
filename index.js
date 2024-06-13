const tracks = [
    {
        title: "Free Beat",
        artist: "Kelvin Drayz",
        src: "img/beat 1.mp3",
        cover: "img/pic 1.webp",
        duration: "3:00"
    },
    {
        title: "Track 2",
        artist: "Artist 2",
        src: "img/beat 2.mp3",
        cover: "img/pic 2.webp",
        duration: "2:45"
    },
    {
        title: "Track 3",
        artist: "Artist 3",
        src: "img/beat 3.mp3",
        cover: "img/pic 3.webp",
        duration: "4:05"
    },
    {
        title: "Track 3",
        artist: "Artist 3",
        src: "img/beat 3.mp3",
        cover: "img/pic 3.webp",
        duration: "4:05"
    }
];

let currentTrackIndex = 0;

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitleEl = document.getElementById('track-title');
const trackArtistEl = document.getElementById('track-artist');
const coverImageEl = document.getElementById('cover-image');
const trackListEl = document.getElementById('track-list');
const musicPlayerEl = document.querySelector('.music-player');
let isPlaying = false;

function loadTrack(index) {
    musicPlayerEl.classList.add('fade-out');
    setTimeout(() => {
        const track = tracks[index];
        audioPlayer.src = track.src;
        trackTitleEl.textContent = track.title;
        trackArtistEl.textContent = track.artist;
        coverImageEl.src = track.cover;
        durationEl.textContent = track.duration;
        isPlaying = false;
        playPauseBtn.innerHTML = '&#9654;'; // Play icon
        updateTrackList();
        musicPlayerEl.classList.remove('fade-out');
    }, 500); // Match the fade-out animation duration
}

function playPauseTrack() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '&#9654;'; // Play icon
        musicPlayerEl.classList.remove('playing');
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
        musicPlayerEl.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playPauseTrack();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playPauseTrack();
}

function selectTrack(index) {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
    playPauseTrack();
}

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audioPlayer.currentTime);
    const duration = formatTime(audioPlayer.duration);
    currentTimeEl.textContent = currentTime;
    durationEl.textContent = duration;
    const progressWidth = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${progressWidth}%`;
});

audioPlayer.addEventListener('ended', () => {
    nextTrack();
});

audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateTrackList() {
    trackListEl.innerHTML = '';
    tracks.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.className = `list-group-item ${index === currentTrackIndex ? 'active' : ''}`;
        listItem.dataset.index = index;
        listItem.textContent = `${track.title} - ${track.artist} `;
        const durationSpan = document.createElement('span');
        durationSpan.className = 'float-right';
        durationSpan.textContent = track.duration;
        listItem.appendChild(durationSpan);
        listItem.addEventListener('click', () => selectTrack(index));
        trackListEl.appendChild(listItem);

        // Trigger slide-in animation
        setTimeout(() => {
            listItem.style.opacity = 1;
            listItem.style.transform = 'translateX(0)';
        }, 100 * index); // Stagger the animation for each item
    });
}

// Event Listeners
playPauseBtn.addEventListener('click', playPauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Initial load
loadTrack(currentTrackIndex);
