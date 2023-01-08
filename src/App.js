
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import watchtext from './Watch.png'
import logo from  './Image1.png'
import Button from '@mui/material/Button'


import { useAccount } from 'wagmi'
import { LivepeerConfig, createReactClient, studioProvider} from '@livepeer/react'
import { LivePlayer } from './liveplayer';
//import { DecentralizedStoragePlayback } from './player'
import React, { useEffect, useState } from 'react';

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";


const Pkey = `0x${process.env.REACT_APP_PUSH_KEY}`;
const signer = new ethers.Wallet(Pkey);

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'f2ea9f69-65e4-4ece-beb8-a165328bac2a' // Create your own account on NFTPort
  }
};


function App() {

  const { isConnected } = useAccount();
  const [ videoData, setVideoData ] = useState([]);


  //NFT Port to pull in posts from Channel Creator
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://api.nftport.xyz/v0/me/storage?type=file&page_number=1&page_size=50', options)

      result.json().then(json => {
        setVideoData(json.storage[1])


      })

    }
    fetchData()
  },[])
  console.log(videoData)

  const sendNotification = async() => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title: `Going Live`,
          body: `We are Live!!!!`
        },
        payload: {
          title: `Going Live`,
          body: `We are Live Now!!!!`,
          cta: '',
          img: ''
        },
        channel: 'eip155:5:0xe4FFaE0FD431f590498c8AaF9253aF41320d77A5', // your channel address
        env: 'staging'
      });


      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  return (

    <LivepeerConfig client={ livepeerClient}>

    <div className="My-layout">

      <div className="flexColumn">
         <div className="Wallet-position"><ConnectButton /></div>
        <div className="logo">

          <div className="grimetv">
            Grime.TV
            <div className="watch">

              <div className="image1">

              </div>

              <img src={ watchtext} alt="Logo" />

            </div>

          </div>

        </div>

        <div >
        { isConnected && (
                <>
                <div className="liveplayer-screan">
                  <div><p><Button variant="contained" onClick={ sendNotification }> Send 'Go Live'</Button></p></div>
                  <div><p><LivePlayer/></p></div>

                </div>

                </>
              )}
        </div>


      </div>
      <div ><video width="320" height="240" src={ videoData.ipfs_url } controls>Recent Grime Clip</video></div>
      <img src={ logo }alt="Sat" width="400" height="400" padding="500"/>

    </div>

    </LivepeerConfig>
  );
}

export default App;
