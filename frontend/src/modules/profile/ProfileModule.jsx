import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, setEditing } from '../../store/profileSlice';
import { Edit2, Save, X } from 'lucide-react';

export default function ProfileModule() {
  const dispatch = useDispatch();
  const { profile, isLoading, isEditing } = useSelector((state) => state.profile);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile && !editedProfile.firstName) {
      setEditedProfile(profile);
    }
  }, [profile]);

  const handleEdit = () => {
    dispatch(setEditing(true));
  };

  const handleCancel = () => {
    dispatch(setEditing(false));
    setEditedProfile(profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateProfile(editedProfile));
  };

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-white shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 btn-primary"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Profile picture */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-200 to-pink-200 mx-auto mb-8 flex items-center justify-center text-5xl">
            {editedProfile.profileUrl ? (
              <img
                src={editedProfile.profileUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              '👤'
            )}
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editedProfile.firstName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editedProfile.lastName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
            </div>

            {/* Email - read only */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={editedProfile.email || ''}
                disabled
                className="input-field bg-gray-50"
              />
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={editedProfile.age || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                <select
                  name="gender"
                  value={editedProfile.gender || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Bio</label>
              <textarea
                name="bio"
                value={editedProfile.bio || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className={`input-field resize-none h-24 ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Profile URL */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Profile Photo URL</label>
              <input
                type="url"
                name="profileUrl"
                value={editedProfile.profileUrl || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Skills & Interests</label>
              <p className="text-xs text-gray-500 mb-2">Enter skills separated by commas</p>
              <textarea
                name="skills"
                value={Array.isArray(editedProfile.skills) ? editedProfile.skills.join(', ') : ''}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    skills: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s),
                  }))
                }
                disabled={!isEditing}
                className={`input-field resize-none h-20 ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="React, Design, Travel, Cooking..."
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <p className="text-sm text-gray-600">
              Member since {new Date(editedProfile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}