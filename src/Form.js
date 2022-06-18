import React, { useState } from 'react';

function Form({peer, receiverId}) {
  const [files, setFiles] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    
    const conn = peer.connect(receiverId);
    conn.on('open', () => {
      conn.send({ 
        type: files[0].type,
      });
    });
  }

  return <form className='Form' onSubmit={handleSubmit}>
      <label id='file-input-label'>
        {files.length > 0 && <div>{files[0].name}</div>}
        <input type={'file'} onChange={e => setFiles(e.target.files)} hidden={true}></input>
      </label>
      <input type={'submit'} value={'Share'} disabled={files.length === 0}></input>
      <div>
        <p>Sending file to: {receiverId}</p>
      </div>
    </form>;
}

export default Form;