document.addEventListener('DOMContentLoaded', function() {
    const bouquet = document.getElementById('bouquet');

    const canterburyBells = `
          /\
         /  \
        /    \
       /      \
      /        \
     (          )
      \        /
       \      /
        \    /
         \  /
          \/
          ||
          ||
          ||
          ||
    `;

    bouquet.textContent = canterburyBells;

    // --- Music playback handling ---
    // Sample public MP3 you can replace later. If you'll add a local file later,
    // change this string to e.g. 'music/happy-birthday.mp3'.
    const MUSIC_SRC = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    // Create audio element (we do it in JS so we can attempt .play() programmatically)
    const audio = new Audio(MUSIC_SRC);
    audio.preload = 'auto';
    audio.loop = true; // optional: loop the music

    // Helper to show a simple overlay with a play button if autoplay is blocked
    function showPlayOverlay() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.left = 0;
        overlay.style.top = 0;
        overlay.style.right = 0;
        overlay.style.bottom = 0;
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.zIndex = 9999;

        const btn = document.createElement('button');
        btn.textContent = 'Click to play music';
        btn.style.padding = '16px 24px';
        btn.style.fontSize = '18px';
        btn.style.borderRadius = '8px';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.style.background = '#ff80ab';
        btn.style.color = '#fff';

        btn.addEventListener('click', function () {
            audio.play().catch(() => {
                // if still blocked, do nothing; the browser may require user gesture
            });
            document.body.removeChild(overlay);
        });

        overlay.appendChild(btn);
        document.body.appendChild(overlay);
    }

    // Try to play if the user came from the button click on index.html
    try {
        const shouldPlay = sessionStorage.getItem('playMusicOnLoad') === '1';
        if (shouldPlay) {
            // remove the flag immediately
            sessionStorage.removeItem('playMusicOnLoad');

            // Attempt to play. If the browser blocks autoplay, catch() will be called.
            audio.play().catch(() => {
                // If autoplay was blocked, show a visible fallback so the user can start the music.
                showPlayOverlay();
            });
        }
    } catch (e) {
        // sessionStorage access could fail in some environments - ignore and do nothing
    }
});
