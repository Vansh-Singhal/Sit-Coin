import DataUriParser from 'datauri/parser.js';

const getUri = (buffer) => {
    const parser = new DataUriParser();
    const extName = 'qr.png';
    return parser.format(extName,buffer);
}

export default getUri;