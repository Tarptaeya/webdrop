import React from "react";

function Modal({data}) {
  console.log(data);
  const {name, buffer} = data;

  const accept = () => {
    const url = URL.createObjectURL(new Blob([buffer]));
    const a = document.createElement('a');
    a.download = name;
    a.href = url;
    a.click();
  }

  return <div>
    <div>{name}</div>
    <div>
      <button onClick={accept}>Accept</button>
      <button>Reject</button>
    </div>
  </div>;
}

export default Modal;