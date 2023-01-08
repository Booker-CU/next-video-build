import { Player } from '@livepeer/react';
import placeholder from './livestreamPlaceHolder.png'



const playbackId =
  'a1d29znsxus50tn8'; // Need your own playbackId via Livepeer



const PosterImage = () => {
  return (
    <img
      src={placeholder}
      layout="fill"
      objectfit="cover"
      priority
      alt="livestreamplaceholder"

    />
  );
};

export const LivePlayer = () => {
  return (
    <Player
      title="LiveStream"
      playbackId={playbackId}
      showPipButton
      showTitle={true}
      aspectRatio="9to6"
      objectFit="contain"
      //poster={<PosterImage />}
      controls={{
        autohide: 3000,
      }}
      theme={{
        borderStyles: { containerBorderStyle: 'hidden' },
        radii: { containerBorderRadius: '10px' },
      }}
    />
  );
};