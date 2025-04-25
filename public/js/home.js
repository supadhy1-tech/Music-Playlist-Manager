document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-playlist-form');
    const errorDisplay = document.getElementById('playlist-error');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('playlist-name').value.trim();
      if (!name) return;
  
      try {
        const response = await fetch('/playlists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });
  
        if (response.ok) {
          location.reload(); // reload to show new playlist
          
        } else {
          const data = await response.json();
          errorDisplay.textContent = data.message || 'Error creating playlist.';
        }
      } catch (err) {
        console.error(err);
        errorDisplay.textContent = 'Server error.';
      }
    });
  });
  