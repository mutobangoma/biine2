import * as functions from "firebase-functions";
import axios from "axios";

export const verifyCaptcha = functions.https.onRequest(async (req, res) => {
  try {
    const token = req.body.token;
    const secret = functions.config().recaptcha.secret;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Missing token",
      });
    }

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret,
          response: token,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
