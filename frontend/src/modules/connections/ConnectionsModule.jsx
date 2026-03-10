import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConnections } from '../../store/profileSlice';
import { Heart } from 'lucide-react';

export default function ConnectionsModule() {
  const dispatch = useDispatch();
  const { connections, isLoading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchConnections());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading connections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to load connections</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No connections yet</h2>
          <p className="text-gray-600">Start exploring to find matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Connections</h1>
        <p className="text-gray-600 mb-8">{connections.length} match{connections.length !== 1 ? 'es' : ''}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <div
              key={connection._id}
              className="card bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              {/* Avatar */}
              <div className="w-full h-64 bg-gradient-to-br from-primary-200 to-pink-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {connection.profileUrl ? (
                  <img
                    src={connection.profileUrl}
                    alt={connection.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-5xl">👤</div>
                )}
              </div>

              {/* Info */}
              <h2 className="text-2xl font-bold text-gray-900">
                {connection.firstName} {connection.lastName}
              </h2>

              {/* Age */}
              {connection.age && (
                <p className="text-gray-600 text-lg">{connection.age} years old</p>
              )}

              {/* Bio */}
              {connection.bio && (
                <p className="text-gray-700 mt-3 line-clamp-2">{connection.bio}</p>
              )}

              {/* Skills */}
              {connection.skills && connection.skills.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {connection.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Heart icon */}
              <div className="mt-4 flex justify-center">
                <Heart className="w-6 h-6 text-primary-600 fill-primary-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}