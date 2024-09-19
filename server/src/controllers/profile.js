import bcrypt from "bcryptjs";
import { usersModel } from "#models";
import { deleteFile } from "#utils";

const myProfile = (req, done) => {
  const data = req.user;
  done(null, data);
};

const updateProfile = async (req, done) => {
  try {
    const { id } = req.user;
    const { name, email, password } = req.body;

    const params = {};
    if (name) params.name = name;
    if (email) params.email = email;
    if (password) params.password = bcrypt.hashSync(password, 10);

    if (req.file) {
      params.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const updated = await usersModel.update(id, params);

    if (updated && req.file && req.user.avatar) {
      deleteFile(req.user.avatar);
    }

    return done(null, updated, { message: "Profile updated" });
  } catch (error) {
    console.error("Error actualizando el perfil del usuario:", error);
    return done(error);
  }
};

export default { myProfile, updateProfile };
