document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-playlist-form');
  const messageDiv = document.getElementById('playlist-msg');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('playlist-name').value.trim();

    if (!name) {
      messageDiv.textContent = '⚠️ Please enter a playlist name.';
      return;
    }

    try {
      const response = await fetch('/my-playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = `✅ Playlist "${result.name}" created successfully! ID: ${result.id}`;
        form.reset();
      } else {
        messageDiv.textContent = `❌ Error: ${result.message || 'Something went wrong'}`;
      }
    } catch (error) {
      messageDiv.textContent = `❌ Network error: ${error.message}`;
    }
  });
});
