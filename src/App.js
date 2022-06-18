import { Peer } from 'peerjs';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Code from './Code';
import Form from './Form';
import Modal from './Modal';
import Navbar from './Navbar';

function App() {
  const [peer, setPeer] = useState();
  const [receiverId, setReceiverId] = useState();
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        conn.on('data', d => {
          setData(d);
          setIsModalOpen(true);
        }
      )});
    });

  }, [peer]);

  if (!peer) {
    return <div>
      <p>Unable to connect to WebRTC</p>
    </div>
  }

  return (
    <div className='App'>
      {isModalOpen && <Modal data={data}/>}
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
