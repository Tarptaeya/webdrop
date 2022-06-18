import { Peer } from 'peerjs';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Code from './Code';
import Form from './Form';
import Login from './Login';
import Modal from './Modal';
import Navbar from './Navbar';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
}

function App() {
  const [name, setName] = useState(localStorage.getItem('name'));
  const [peer, setPeer] = useState();
  const [receiver, setReceiver] = useState({});
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPeer(new Peer(`webdrop-${uuid()}`));

    const params = new URLSearchParams(window.location.search);
    const id = params.get('peer-id');
    const name = params.get('name');
    if (!!id) {
      setReceiver({id, name});
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
          conn.close();
        })
      });
    });

  }, [peer]);

  useEffect(() => {
    if (!name) {
      localStorage.removeItem('name');
    } else {
      localStorage.setItem('name', name);
    }
  }, [name]);

  if (!peer) {
    return <div>
      <p>Unable to connect to WebRTC</p>
    </div>
  }

  if (!name) {
    return <div style={styles.container}>
      <Navbar />
      <Login onSubmit={setName}/>
    </div>;
  }

  return (
    <div style={styles.container}>
      {isModalOpen && <Modal data={data} onAccept={() => setIsModalOpen(false)} onReject={() => setIsModalOpen(false)}/>}
      <Navbar />
      {!receiver.id && <Code peer={peer} name={name} />}
      {receiver.id && <Form peer={peer} name={peer} receiver={receiver} />}
    </div>
  );
}

export default App;
