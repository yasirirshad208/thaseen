import { useState, useEffect } from "react";
import axios from "axios";

interface ProfileData {
  username: string;
  email: string;
  phone: string;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found. User might not be logged in.");
          return;
        }
        console.log("Auth token:", token);

        const response = await axios.get("/api/me", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched profile data:", response.data);

       
        setProfileData({
          username: response.data.user.name || "",
          email: response.data.user.email || "",
          phone: response.data.user.phone || "",
        });
      } catch (error: any) {
        if (error.response) {
          console.error(
            "API Error:",
            error.response.data,
            "Status:",
            error.response.status
          );
        } else {
          console.error("Failed to fetch profile:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Profile</h3>
      <div className="space-y-4">
        <div>
          <strong>Username:</strong> <span>{profileData.username}</span>
        </div>
        <div>
          <strong>Email:</strong> <span>{profileData.email}</span>
        </div>
        <div>
          <strong>Phone:</strong> <span>{profileData.phone}</span>
        </div>
      </div>
    </div>
  );
}
