export const isValidEmail = (email: string): boolean => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};

export const getApiUrl = () => {
  let url =
    `${process?.env?.NEXT_PUBLIC_VERCEL_URL}` ?? // Automatically set by Vercel.
    process?.env?.NEXT_PUBLIC_API_URL;
  return url;
};
