import React from "react";
import { QRCodeCanvas } from 'qrcode.react';

function Code({peer}) {
  return <div className='Code'>
    <QRCodeCanvas
    value={`https://anmolgautam.com/webdrop?peer-id=${peer?.id ?? ''}`} />
    <div style={{marginTop: '22px'}}>
      <p>Share the above QR code to share files to this device.</p>
    </div>
  </div>

}

export default Code;