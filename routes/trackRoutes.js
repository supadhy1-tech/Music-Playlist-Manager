const router = require('express').Router({ mergeParams: true });
const withAuth = require('../middleware/auth');
const { Track, Playlist } = require('../models');

// Create a track under a specific playlist
router.post('/:playlistId/tracks', withAuth, async (req, res) => {
  try {
    const { title, artist, duration } = req.body;

    const playlist = await Playlist.findOne({
      where: {
        id: req.params.playlistId,
        user_id: req.session.user_id,
      },
    });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    const newTrack = await Track.create({
      title,
      artist,
      duration,
      playlist_id: req.params.playlistId,
    });

    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add track', error: err });
  }
});

// Update a track
router.put('/:playlistId/tracks/:trackId', withAuth, async (req, res) => {
  try {
    const { title, artist, duration } = req.body;

    const updated = await Track.update(
      { title, artist, duration },
      {
        where: {
          id: req.params.trackId,
          playlist_id: req.params.playlistId,
        },
      }
    );

    if (!updated[0]) {
      return res.status(404).json({ message: 'Track not found or no changes made' });
    }

    res.json({ message: 'Track updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update track', error: err });
  }
});

// Delete a track
router.delete('/:playlistId/tracks/:trackId', withAuth, async (req, res) => {
  try {
    const deleted = await Track.destroy({
      where: {
        id: req.params.trackId,
        playlist_id: req.params.playlistId,
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.json({ message: 'Track deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete track', error: err });
  }
});

module.exports = router;
