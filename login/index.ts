import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  LOGIN_URI,
  authorizedGet,
  fetchToken,
} from "../sharedCode/helperFunctions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const rfid = req.query.rfid;
  const url = LOGIN_URI(rfid);
  const token = await fetchToken();

  if (token) {
    const response = await authorizedGet(token, { url });
    const json = await response.json();

    context.res = {
      status: response.status,
      body: json,
    };
  }
  else {
    context.res = {
      status: 500,
      body: {"error": "Could not fetch token"},
    };
  }

};

export default httpTrigger;
