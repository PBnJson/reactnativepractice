import AsyncStorage from "@react-native-async-storage/async-storage";

export const callRpc = async ({
  method,
  params,
  id = "1",
  endpoint = "https://91b9-64-72-56-36.ngrok-free.app/api/rpc",
}: any) => {
  const rpcBody = {
    jsonrpc: "2.0",
    method,
    params,
    id,
  };

  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Csrf-Header": "2", // Custom header which cannot be set outside of same-origin policy
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(rpcBody),
    });

    const resJSON = await res.json();
    return resJSON;
  } catch (err) {
    console.error("RPC CALL ERROR>>>> ", err);
    return {
      success: false,
      err_msg: "RPC_CALL_ERROR",
    };
  }
};
