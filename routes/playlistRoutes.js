// routes/playlistRoutes.js
const router = require('express').Router();
const withAuth = require('../middleware/auth');
const {User,Track,Playlist}=require('../models/index');

// Create a new playlist
router.post('/', withAuth, async (req, res) => {
  try {
    const playlist = await Playlist.create({
      name: req.body.name,
      user_id: req.session.user_id,
    });
    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist', error: err });
  }
});

router.get('/add',withAuth,async(req,res)=>{

  const user=await User.findOne({where: {
    id: req.session.user_id,
  }});
  res.render('addPlaylist',{
    layout:false,
    username:user.username
     
  });
})

// Get all playlists for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: {
        user_id: req.session.user_id,
        
      },
      include: [
        {
          model: User,
          attributes: ['username', 'email','id'], // Add more fields if needed
        },
    {
       model: Track,
       attributes: ['title', 'artist','duration','id'],
    }
       
      ],
    });
    const user=await User.findOne({where: {
      id: req.session.user_id,
    }});

    console.log(user.get({plain:true}));

    const play = playlists.map(p => p.get({ plain: true }));
   


    res.render('myPlaylists',{
      layout:false,
      playlists:play,
      username:user.username,
      
     

      
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Playlist
router.put('/:playlistId', withAuth, async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.update(
      { name },
      { where: { id: req.params.playlistId, user_id: req.session.user_id } }
    );

    if (playlist[0] === 0) {
      return res.status(404).json({ message: 'Playlist not found or no changes made' });
    }

    res.json({ message: 'Playlist updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update playlist', error: err });
  }
});

// Delete Playlist
router.delete('/:playlistId', withAuth, async (req, res) => {
  try {
    const playlist = await Playlist.destroy({
      where: { id: req.params.playlistId, user_id: req.session.user_id },
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete playlist', error: err });
  }
});





module.exports = router;
