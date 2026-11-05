import { authClient } from "./auth-client"

export const getTokenFormClient =async ()=>{
  const {data}= await authClient.token()
  const token = data?.token
  return token
}