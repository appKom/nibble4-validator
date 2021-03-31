import { Product } from "./types";
import fetch, { Response } from "node-fetch";

export const CLIENT_ID = encodeURIComponent(process.env["CLIENT_ID"] || "");
export const CLIENT_SECRET = encodeURIComponent(
  process.env["CLIENT_SECRET"] || ""
);

const API_BASE = process.env["API_BASE"] || "";
export const AUTHORIZE_URI = `${API_BASE}/auth/`;
export const REGISTER_RFID_URI = `${API_BASE}/rfid/`;
export const INVENTORY_URI = `${API_BASE}/inventory/`;
export const BALANCE_URI = `${API_BASE}/transactions/`; // Update balance
export const TRANSACTION_URI = `${API_BASE}/orderline/`; // purchase item
export const LOGIN_URI = (rfid: string): string =>
  `${API_BASE}/usersaldo/?rfid=${rfid}`;

type AJAXArguments = {
  url: string;
  body?: Record<string, unknown> | string;
  headers?: any;
};

export const get = ({ url, body, headers }: AJAXArguments): Promise<Response> =>
  fetch(url, {
    method: "GET",
    body: JSON.stringify(body),
    headers,
  });

export const authorizedGet = (
  token: string,
  { url, body, headers }: AJAXArguments
): Promise<Response> =>
  get({
    url,
    body,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const post = ({
  url,
  body,
  headers,
}: AJAXArguments): Promise<Response> =>
  fetch(url, {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers,
  });

export const authorizedPost = (
  token: string,
  { url, body, headers }: AJAXArguments
): Promise<Response> =>
  post({
    url,
    body,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchToken = async (): Promise<string> => {
  // Currently it returns 'unsuported grant_type' when using application/json. Should look into it.
  const payload = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  const response = await post({
    url: AUTHORIZE_URI,
    body: payload,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json.access_token as string;
  }
  else return undefined;
};

