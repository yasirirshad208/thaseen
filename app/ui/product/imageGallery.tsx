import { useState } from "react";

interface ImageGalleryProps {
  coverImage: string | null;
  images: string[];
  videoUrl: string | null;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  coverImage,
  images,
  videoUrl,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(coverImage);

  const handleThumbnailClick = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
  };

  return (
    <div>
      <div className="main-image mb-4">
        {selectedMedia ? (
          selectedMedia.endsWith(".mp4") ? (
            <video controls src={selectedMedia} className="w-full rounded-lg" />
          ) : (
            <img
              src={selectedMedia}
              alt="Product"
              className="w-full rounded-lg"
            />
          )
        ) : (
          <p>No media available</p>
        )}
      </div>
      <div className="thumbnails flex gap-2">
        {coverImage && (
          <img
            src={coverImage}
            alt="Cover Image"
            onClick={() => handleThumbnailClick(coverImage)}
            className={`cursor-pointer w-20 h-20 rounded-lg ${
              selectedMedia === coverImage ? "border-2 border-indigo-500" : ""
            }`}
          />
        )}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
            onClick={() => handleThumbnailClick(img)}
            className={`cursor-pointer w-20 h-20 rounded-lg ${
              selectedMedia === img ? "border-2 border-indigo-500" : ""
            }`}
          />
        ))}
        {videoUrl && (
          <div
            className={`cursor-pointer w-20 h-20 rounded-lg flex items-center justify-center bg-gray-200 ${
              selectedMedia === videoUrl ? "border-2 border-indigo-500" : ""
            }`}
            onClick={() => handleThumbnailClick(videoUrl)}
          >
            <span role="img" aria-label="Video">
              🎥
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
