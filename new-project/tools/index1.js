const tencentcloud = require("tencentcloud-sdk-nodejs");

const SmsClient = tencentcloud.sms.v20190711.Client;

const clientConfig = {
  credential: {
    secretId: "",
    secretKey: "",
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "sms.tencentcloudapi.com",
    },
  },
};

const client = new SmsClient(clientConfig);
const params = {};
client.SendSms(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);