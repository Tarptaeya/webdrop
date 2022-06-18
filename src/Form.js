import React, { useState } from 'react';

function Form({peer}) {
  const [files, setFiles] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    
    discoverRecipient((id) => {
      const conn = peer.connect(id);
      conn.on('open', () => {
        conn.send({ 
          type: files[0].type,
        });
      });
    });
  }

  const discoverRecipient = (callback) => {

  }

  return <form className='Form' onSubmit={handleSubmit}>
      <label id='file-input-label'>
        {files.length > 0 && <div>{files[0].name}</div>}
        <input type={'file'} onChange={e => setFiles(e.target.files)} hidden={true}></input>
      </label>
      <input type={'submit'} value={'Share'} disabled={files.length === 0}></input>
    </form>;
}

export default Form;