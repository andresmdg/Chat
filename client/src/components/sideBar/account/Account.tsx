import { SetStateAction, useState } from "react";
import AccoundField from "./component/AccountField";

export default function Account() {
  return (
    <div className='grid gap-4 p-4 rounded-2xl bg-[#FFCB71] '>
      <ImageUpload />
      <AccoundField placeholder='Nombre' tipe='text' />
      <AccoundField placeholder='Email' tipe='email' />
      <AccoundField placeholder='Password' tipe='password' />
    </div>
  );
}

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result); //
        setError(null);
      };
      reader.onerror = () => {
        setError("Error al leer el archivo");
        setImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError("No se ha seleccionado ningún archivo");
      setImage(null);
    }
  };

  return (
    <div className='text-start grid bg-[#FFCB71] w-full rounded-2xl justify-items-center'>
      <form className='w-full overflow-hidden'>
        <input type='file' accept='image/*' onChange={handleImageChange} />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image && (
        <img
          src={image}
          alt='Imagen subida'
          className='rounded-full w-40 h-40 object-cover border-4 border-blue-500'
        />
      )}
    </div>
  );
};
