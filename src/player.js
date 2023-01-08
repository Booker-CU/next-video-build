import { Player } from '@livepeer/react';
import { parseArweaveTxId, parseCid } from 'livepeer/media';
import { Box,TextField } from '@mui/material'
import './App.css';

import { useMemo, useState } from 'react';


export const DecentralizedStoragePlayback = () => {
  const [url, setUrl] = useState('');

  const idParsed = useMemo(() => parseCid(url) ?? parseArweaveTxId(url), [url]);

  return (
    <>
      <Box>
        <p > IPFS or Arweave URL </p>
        <TextField

          type="text"
          placeholder="ipfs://... or ar://"
          onChange={(e) => setUrl(e.target.value)}
        />

        {url && !idParsed && (
          <p>Provided value is not a valid identifier. </p>
        )}
      </Box>

      {idParsed && (
        <Player
          title={idParsed.id}
          src={url}
          aspectRatio="2to1"
          autoPlay
          muted
          autoUrlUpload={{
            fallback: true,
            ipfsGateway: 'https://cloudflare-ipfs.com',
          }}
          theme={{
            borderStyles: {
              containerBorderStyle: 'hidden',
            },
            colors: {
              accent: '#00a55f',
            },
            space: {
              controlsBottomMarginX: '10px',
              controlsBottomMarginY: '5px',
              controlsTopMarginX: '15px',
              controlsTopMarginY: '10px',
            },
            radii: {
              containerBorderRadius: '0px',
            },
          }}
        />
      )}

    </>
  );
};