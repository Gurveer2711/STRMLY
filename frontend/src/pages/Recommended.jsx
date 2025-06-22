import { useState, useEffect } from "react";
import axios from "../api/axios";
import VideoCard from "../components/VideoCard";

export default function Recommended() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/video/recommended");
        setVideos(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load recommended videos. Please try again later.");
        console.error("Error fetching recommended videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedVideos();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Recommended for You
        </h1>
        <p className="text-gray-600">
          Curated videos based on your interests and viewing history
        </p>
        {videos.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {videos.length} recommended videos
          </p>
        )}
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No recommendations yet
          </div>
          <p className="text-gray-400">
            Start watching videos to get personalized recommendations!
          </p>
          <div className="mt-4">
            <a href="/" className="text-red-500 hover:text-red-600 underline">
              Browse all videos
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
