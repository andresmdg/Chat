import fs from 'fs';
import path from 'path';

const deleteFile = (dir) => {
    const avatarPath = path.join(process.cwd(), dir);
    fs.unlinkSync(avatarPath);
}

export default deleteFile;
