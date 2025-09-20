import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';

interface OCRScreenProps {
  onComplete: (text: string) => void;
  onBack: () => void;
}

export const OCRScreen: React.FC<OCRScreenProps> = ({ onComplete, onBack }) => {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleOCR = async () => {
    if (!image) return;

    setIsLoading(true);
    setText('');
    setProgress(0);

    const { data: { text } } = await Tesseract.recognize(
      image,
      'eng',
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(m.progress);
          }
        }
      }
    );

    setText(text);
    setIsLoading(false);
    onComplete(text);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">OCR Financial Statement</h2>
      <div className="space-y-4">
        <Input type="file" onChange={handleImageChange} accept="image/*" />
        <Button onClick={handleOCR} disabled={!image || isLoading}>
          {isLoading ? 'Processing...' : 'Extract Text'}
        </Button>
        {isLoading && <Progress value={progress * 100} />}
        <Textarea value={text} readOnly placeholder="Extracted text will appear here." rows={10} />
        <Button onClick={onBack} variant="outline">Back to Assessment</Button>
      </div>
    </div>
  );
};
