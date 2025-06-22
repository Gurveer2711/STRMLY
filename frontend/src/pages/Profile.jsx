import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => alert("You must be logged in"));
  }, []);

  return user ? (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
