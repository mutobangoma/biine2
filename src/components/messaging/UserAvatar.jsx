import { useState, useEffect } from "react";

export default function useAvatar(userId) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    // Placeholder: fetch avatar URL from Firestore or Storage
    setAvatarUrl(`https://api.adorable.io/avatars/285/${userId}.png`);
  }, [userId]);

  return avatarUrl;
}
