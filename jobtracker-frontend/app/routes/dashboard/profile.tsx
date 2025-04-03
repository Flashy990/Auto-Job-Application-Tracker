import React, { useEffect, useState } from "react";

interface UserProfile {
  avatar: string;
  username: string;
  gender: string;
  dob: string;
  education: string;
  industry: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const userId = "123"; // Replace with dynamic user ID retrieval logic

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="w-80 bg-white p-6 rounded-lg shadow-md text-center">
        <img
          src={user.avatar}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
        <p className="text-gray-600">Gender: {user.gender}</p>
        <p className="text-gray-600">Date of Birth: {user.dob}</p>
        <p className="text-gray-600">Education: {user.education}</p>
        <p className="text-gray-600">Industry: {user.industry}</p>
      </div>
    </div>
  );
};

export default Profile;