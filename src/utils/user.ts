import Cookies from "js-cookie";

export const setUserCookie = (token: string): void => {
  const expireAt = new Date();
  expireAt.setHours(23, 59, 59, 999);

  Cookies.set("token", token, { expires: expireAt });
};

export const getUserCookie = (): string | null => {
  return Cookies.get("token") || null;
};

export const deleteUserCookie = (): void => {
  Cookies.remove("token");
};
