import React, { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import { XIcon, PlusIcon, TrashIcon } from 'lucide-react';

interface AddPicturesWithNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (pictures: File[], note: string) => void;
}

const AddPicturesWithNotesModal: React.FC<AddPicturesWithNotesModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [pictures, setPictures] = useState<File[]>([]);
  const [note, setNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Only take the first file and replace any existing pictures
      const newFile = files[0];
      setPictures([newFile]);
    }
  };

  const removePicture = (index: number) => {
    setPictures(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPictures = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pictures.length > 0 || note.trim()) {
      onAdd(pictures, note.trim());
      setPictures([]);
      setNote('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Add Picture with notes</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Add your picture & notes to this annotation.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Pictures Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Picture
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {pictures.map((picture, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(picture)}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removePicture(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPictures}
                className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
              >
                <PlusIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Notes Section */}
          <div className="mb-4">
            <Textarea
              label="Notes"
              placeholder="Lorem ipsum ipsum dolor @kevinbacker"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPicturesWithNotesModal;
