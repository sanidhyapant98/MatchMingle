import { MapPin, Zap } from 'lucide-react';

export default function UserCard({ user }) {
  return (
    <div className="card shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      {/* Profile image placeholder */}
      <div className="w-full h-96 bg-gradient-to-br from-primary-200 to-pink-200 flex items-center justify-center rounded-lg mb-6">
        {user.profileUrl ? (
          <img
            src={user.profileUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-2">👤</div>
            <p className="text-gray-500">No photo available</p>
          </div>
        )}
      </div>

      {/* User info */}
      <div className="space-y-4">
        {/* Name and age */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {user.firstName} {user.lastName}, {user.age}
          </h2>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>
        )}

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary-600" />
              Skills & Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gender */}
        {user.gender && (
          <div className="flex items-center gap-2 text-gray-600">
            <span className="capitalize font-medium">{user.gender}</span>
          </div>
        )}
      </div>
    </div>
  );
}