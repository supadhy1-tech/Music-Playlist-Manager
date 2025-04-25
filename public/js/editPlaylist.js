document.addEventListener('DOMContentLoaded', () => {
    // Edit Playlist Button logic
    document.querySelectorAll('.edit-playlist-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const playlistContainer = e.target.closest('.playlist-container');
        const editForm = playlistContainer.querySelector('.edit-playlist-form');
        const cancelButton = editForm.querySelector('.cancel-edit-playlist');
  
        // Show the form and hide the Edit button
        editForm.classList.remove('d-none');
        button.classList.add('d-none');
  
        // Cancel Edit
        cancelButton.addEventListener('click', () => {
          editForm.classList.add('d-none');
          button.classList.remove('d-none');
        });
      });
    });
  
    // Handle Update Playlist Form Submission
    document.querySelectorAll('.edit-playlist-form').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const playlistContainer = form.closest('.playlist-container');
        const playlistId = playlistContainer.dataset.playlistid;
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());
        
        // Make PUT request to update playlist
        const res = await fetch(`/my-playlists/${playlistId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });
  
        if (res.ok) {
          location.reload(); // Reload the page to reflect changes
        } else {
          alert('Failed to update playlist');
        }
      });
    });
  
    // Handle Delete Playlist Button
    document.querySelectorAll('.delete-playlist-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        const playlistContainer = e.target.closest('.playlist-container');
        const playlistId = playlistContainer.dataset.playlistid;
  
        // Confirm deletion
        if (confirm('Are you sure you want to delete this playlist?')) {
          // Make DELETE request to delete the playlist
          const res = await fetch(`/my-playlists/${playlistId}`, {
            method: 'DELETE',
          });
  
          if (res.ok) {
            playlistContainer.remove(); // Remove the playlist from the DOM
          } else {
            alert('Failed to delete playlist');
          }
        }
      });
    });
  });
  