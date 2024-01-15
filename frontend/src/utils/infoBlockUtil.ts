export const getInvalidUrlMsg = (invalidUrls: string[]) => {
  return `Invalid urls: <strong>${invalidUrls.join(", ")}</strong>`;
};

export const getFailedUrlsMsg = (rejectedUrls: string[]) => {
  return `Sorry, some error occured for these urls: <strong>${rejectedUrls.join(
    ", "
  )}</strong>`;
};
