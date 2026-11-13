'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle2, AlertCircle, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: 'portfolio' | 'enquiries' | 'brand';
  label?: string;
  helperText?: string;
  required?: boolean;
}

export default function ImageUploader({
  value,
  onChange,
  folder = 'portfolio',
  label = 'Media Asset',
  helperText = 'JPEG, PNG, WebP, or AVIF (Max 5 MB)',
  required = false,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [useUrlMode, setUseUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setErrorMessage(null);

    // Client-side validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WebP, or AVIF).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(`Image is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 5 MB.`);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#241416]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setUseUrlMode(!useUrlMode)}
          className="text-[11px] font-medium text-[#8F3D30] hover:text-[#241416] flex items-center gap-1 transition-colors"
        >
          {useUrlMode ? (
            <>
              <Upload className="w-3 h-3" />
              <span>Switch to File Upload</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>Or Enter Image URL</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span className="flex-1">{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage(null)} className="text-red-500 hover:text-red-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {useUrlMode ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... (direct image link or /placeholders/...)"
            className="w-full bg-[#FAF5EE] border border-[#EADBCE] rounded-xl px-3.5 py-2.5 text-xs text-[#241416] focus:outline-none focus:border-[#C5A059]"
          />
          <p className="text-[11px] text-[#241416]/60">
            Paste an image URL or relative path (e.g., <code className="bg-white px-1 py-0.5 rounded text-[#8F3D30]">/placeholders/portfolio-bridal.svg</code>).
          </p>
        </div>
      ) : (
        <div>
          {value ? (
            <div className="relative rounded-2xl border border-[#EADBCE] bg-[#FAF5EE] overflow-hidden p-3 flex items-center gap-4">
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-[#EADBCE]">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Image Selected &amp; Ready</span>
                </div>
                <p className="text-[11px] text-[#241416]/70 truncate mt-0.5">
                  {value}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#EADBCE] hover:bg-[#FAF5EE] text-[#241416] font-medium transition-colors"
                  >
                    Change File
                  </button>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="text-xs px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-[#B35D4D] bg-[#FAF5EE]'
                  : 'border-[#EADBCE] hover:border-[#C5A059] bg-[#FAF5EE]/50 hover:bg-[#FAF5EE]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {isUploading ? (
                <div className="py-4 space-y-2">
                  <Loader2 className="w-8 h-8 text-[#B35D4D] animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-[#241416]">Uploading &amp; validating image...</p>
                  <p className="text-[11px] text-[#241416]/60">Processing upload with safe naming</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#EADBCE] flex items-center justify-center mx-auto text-[#B35D4D] shadow-xs">
                    <Upload className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#8F3D30]">Click to choose file</span>
                    <span className="text-xs text-[#241416]/70"> or drag and drop</span>
                  </div>
                  <p className="text-[11px] text-[#241416]/60">{helperText}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

