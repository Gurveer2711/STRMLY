export default function VideoCard({ video }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden">
      <div className="relative">
        <video
          src={video.videoUrl}
          controls
          className="w-full h-48 bg-black object-cover"
          poster={video.thumbnailUrl}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration || "00:00"}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-black mb-2">
          Title: {video.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          By: {video.uploadedBy?.name || "Anonymous"}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
        </div>
        {video.description && (
          <p className="text-sm text-black mt-2">
            Description: {video.description}
          </p>
        )}
      </div>
    </div>
  );
}
