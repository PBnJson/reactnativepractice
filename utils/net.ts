import AsyncStorage from "@react-native-async-storage/async-storage";

export const callRpc = async ({
  method,
  params = {},
  id = "1",
  // SEND HERE IN PROD > https://pointing-up.com/api/rpc
  endpoint = "e413-64-72-56-36.ngrok-free.app/api/rpc",
  authorizationHeader,
}: any) => {
  params.requestAuthTokenHeader = "Authorization";
  const rpcBody = {
    jsonrpc: "2.0",
    method,
    params,
    id,
  };

  try {
    // SENDING OUT
    // use more secure storage
    const token = await AsyncStorage.getItem("jwtToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Csrf-Header": "2", // Custom header which cannot be set outside of same-origin policy
      "ngrok-skip-browser-warning": "skip-browser-warning",
    };

    if (token) {
      headers["Authorization"] = `${token}`;
    }

    // GETTING BACK
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(rpcBody),
    });

    const resJSON = await res.json();
    resJSON._resHeaders = res.headers;
    return resJSON;
  } catch (err) {
    console.error("RPC CALL ERROR>>>> ", err);
    return {
      success: false,
      err_msg: "RPC_CALL_ERROR",
    };
  }
};
