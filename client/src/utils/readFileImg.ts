export const readFileImage = (file: File, callback: (data: string) => void) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const url = reader.result?.toString() || '';
    callback(url)
  })
  reader.readAsDataURL(file)
}