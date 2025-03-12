import React, { useState } from "react";
import { Container } from "react-bootstrap";
import UserHeader from "./UserHeader";
import UserData from "./UserData";

const UserContainer = () => {
  const [search, setSearch] = useState("");

  return (
    <Container style={{ width: "95%" }}>
      <UserHeader setSearch={setSearch} search={search} />
      <UserData search={search} />
    </Container>
  );
};

export default UserContainer;

// {
//   "success": true,
//   "statuscode": 1,
//   "message": "User signup successfully",
//   "data": {
//       "user_type": "user",
//       "full_name": "abc",
//       "email_address": "abc1@gmail.com",
//       "mobile_number": 9988775544,
//       "country_code": null,
//       "password": "342f4f45f9e6dfc26ed829f2fd3d60b7",
//       "dob": "2002-02-01T00:00:00.000Z",
//       "profile_picture": null,
//       "bio": null,
//       "unique_name": "abc1",
//       "name_of_followers": "Followers",
//       "is_self_delete": false,
//       "otp": null,
//       "is_social_login": false,
//       "profile_url": null,
//       "social_id": null,
//       "social_platform": null,
//       "noti_badge": 0,
//       "website_link": null,
//       "instagram_link": null,
//       "facebook_link": null,
//       "tiktok_link": null,
//       "social_platform_data": "everyone",
//       "user_last_active_date": null,
//       "is_verified": false,
//       "is_private_account": false,
//       "is_deactive_account": false,
//       "interested": [
//           "656081d2f5405e6336b479b5",
//           "656081d2f5405e6336b479b5",
//           "656081d2f5405e6336b479b5"
//       ],
//       "is_login": true,
//       "is_online": true,
//       "socket_id": null,
//       "is_block": false,
//       "is_fake": false,
//       "is_deleted": false,
//       "_id": "67cedb6981a89df1faf23ec6",
//       "createdAt": "2025-03-10T12:30:33.283Z",
//       "updatedAt": "2025-03-10T12:30:33.283Z",
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2VkYjY5ODFhODlkZjFmYWYyM2VjNiIsImlhdCI6MTc0MTYwOTgzM30.mcbh7xUpgVE5WSIbgYQGNjFFGjRbb6PKfL0eavyMLJo"
//   }
// }
