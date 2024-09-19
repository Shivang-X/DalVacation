import AWS from "aws-sdk";
import axios from "axios";

export const session = () => {
  return new Promise(async (resolve, reject) => {
    AWS.config.update({
      region: "us-east-1",
    });
    const cognitoISP = new AWS.CognitoIdentityServiceProvider();

    cognitoISP.getUser(
      {
        AccessToken: localStorage.getItem("accessToken"),
      },
      async (err, data) => {
        if (err) {
          console.error("Error getting user details:", err);
          reject(err);
        } else {
          console.log("User session details:", data.UserAttributes[0].Value);
          const res = await axios.post(
            `https://d5vbhid2fj.execute-api.us-east-1.amazonaws.com/dal-vacation/auth/get-user-profile`,
            { email: data.UserAttributes[0].Value }
          );
          console.log(res);
          const user = {
            id: res.data.body.id.N,
            email: res.data.body.email.S,
            username: res.data.body.username.S,
            role: res.data.body.role.S,
          };
          console.log(user);
          resolve(user);
        }
      }
    );
  });
};
