import Multer from 'multer';
import Path from 'path';
import Crypto from 'crypto';

export default {
    storage: Multer.diskStorage({
        destination: Path.resolve(__dirname, '..', '..', 'tmp', 'imgPoint'),
        filename: (request, file, callBack) => {
            const hash = Crypto.randomBytes(4).toString('hex');
            const fileName = `${hash}-${file.originalname}`;
            callBack(null, fileName);
        }
    })
};