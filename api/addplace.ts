import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

const token = process.env.API_key;

export default (request: VercelRequest, response: VercelResponse) => {
  const { data = {} } = request.query;
  if (data !== {}) {
    const body = {
      event_type: "trigger",
      client_payload: data,
    };
    fetch("https://api.github.com/repos/petrkucerak/deniksracu/dispatches", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    })
      .catch((err) => {
        response.status(500).send(`Server error`);
        console.log(err);
      })
      .then(() => {
        response.status(200).send(`Success!`);
      });
  } else {
    response.status(400).send(`No data provided!`);
  }
};
