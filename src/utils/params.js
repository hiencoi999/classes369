export const toastParams = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
};

export const S3_PREFIX =
  // eslint-disable-next-line no-undef
  'https://classes369-backend-storage-cb42087a70552-staging.s3.amazonaws.com/public/' | process.env.REACT_APP_S3_PREFIX;
