import React from "react";
import { QRCodeCanvas } from 'qrcode.react';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '22px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrcode: {}
};

function Code({peer, name}) {
  return <div style={styles.container}>
    <QRCodeCanvas size={190} style={styles.qrcode}
    value={`https://anmolgautam.com/webdrop?peer-id=${peer?.id ?? ''}&name=${name}`} />
    <div style={{marginTop: '22px'}}>
      <p>Share the above QR code to share files to this device.</p>
    </div>
  </div>

}

export default Code;