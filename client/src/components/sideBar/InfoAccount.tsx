import { useRef, useState } from 'react';
import { useAuth } from "../hooks/useAuth";
import Modal from '../Modal';
import CropImage from '../CropImage';
import { Profile } from '@/services/profile';
import noProfilePhoto from '/no-profile-photo.jpg';
import { User } from '@/services/user';

export default function InfoAccount(params: {
  name: string;
  userName: string;
  email: string;
  white: boolean;
}) {

  const {user, accessToken} = useAuth();
  // const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null)

  const setFileData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      setShowModal(true);
      const selectedFile =  e.target.files[0];

      const src = URL.createObjectURL(selectedFile);
      setImageUrl(src);
      e.target.files = null;
    }
  }

  const handleSetFile = async (newFile: File) => {
    setLoading(true);
    setShowModal(false);

    const [error, updatedData] = await Profile.updatePhoto(newFile, accessToken);

    const dataUrl = URL.createObjectURL(newFile);

    if (!imgRef.current) return;

    imgRef.current.src = dataUrl

    if (error) {
      imgRef.current.src = noProfilePhoto
    }
    if (updatedData) User.UserStorage.set(updatedData);

    setImageUrl('')
    setLoading(false)
  }

  const handleErrorImage = () => {
    if (imgRef.current) imgRef.current.src = noProfilePhoto;
  }

  return (
    <div
      className={`w-full sidebar_Info h-fit flex-col justify-start items-center gap-6 inline-flex px-2 py-4 rounded-lg ${
        params.white ? "bg-[#ffffff]" : "bg-yellow-50"
      }`}>
      <div className='flex justify-around flex-col w-full items-center gap-3'>
        <div className='relative w-32 h-32 overflow-hidden aspect-square justify-center items-center flex'>
          <img
            ref={imgRef}
            className='w-32 h-32 rounded-full border-2 border-violet-500'
            src={user?.avatar ?? ''}
            onError={handleErrorImage}
          />
          <button
            onClick={() => setShowModal(true)}
            title="Change Photo"
            className="hover:opacity-100 opacity-0 absolute font-medium text-white text-center rounded-full p-2 grid place-content-center w-full h-full bg-zinc-700/60"
          >
            CHANGE PHOTO
          </button>
        </div>
        <div className='w-full flex-col  text-center justify-start gap-2 inline-flex'>
          <h4 className="self-stretch text-lg font-semibold h-4 text-slate-400">
            {user?.name}
          </h4>

          <p className="self-stretch h-4 text-slate-400 text-base font-normal">
            @{user?.username}
          </p>
        </div>

      </div>
      <Modal open={showModal} setOpen={setShowModal}>
        <div className='flex flex-col gap-4'>
          <label
            htmlFor='photo-profile'
            className="py-1 px-3 cursor-pointer flex w-fit rounded-2xl border-blue-400 font-medium text-blue-400 border-[2px] border-solid hover:bg-blue-400 hover:text-white"
          >
            <input
              id='photo-profile'
              className='hidden'
              type="file"
              accept='image/*'
              onChange={(e) => setFileData(e)}
              multiple={false}
              />
            Select Photo
          </label>

          {imageUrl ? (
            <CropImage
              imageUrl={imageUrl}
              imgElement={imgElement}
              setFile={handleSetFile}
              loading={loading}
              setImgElement={setImgElement}
            />
          ) : <p className='text-center mt-[35%] text-blue-400'>You have not yet selected an image</p>
          }
        </div>
      </Modal>
    </div>
  );
}
