import axios from 'axios'
export let request=async function request(url,data)
{
  return await axios.post(url,data);
}