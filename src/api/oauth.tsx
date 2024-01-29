import { Context } from "elysia";
import axios from "axios";
import qs from "qs";
import User from "../model/oauth";

const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

export const getKakaoUser = async (c: Context) => {
  const { CLIENT_ID, REDIRECT_URI } = Bun.env;
  const { code } = c.query;

  const token = await axiosInstance.post(
    "https://kauth.kakao.com/oauth/token",
    qs.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code,
    })
  );

  const user = await axiosInstance.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token.data.access_token}`,
    },
  });

  const {
    id,
    kakao_account: {
      profile: { nickname },
    },
  } = user.data;
  const existingUser = await User.findOne({ _id: id });

  if (!existingUser) {
    const userItem = new User({
      _id: id,
      name: nickname,
    });
    await userItem.save();
  }

  return (c.set.redirect = `http://localhost:3000/?id=${id}`);
};

export const getFindUser = async (c: Context) => {
  const { id } = c.params;
  const existingUser = await User.find({ _id: id });
  if (!existingUser || existingUser.length === 0) {
    c.set.status = 404;
    throw new Error("User is not exist!");
  }
  return existingUser;
};

export const getDeleteUser = async (c: Context) => {
  if (c.params && !c.params?.id) {
    c.set.status = 400;
    throw new Error("No id provided");
  }
  const deletedUser = await User.deleteOne({ _id: c.params?.id });
  return {
    status: c.set.status,
    success: true,
    data: deletedUser,
    message: `Delete user with id ${c.params?.id}`,
  };
};
