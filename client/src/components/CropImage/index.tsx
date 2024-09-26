import { cropCanvasImage } from '@/utils/cropCanvasImage';
import { useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

interface Props {
  imageUrl: string,
  loading: boolean,
  imgElement: HTMLImageElement | null,
  setFile: (file: File) => void,
  setImgElement: (img: HTMLImageElement) => void,
}

const MIN_DIMENTION = 150;
const ASPECT_RATIO = 1;

export default function CropImage({imageUrl, imgElement, loading, setImgElement, setFile}: Props) {
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 25,
    y: 25,
    width: MIN_DIMENTION,
    height: MIN_DIMENTION,
  })

  // load file image
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const {width, height} = e.currentTarget;
    setImgElement(e.currentTarget);
    const currentCrop = makeAspectCrop(
      {
        unit: 'px',
        width: MIN_DIMENTION
      },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(currentCrop, width, height)
    setCrop(centeredCrop);
  }

  // Crop image to save
  const onCropImage = async () => {
    const canvas = document.createElement('canvas');
    if (!imgElement) return;

    const blobFile = await cropCanvasImage(canvas, imgElement, crop);

    const filename = `${Date.now()}.jpg`;

    const newFile = new File([blobFile], filename, {type: blobFile.type})

    setFile(newFile);
  }

  return (
    <div className='flex flex-col justify-between gap-4 h-full'>
      <div className='flex justify-center items-center'>
        <ReactCrop
          aspect={ASPECT_RATIO}
          crop={crop}
          circularCrop
          keepSelection
          ruleOfThirds
          minWidth={100}
          style={{maxHeight: 400}}
          minHeight={100}
          onChange={(pxCrop) => setCrop(pxCrop)}
        >
          <img
            style={{maxHeight: 400}}
            src={imageUrl}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={onCropImage}
          className="py-2 px-3 cursor-pointer flex w-fit rounded-2xl font-medium bg-blue-400 hover:opacity-75">
          {loading ? 'Loading...' : 'Upload Photo'}
        </button>
      </div>
    </div>
  )
}
