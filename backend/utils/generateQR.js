import debug from 'debug';
import qr from 'qr-image';
const dbgr = debug("development:qr-generator");

// Generate QR Code and return as buffer
export const generateQRCode = (accountNumber) => {
  try {

    const qr_svg = qr.imageSync(accountNumber, { type: 'png' });
    return qr_svg;

  } catch (error) {
    dbgr(error);
  }
};
