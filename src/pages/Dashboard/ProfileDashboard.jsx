import React, { useState, useRef } from "react";
import { FaUserEdit, FaCamera, FaCheck, FaTimes } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";

const ProfileDashboard = () => {
  const { user, handleUpdateProfile, setLoading } = useAuth();
  const fileInputRef = useRef(null);
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];
        const formData = new FormData();
        formData.append("image", base64Image);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          { method: "POST", body: formData }
        );

        const data = await response.json();
        if (data.success) {
          const imageUrl = data.data.url;
          await handleUpdateProfile({ photoURL: imageUrl });
          setPhotoURL(imageUrl);
          setSuccess("Profile picture updated successfully!");
          setLoading(false);
        } else throw new Error("Image upload failed!");
      };
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!displayName.trim()) {
      setError("Display name cannot be empty");
      return;
    }

    try {
      await handleUpdateProfile({ displayName });
      setSuccess("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      setLoading(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <div className="dark:bg-gray-900 py-5 lg:py-12">
      <div className="lg:w-10/12 mx-auto p-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-32 relative">
            <div className="absolute -bottom-16 left-6">
              <div className="relative group">
                <img
                  src={
                    photoURL ||
                    `https://ui-avatars.com/api/?name=${
                      displayName || "User"
                    }&background=amber-500&color=fff&size=128`
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-amber-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  title="Change photo"
                  disabled={isUploading}
                >
                  <FaCamera />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-6 pb-6">
            {/* Name Edit */}
            <div className="flex items-center justify-between mb-6">
              {editMode ? (
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-2xl font-bold bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 flex-1 mr-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleNameUpdate}
                    className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition-colors"
                    title="Save changes"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setDisplayName(user.displayName || "");
                      setError(null);
                    }}
                    className="ml-2 bg-gray-200 dark:bg-gray-700 dark:text-white text-gray-700 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    title="Cancel"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {displayName || "Your Name"}
                  </h2>
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-amber-500 hover:text-amber-600 transition-colors"
                    title="Edit name"
                  >
                    <FaUserEdit size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
                {success}
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <MdEmail className="text-gray-500 dark:text-gray-400 mr-2" />
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </h3>
                </div>
                <p className="text-gray-900 dark:text-gray-100">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {user?.emailVerified ? "Verified" : "Not verified"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-2">
                  <RiLockPasswordLine className="text-gray-500 dark:text-gray-400 mr-2" />
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">
                    Account Security
                  </h3>
                </div>
                <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                  Change Password
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Last login:{" "}
                  {new Date(user?.metadata?.lastSignInTime).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                About
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  {user?.bio || "Add some information about yourself..."}
                </p>
                <button className="text-amber-600 hover:text-amber-700 text-sm font-medium mt-2">
                  Edit Bio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
