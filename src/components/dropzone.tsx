import { CloudUploadIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

interface IDropzoneGenericProps {
  files: File[];
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
}

export function Dropzone(props: IDropzoneGenericProps) {
  const [displayedFiles, setDisplayedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: props.accept,
    onDropAccepted: (accepted: File[]) => {
      props.onDrop(accepted);
    },
    onDrop: () => {
      props.onDrop([]);
    },
    multiple: props.multiple || false,
  });

  useEffect(() => {
    if (props.files && props.files.length > 0) {
      setDisplayedFiles(props.files);
    } else if (acceptedFiles.length > 0) {
      setDisplayedFiles(acceptedFiles.map((file) => file));
    } else {
      setDisplayedFiles([]);
    }
  }, [props.files, acceptedFiles]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-6 border-2 border-dashed border-secondary rounded-lg hover:border-secondary dark:border-secondary dark:hover:border-primary transition-colors cursor-pointer">
      <section className="px-4">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className="flex flex-row gap-2 items-center justify-center">
            <CloudUploadIcon className="h-20 w-20 text-secondary dark:text-gray-500" />
            <div>
              <p className="text-secondary dark:text-secondary">
                Haga clic aquí para seleccionar el archivo o arrástrelo desde su directorio
              </p>

              <div className="text-center mt-2 font-bold">
                {displayedFiles.length} archivo(s) seleccionado(s)
              </div>
            </div>
          </div>
          {displayedFiles.length > 0 && (
            <ul className="mt-3 flex  text-xs text-secondary">
              {displayedFiles.map((file, index) => (
                <li key={index} className="px-2 m-1 py-1 rounded-sm border border-secondary">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
