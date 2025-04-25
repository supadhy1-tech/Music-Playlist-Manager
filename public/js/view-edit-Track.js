// view-edit-playlist.js

document.querySelectorAll('.add-track-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const playlistId = form.dataset.playlistid;
    const formData = new FormData(form);
    const newTrack = Object.fromEntries(formData.entries());

    const res = await fetch(`/my-playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTrack),
    });

    const msgBox = form.querySelector('.track-msg');

    if (res.ok) {
      msgBox.textContent = 'Track added!';
      msgBox.classList.add('text-success');
      form.reset();
      setTimeout(() => location.reload(), 500); // Refresh to show update
    } else {
      msgBox.textContent = 'Failed to add track';
      msgBox.classList.add('text-danger');
    }
  });
});

// Edit Mode Toggle

document.querySelectorAll('.edit-track').forEach(button => {
  button.addEventListener('click', () => {
    const li = button.closest('li');
    li.querySelector('.track-display').classList.add('d-none');
    li.querySelector('.track-edit-form').classList.remove('d-none');
  });
});

document.querySelectorAll('.cancel-edit').forEach(button => {
  button.addEventListener('click', () => {
    const li = button.closest('li');
    li.querySelector('.track-edit-form').classList.add('d-none');
    li.querySelector('.track-display').classList.remove('d-none');
  });
});

// Submit Edit

document.querySelectorAll('.track-edit-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const li = form.closest('li');
    const trackId = li.dataset.id;  // Get the track ID from the li element
    const playlistId = li.closest('.playlist-container').dataset.playlistid;  // Get playlist ID from the parent playlist-container

    const formData = new FormData(form);
    const updatedTrack = Object.fromEntries(formData.entries());

    const res = await fetch(`/my-playlists/${playlistId}/tracks/${trackId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTrack),
    });

    if (res.ok) {
      location.reload();  // Reload the page to show updated track details
    } else {
      alert('Failed to update track');
    }
  });
});

document.querySelectorAll('.delete-track').forEach(button => {
  button.addEventListener('click', async () => {
    const li = button.closest('li');
    const trackId = li.dataset.id;
    const playlistId = li.closest('.playlist-container').dataset.playlistid;  // <-- Add this line
    console.log(playlistId);
    console.log(trackId);

    const res = await fetch(`/my-playlists/${playlistId}/tracks/${trackId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      li.remove(); // Remove track from the UI
    } else {
      alert('Failed to delete track');
    }
  });
});

