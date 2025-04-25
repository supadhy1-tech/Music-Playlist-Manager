const logoutBtn = document.getElementById('logout');

      if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          try {
            const response = await fetch('/auth/logout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
              window.location.href = '/'; // Redirect to login page
            } else {
              alert('Logout failed');
            }
          } catch (err) {
            console.error(err);
            alert('Error logging out');
          }
        });
      }

 