import React, { useRef, useState } from 'react';

const styles = {
  container: {
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
  },
  fileInput: {
    marginTop: '22px',
    fontSize: '1rem',
  },
  submit: {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    color: 'white',
    background: 'mediumseagreen',
    border: '1px solid',
    marginTop: '22px',
    cursor: 'pointer',
  },
  disabledSubmit: {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    color: 'white',
    background: 'gray',
    border: '1px solid',
    marginTop: '22px',
    cursor: 'pointer',
  }
};

function Form({peer, receiver}) {
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const reader = new FileReader();
    reader.addEventListener('load', e => {
      const buffer = e.target.result;
      const conn = peer.connect(receiver.id, {reliable: true});
      conn.on('open', () => {
        conn.send({ 
          type: files[0].type,
          name: localStorage.getItem('name') ?? 'a webdrop user',
          filename: files[0].name,
          buffer,
        });
        conn.on('close', () => {
          setFiles([]);
          inputRef.current.value = '';
        });
      });
    });
    reader.readAsArrayBuffer(files[0]);
  }

  const isDisabled = () => files.length === 0;

  return <form style={styles.container} onSubmit={handleSubmit}>
      <div>
        <h2>Pick a file to share it with <span>{receiver.name ?? receiver.id}</span>.</h2>
      </div>
      <input ref={inputRef} type={'file'} onChange={e => setFiles(e.target.files)} style={styles.fileInput}></input>
      <input type={'submit'} value={'Share'} disabled={isDisabled()} style={isDisabled() ? styles.disabledSubmit : styles.submit}></input>
    </form>;
}

export default Form;