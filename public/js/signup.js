document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMessage.innerHTML = ''; // clear previous errors
  
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      if (password !== confirmPassword) {
        errorMessage.innerHTML = 'Passwords do not match.';
        return;
      }
  
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password,confirmPassword })
        });
  
        const result = await response.json();
        console.log(result);
  
        if (response.ok) {
          window.location.replace('/welcomePage');
        } else {
          errorMessage.innerHTML = result.message || 'Signup failed. Please try again.';
        }
      } catch (err) {
        console.error(err);
        errorMessage.innerHTML = 'Server error. Please try again later.';
      }
    });
  });
  