import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { get, INVENTORY_URI } from "../sharedCode/helperFunctions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
    const response = await get({ url: INVENTORY_URI });

    if (response.ok) {
      const json = await response.json();

      context.res = {
        body: json,
      };
    }
    else {
      context.res = {
        status: 500,
        body: response.body,
      };
    }
};

export default httpTrigger;
