
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useRef } from 'react'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'

const ProductImageUpload = ({imageFile,setImageFile,uploadedImgUrl,setUploadedImgUrl}) => {
  const inputRef = useRef(null)

  const handleImageFileChange = (event)=>{
   const selectedFile = event.target.files?.[0];
    if(selectedFile) setImageFile(selectedFile)
  }

  const handleDragOver = (event)=>{
    event.preventDefault();
}

const handleDrop = (event)=>{
  event.preventDefault();
  const droppedFile = event.dataTransfer.files?.[0];
  if(droppedFile) setImageFile(droppedFile)
}

const handleRemoveImg = ()=>{
  setImageFile(null);
  if(inputRef.current) inputRef.current.value=''
}
  return (
    <div className='w-full max-w-md mx-auto mt-4'>
  <Label className="text-lg font-semibold mb-2 block">Upload</Label>
  <div onDragOver={handleDragOver} onDrop={handleDrop} className='border border-2 border-dashed rounded-lg p-4'>
    <Input id="image-upload" className="hidden" type="file" ref={inputRef} onChange={handleImageFileChange}/>
    {
      !imageFile ? <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
        <UploadCloudIcon className='w-10 h-10 text-gray-600 mb-2'/>
        <span>Drag & drop or click to upload image</span>

      </Label>:<div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <FileIcon className='w-8 text-primary mr-2 h-8'/>
        </div>
        <p className='text-sm font-medium'>{imageFile.name}</p>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImg}>
          <XIcon className='h-4 w-4'/>
          <span className='sr-only'>Remove File</span>
        </Button>
      </div>
    }
  </div>
    </div>
  )
}

export default ProductImageUpload