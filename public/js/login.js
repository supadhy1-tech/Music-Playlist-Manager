document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMessage.innerHTML = ''; // clear previous errors
  
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username,password})
        });
  
        const result = await response.json();
        console.log(result);
  
        if (response.ok) {
          window.location.replace('/welcomePage');
        } else {
          errorMessage.innerHTML = result.message || 'Login failed. Please try again.';
        }
      } catch (err) {
        console.error(err);
        errorMessage.innerHTML = 'Server error. Please try again later.';
      }
    });
  });
  