import React from 'react';

function SoundCloudPlayer(props) {
  const { playlistId, width, height } = props;
  const srcUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistId}&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true`;

  return (
    <iframe
      width={width}
      height={height}
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={srcUrl}
    />
  );
}

export default SoundCloudPlayer;
