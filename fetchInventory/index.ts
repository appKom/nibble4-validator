import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { fetchInventory, INVENTORY_URI } from "../sharedCode/helperFunctions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const inventory = await fetchInventory(INVENTORY_URI);

  if (inventory.length > 0) {
    context.res = {
      status: 200 /* Defaults to 200 */,
      body: inventory,
    };
  } else {
    context.res = {
      status: 500,
    };
  }
};

export default httpTrigger;
