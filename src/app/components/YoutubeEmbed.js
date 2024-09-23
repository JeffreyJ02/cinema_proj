import React from "react";
import PropTypes from "prop-types";

{/* YoutubeEmbed component, used in MovieCard, used from https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2*/}
const YoutubeEmbed = ({ trailerLink }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={trailerLink}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;