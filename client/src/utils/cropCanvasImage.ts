import { type Crop } from "react-image-crop";

export const cropCanvasImage = (
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  crop: Crop
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d');

    if (!ctx) return reject('No 2d context');

    const desiredWidth = 400;
    const desiredHeight = (crop.height / crop.width) * desiredWidth; // Mantener la proporción de la imagen

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    // canvas.width = Math.floor((crop.width * scaleX));
    // canvas.height = Math.floor((crop.height * scaleY));
    canvas.width = desiredWidth;
    canvas.height = desiredHeight;

    ctx.scale(1, 1);
    ctx.imageSmoothingQuality = 'high';
    ctx.save();

    ctx.drawImage(
      img,
      cropX, cropY,   // Posición del recorte en la imagen original
      cropWidth, cropHeight,   // Dimensiones del recorte
      0, 0,   // Posición en el canvas
      canvas.width, canvas.height // Dimensiones en el canvas (redimensionadas)
    );

    ctx.restore();

    // const dataURL = canvas.toDataURL('image/jpg', 0.5);
    canvas.toBlob((blob) => {
      if (blob) {
        // const objUrl = URL.createObjectURL(blob)
        resolve(blob)
      }
    }, 'image/jpg', 0.1)
  })
}

export const dataURLToFile = async (dataURL: string, filename: string) => {
  const res = await fetch(dataURL);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
}