import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { PICNIC_IMAGE_BASE64 } from '../assets/images';
import { SparklesIcon, PhotoIcon, InformationCircleIcon } from '../components/icons/Icons';
import { useLanguage } from '../context/LanguageContext';

const ImageEditor: React.FC = () => {
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [editedText, setEditedText] = useState<string | null>(null);

    // State for the source image
    const [sourceImage, setSourceImage] = useState<string | null>(PICNIC_IMAGE_BASE64);
    const [sourceMimeType, setSourceMimeType] = useState<string>('image/jpeg');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSourceImage(reader.result as string);
                setSourceMimeType(file.type);
                // Reset previous results
                setEditedImage(null);
                setEditedText(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleEditImage = async () => {
        if (!prompt) {
            setError(t('imageEditor.error.noPrompt'));
            return;
        }
        if (!sourceImage) {
            setError(t('imageEditor.error.noImageSource'));
            return;
        }
        setIsLoading(true);
        setError(null);
        setEditedImage(null);
        setEditedText(null);

        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string });
            
            const base64ImageData = sourceImage.split(',')[1];
            
            const imagePart = {
                inlineData: {
                    data: base64ImageData,
                    mimeType: sourceMimeType,
                },
            };

            const textPart = { text: prompt };

            // FIX: Correct model name per API guidelines for image editing.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            let foundImage = false;
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64Result = part.inlineData.data;
                    setEditedImage(`data:image/png;base64,${base64Result}`);
                    foundImage = true;
                } else if (part.text) {
                    setEditedText(part.text);
                }
            }

            if (!foundImage) {
                throw new Error(t('imageEditor.error.noImage'));
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || t('imageEditor.error.generic'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold text-gray-700">{t('imageEditor.originalImage')}</h2>
                        <div 
                            className="relative group aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center text-center p-2 cursor-pointer hover:border-blue-500 transition-colors"
                            onClick={triggerFileUpload}
                        >
                            {sourceImage ? (
                                <img src={sourceImage} alt="Source for editing" className="max-h-full max-w-full object-contain rounded-md" />
                            ) : (
                                <div className="space-y-2 text-gray-500">
                                    <PhotoIcon className="mx-auto h-12 w-12" />
                                    <p className="text-sm">{t('imageEditor.upload.cta')}</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                <p className="text-white font-semibold">
                                    {sourceImage ? t('imageEditor.upload.change') : t('imageEditor.upload.cta')}
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={handleImageUpload}
                                className="hidden"
                                aria-label="Upload image"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                         <div className="space-y-2">
                            <label htmlFor="edit-prompt" className="block text-sm font-medium text-gray-700">
                                {t('imageEditor.promptLabel')}
                            </label>
                            <textarea
                                id="edit-prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={t('imageEditor.promptPlaceholder')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                rows={3}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            onClick={handleEditImage}
                            disabled={isLoading || !prompt || !sourceImage}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('imageEditor.button.editing')}
                                </>
                            ) : (
                                 <>
                                    <SparklesIcon className="h-5 w-5 mr-2" />
                                    {t('imageEditor.button.apply')}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200 text-sm mt-6">
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>

            {(editedImage || editedText) && !isLoading && (
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-700">{t('imageEditor.result')}</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-4">
                        {editedImage ? (
                             <img src={editedImage} alt="Edited picnic scene" className="rounded-lg shadow-md w-full object-contain" />
                        ) : (
                            <div className="text-center py-12 flex flex-col items-center">
                                <PhotoIcon className="h-12 w-12 text-gray-300 mb-2"/>
                                <h3 className="text-lg font-semibold text-gray-700">{t('imageEditor.noImageGenerated')}</h3>
                                <p className="text-gray-500 mt-1">{t('imageEditor.noImageGenerated.description')}</p>
                            </div>
                        )}
                        {editedText && (
                            <div className="bg-blue-50 text-blue-800 p-4 rounded-md border border-blue-200 flex items-start space-x-3">
                                <InformationCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p className="text-sm">{editedText}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageEditor;