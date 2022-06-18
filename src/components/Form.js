import React, { useState } from 'react';

function Form({peer, receiver}) {
  const [files, setFiles] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const reader = new FileReader();
    reader.addEventListener('load', e => {
      const buffer = e.target.result;
      const conn = peer.connect(receiver.id);
      conn.on('open', () => {
        conn.send({ 
          type: files[0].type,
          name: files[0].name,
          buffer,
        });
      });
    });
    reader.readAsArrayBuffer(files[0]);
  }

  return <form className='Form' onSubmit={handleSubmit}>
      <div>
        <h2>Pick a file to share it with <span>{receiver.name ?? receiver.id}</span>.</h2>
      </div>
      <input type={'file'} onChange={e => setFiles(e.target.files)}></input>
      <input type={'submit'} value={'Share'} disabled={files.length === 0}></input>
    </form>;
}

export default Form;