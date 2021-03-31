import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { get, INVENTORY_URI } from "../sharedCode/helperFunctions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
    const response = await get({ url: INVENTORY_URI });
    const json = await response.json();
    context.res = {
      status: response.status,
      body: json,
    };
    
};

export default httpTrigger;
