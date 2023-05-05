// import React from 'react';

// function SoundCloudPlayer(props) {
//   const { playlistId, width, height } = props;
//   const srcUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistId}&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true`;

//   return (
//     <iframe
//       width={width}
//       height={height}
//       allow="autoplay"
//       src={srcUrl}
//     />
//   );
// }

// export default SoundCloudPlayer;

import React from "react";

function SoundCloudPlayer({ playlistId }) {
  return (
    <iframe
      width="100%"
      height="300"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
    ></iframe>
  );
}

export default SoundCloudPlayer;
