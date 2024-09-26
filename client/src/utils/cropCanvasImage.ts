import { type Crop } from "react-image-crop";

export const cropCanvasImage = (
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  crop: Crop
) => {
  const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('No 2d context');

    const pixelRatio = window.devicePixelRatio;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(-cropX, -cropY);

    ctx.drawImage(
      img,
      0, 0,
      img.naturalWidth,
      img.naturalHeight,
      0, 0,
      img.naturalWidth,
      img.naturalHeight
    );

    ctx.restore();
    const dataURL = canvas.toDataURL('image/jpg');
    return dataURL;
}

export const dataURLToFile = async (dataURL: string, filename: string) => {
  const res = await fetch(dataURL);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
}