document.addEventListener('DOMContentLoaded', () => {
    const playlist = [
        
        { title: '虚拟-陈粒', src: '虚拟-陈粒.mp3' },
        { title: '冬眠·2023 - 阿YueYue,刘兆宇', src: '冬眠·2023 - 阿YueYue,刘兆宇.mp3' },
        { title: '我知道-By2', src: '我知道-By2.mp3' },
        { title: '多远都要在一起 - G.E.M.邓紫棋', src: '多远都要在一起 - G.E.M.邓紫棋.mp3' },
        { title: '我想念 - 汪苏泷', src: '我想念 - 汪苏泷.mp3' },
        { title: '最后一页 - 张昊晴', src: '最后一页 - 张昊晴.mp3' },

        // 添加更多歌曲
    ];

    let audio = new Audio();
        // 设置初始音量，例如0.5表示50%的音量
        audio.volume = 0.3;


    let currentIndex = 0;
    let isPlaying = false;

    const prevBtn = document.getElementById('prevBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const nextBtn = document.getElementById('nextBtn');
    const songTitle = document.getElementById('songTitle');
    const progressBar = document.getElementById('progressBar');
    const playlistElement = document.getElementById('playlist');

    function updateUI() {
        songTitle.textContent = playlist[currentIndex].title;
        progressBar.value = audio.currentTime / audio.duration;
    }

    function playSong(index) {
        currentIndex = index;
        audio.src = playlist[currentIndex].src;
        audio.play();
        isPlaying = true;
        updateUI();
    }

    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
    }

    audio.addEventListener('timeupdate', updateUI);
    audio.addEventListener('ended', () => playSong((currentIndex + 1) % playlist.length));

    prevBtn.addEventListener('click', () => playSong((currentIndex - 1 + playlist.length) % playlist.length));
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', () => playSong((currentIndex + 1) % playlist.length));

    progressBar.addEventListener('click', (e) => {
        const percent = e.offsetX / progressBar.offsetWidth;
        audio.currentTime = percent * audio.duration;
    });

    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => playSong(index));
        playlistElement.appendChild(li);
    });
    const videoPlayer = document.getElementById('videoPlayer');
    const anotherVideoPlayer = document.getElementById('anotherVideoPlayer'); // 添加对第二个视频元素的引用
    
    function pauseMusic() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        }
    }
    
    function resumeMusic() {
        // 检查视频是否正在播放或已结束，以及音乐是否未播放
        if (!isPlaying && videoPlayer.paused && anotherVideoPlayer.paused) {
            audio.play();
            isPlaying = true;
          }
        if (!isPlaying) {
            audio.play();
            isPlaying = true;
        }
    }
    
    // 为第一个视频元素添加事件监听器
    videoPlayer.addEventListener('play', pauseMusic);
    videoPlayer.addEventListener('pause', resumeMusic);
    videoPlayer.addEventListener('ended', resumeMusic);
    
    // 为第二个视频元素添加相同的事件监听器
    anotherVideoPlayer.addEventListener('play', pauseMusic);
    anotherVideoPlayer.addEventListener('pause', resumeMusic);
    anotherVideoPlayer.addEventListener('ended', resumeMusic);
    
    // 初始化播放第一首歌
    playSong(currentIndex);
    if (!videoPlayer.paused) {
        pauseMusic(); // 如果视频已经在播放，则暂停音乐
    }
});