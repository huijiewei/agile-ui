const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;

const WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\/;

export const isAbsoluteUrl = (url: string) => {
  if (WINDOWS_PATH_REGEX.test(url)) {
    return false;
  }

  return ABSOLUTE_URL_REGEX.test(url);
};
