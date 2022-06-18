import { Peer } from 'peerjs';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Code from './Code';
import Form from './Form';
import Navbar from './Navbar';

function App() {
  const [peer, setPeer] = useState();
  const [receiverId, setReceiverId] = useState();

  useEffect(() => {
    setPeer(new Peer(`webdrop-${uuid()}`));

    const params = new URLSearchParams(window.location.search);
    const id = params.get('peer-id');
    if (!!id) {
      setReceiverId(id);
    }
  }, []);

  useEffect(() => {
    console.log(peer);
    if (!peer) return;

    peer.on('connection', conn => {
      console.log(conn);
      conn.on('open', () => {
        conn.on('data', d => console.log(d));
      });
    });

  }, [peer]);

  if (!peer) {
    return <div>
      <p>Unable to connect to WebRTC</p>
    </div>
  }

  return (
    <div className='App'>
      <Navbar />
      {!receiverId && <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
        <Code peer={peer}/>
      </div>}
      {receiverId && <div>
        <Form peer={peer} receiverId={receiverId} />
      </div>}
    </div>
  );
}

export default App;
