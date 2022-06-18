import { Peer } from 'peerjs';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Form from './Form';
import Navbar from './Navbar';

function App() {
  const [peer, setPeer] = useState();

  useEffect(() => {
    const id = uuid();
    setPeer(new Peer(`webdrop-${id}`));
  }, []);

  useEffect(() => {
    console.log(peer);
  }, [peer]);

  return (
    <div className='App'>
      <Navbar />
      <QRCodeCanvas value={`https://anmolgautam.com/webdrop?peer-id=${peer?.id ?? ''}`}/>
      {peer && <Form peer={peer} />}
    </div>
  );
}

export default App;
