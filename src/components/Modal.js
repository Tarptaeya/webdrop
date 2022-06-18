import React from "react";

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '44px',
  },
  modal: {
    flex: 1,
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },
  modalContent: {
    padding: '22px',
    textTransform: 'titlecase',
  },
  modalControl: {
    display: 'flex',
  },
  modalButton: {
    padding: '8px',
    fontSize: '1rem',
    border: '1px solid transparent',
    background: 'white',
    flex: 1,
    cursor: 'pointer',
  },
};

function Modal({data, onAccept, onReject}) {
  console.log(data);
  const {name, filename, buffer} = data;

  const accept = () => {
    const url = URL.createObjectURL(new Blob([buffer]));
    const a = document.createElement('a');
    a.download = filename;
    a.href = url;
    a.click();
    onAccept();
  }

  return <div style={styles.container}>
    <div style={styles.modal}>
      <div style={styles.modalContent}>{name} wants to share {filename} with you. Please accept if you want to download the file.</div>
      <div style={styles.modalControl}>
        <button style={{...styles.modalButton, background: 'mediumseagreen', color: 'white'}} onClick={accept}>Accept</button>
        <button style={{...styles.modalButton, background: 'rgb(0, 0, 0, 0.1)'}} onClick={onReject}>Reject</button>
      </div>
    </div>
  </div>;
}

export default Modal;