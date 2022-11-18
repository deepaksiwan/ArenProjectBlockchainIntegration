// const url = "http://172.16.1.240:8008/";
const url = "http://localhost:5000";
const ApiConfigs = {
  login: `${url}/api/v1/profile/login`,
  signup: `${url}/api/v1/profile/signup`,
  viewProfile: `${url}/api/v1/profile/viewProfile`,
  editProfile: `${url}/api/v1/profile/editProfile`,
  viewWallet: `${url}/api/v1/userWallet/view`,
  addWallet:`${url}/api/v1/userWallet/add`,
  removeWallet:`${url}/api/v1/userWallet/remove/`,
  getUserNFT:`https://deep-index.moralis.io/api/v2/`
};
export default ApiConfigs;