import React, { useRef, useState } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { PDFIcon } from '@/components/ui/Icons';

interface File {
  id: string;
  name: string;
  lastUpdated: string;
  type: 'pdf' | 'image' | 'document';
}

interface FilesListProps {
  projectId: string;
  project?: {
    id: string;
    name: string;
    clientName?: string;
    status: 'in-progress' | 'completed' | 'cancelled';
    location: string;
    projectOwner?: string;
    deadline?: string;
    members?: number;
  };
}

const FilesList: React.FC<FilesListProps> = ({ projectId, project }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const [files, setFiles] = useState<File[]>([
    {
      id: '1',
      name: 'Kitchendrawing.pdf',
      lastUpdated: '2 mins ago',
      type: 'pdf'
    },
    {
      id: '2',
      name: 'Kitchendrawing.pdf',
      lastUpdated: '2 mins ago',
      type: 'pdf'
    },
    {
      id: '3',
      name: 'Kitchendrawing.pdf',
      lastUpdated: '2 mins ago',
      type: 'pdf'
    },
    {
      id: '4',
      name: 'Kitchendrawing.pdf',
      lastUpdated: '2 mins ago',
      type: 'pdf'
    }
  ]);

  const handleAddPDF = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      
      // Validate file type
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        return;
      }
      
      // Validate file size (e.g., max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
      }
      
      // Create new file object
      const newFile: File = {
        id: Date.now().toString(), // Simple ID generation
        name: file.name,
        lastUpdated: 'Just now',
        type: 'pdf'
      };
      
      // Add new file to the files list
      setFiles(prevFiles => [newFile, ...prevFiles]);
      
      console.log('Added new PDF file:', file.name, 'for project:', projectId);
      
      // Reset the input value so the same file can be selected again
      event.target.value = '';
    }
  };

  const handleFileClick = (fileId: string) => {
    if (!project) return;
    
    try {
      // Persist selected project for the details page to consume
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('currentProject', JSON.stringify(project));
      }
    } catch (error) {
      console.error('Error storing project in sessionStorage:', error);
    }
    
    // Navigate to project details page
    router.push({ pathname: '/dashboard/project-details', query: { projectId: project.id } });
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Add PDF Button */}
      <div className="mb-4">
        <button
          onClick={handleAddPDF}
          className="text-action hover:text-action/80 font-medium text-sm flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add new PDF</span>
        </button>
      </div>

      {/* New Items Indicators */}
      <div className="flex gap-2 mb-4">
        <span className="bg-cancelled-bg text-cancelled-color px-2 py-1 rounded text-xs font-medium">
          2 new images
        </span>
        <span className="bg-cancelled-bg text-cancelled-color px-2 py-1 rounded text-xs font-medium">
          2 new comments
        </span>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => handleFileClick(file.id)}
            className="flex items-center justify-between p-4 bg-white border border-border-gray rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-cancelled-color/25 flex items-center justify-center">
                    <PDFIcon className="w-6 h-6 text-cancelled-color" />
                </div>
              <div>
                <h4 className="text-black font-medium text-sm">{file.name}</h4>
                <p className="text-text-gray text-xs">Last updated: {file.lastUpdated}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-black" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesList;
