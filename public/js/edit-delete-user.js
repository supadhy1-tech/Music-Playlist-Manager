document.addEventListener('DOMContentLoaded', function () {
    const editForm = document.getElementById('edit-profile-form');
  
    if (editForm) {
      editForm.addEventListener('submit', async function (event) {
        event.preventDefault();
  
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
       
        const body = {
          username,
          email,
          password
         
        };
  
        try {
          const response = await fetch('/edit-profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Profile updated successfully!');
            window.location.reload(); // Or update DOM elements
          } else {
            alert('Error: ' + data.error);
          }
        } catch (error) {
          console.error('Fetch error:', error);
          alert('Something went wrong while updating your profile.');
        }
      });
    }
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    const deleteBtn = document.getElementById('confirm-delete-btn');
  
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async function () {
        try {
          const response = await fetch('/delete-profile', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Your account has been deleted.');
            window.location.href = '/'; // Redirect to homepage or login
          } else {
            alert('Error: ' + data.error);
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          alert('Something went wrong while deleting your account.');
        }
      });
    }
  });
  