import { apiFetch } from "./auth";
import { backendUrl } from "../lib/constants";
import { User } from "../types/types";

export const fetchUser = (email: string) => {
  return apiFetch(`${backendUrl}/user/get-user?email=${encodeURIComponent(email)}`);
};

export const fetchUserById = (userId: number) => {
  return apiFetch(`${backendUrl}/user/${userId}`);
};

export const updatePrimaryInfo = (user: User) => {
  const updatedUser = {
    profileName: user.profileName,
    displayName: user.displayName,
    bio: user.bio,
    location: user.location,
    skills: user.skills,
    interests: user.interests,
    userId: user.userId,
    email: user.email,
    userLinks: user.userLinks,
  }
  console.log("Updating primary info:", updatedUser);
  return apiFetch(`${backendUrl}/user/update-primary`, {
    method: "PUT",
    body: JSON.stringify(updatedUser),
  });
};

export const followUser = (sender: User, receiver: User) => {
  return apiFetch(`${backendUrl}/user/${sender.userId}/follow/${receiver.userId}`, {
    method: "POST",
  });
};

export const unfollowUser = (sender: User, receiver: User) => {
  return apiFetch(`${backendUrl}/user/${sender.userId}/unfollow/${receiver.userId}`, {
    method: "POST",
  });
};

export const getFriends = () => {
  return apiFetch(`${backendUrl}/user/all`);
};
