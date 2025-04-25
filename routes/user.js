const router=require('express').Router();
const session = require('express-session');
const withAuth=require('../middleware/auth');
const { User, Playlist, Track }=require('../models/index');


router.get('/profile',withAuth,async(req,res)=>{
    try{
        // Find logged in user based on session ID
        const userData=await User.findByPk(req.session.user_id,{
            attributes:{exclude:['password']}
        });
        const user= userData.get({plain:true});
        console.log(user);


        res.render('profile',{
            title:'My Profile',
            username:user.username,
            email:user.email,
            joinedDate:user.createdAt,
            logged_in:true,
            layout:false
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});


// Update User Profile (PUT)
router.put('/edit-profile', async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.session.user_id;
  
    try {
      const user = await User.findByPk(userId);
      console.log(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the new email or username already exists
      const existingUserEmail = await User.findOne({ where: { email } });
      const existingUserUsername = await User.findOne({ where: { username } });
  
      if (existingUserEmail && existingUserEmail.id !== userId) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      if (existingUserUsername && existingUserUsername.id !== userId) {
        return res.status(400).json({ error: 'Username already in use' });
      }
  
      if (password) {
        user.password = password; // You can hash the password before saving it.
      }
  
      user.username = username;
      user.email = email;
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  
  
 
  router.delete('/delete-profile', async (req, res) => {
    try {
      const userId = req.session.user_id;
  
      // ✅ Check if user is logged in
      if (!userId) {
        console.log('No session user_id');
        return res.status(401).json({ error: 'Unauthorized. Please log in first.' });
      }
  
      // ✅ Try to find the user
      const user = await User.findByPk(userId);
      if (!user) {
        console.log('User not found with id:', userId);
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // ✅ Delete user from DB
      await user.destroy();
  
      // ✅ Destroy session
      req.session.destroy(err => {
        if (err) {
          console.log('Error destroying session:', err);
          return res.status(500).json({ error: 'Failed to log out after deletion.' });
        }
  
        // ✅ Respond with success
        res.clearCookie('connect.sid'); // Optional: clear session cookie
        return res.json({ message: 'Account deleted successfully.' });
      });
  
    } catch (err) {
      console.error('Server error while deleting account:', err);
      res.status(500).json({ error: 'Server error while deleting account.' });
    }
  });
  
  
  

module.exports=router;
