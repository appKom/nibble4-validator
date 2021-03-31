import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {authorizedPost, REGISTER_RFID_URI, fetchToken} from "../sharedCode/helperFunctions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
   
    const token = await fetchToken();
    
    if (token) {
        const response = await authorizedPost(token, {url:REGISTER_RFID_URI, body: req.body });
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