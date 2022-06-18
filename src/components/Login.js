import React, { useEffect, useState } from "react";

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '22px',
  },
  img: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    border: '1px solid',
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
  },
  button: {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    color: 'white',
    background: 'mediumseagreen',
    border: '1px solid',
    marginTop: '22px',
    cursor: 'pointer',
  },
  disabledButton: {
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

function Login({onSubmit}) {
  const [name, setName] = useState('');

  const isDisabled = () => name.length < 3;

  return <div style={styles.container}>
    <h1>&#x1f4a7; #webdrop</h1>
    <div style={styles.img}>
      <img width={'256px'} src="https://avatars.dicebear.com/api/pixel-art/%23webdrop.svg"></img>
    </div>
    <input type={'text'} style={styles.input} placeholder={'Nickname'} value={name} onChange={e => setName(e.target.value)}></input>
    <button style={isDisabled() ? styles.disabledButton : styles.button} onClick={() => onSubmit(name)} disabled={isDisabled()}>&rarr; Get Started</button>
  </div>;
}

export default Login;