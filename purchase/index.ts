import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import  {authorizedPost, TRANSACTION_URI, fetchToken } from "../sharedCode/helperFunctions"
import {OrderLineFormat} from "../sharedCode/types"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const token = await fetchToken();
    if (token) {
        const response = await authorizedPost(token, {url:TRANSACTION_URI, body:req.body})
        const json = await response.json();

        context.res = {
            status: response.status,
            body: json
        };
    }
    else {
        context.res = {
            status: 500,
            body: {"error": "Could not fetch token"}
        };
    }
  

};
export default httpTrigger;
