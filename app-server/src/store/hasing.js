import { SHA256 } from "crypto-js";

import axios from "axios";

const getSlt = async function () {
  const res = await axios.get("/login/getslt");
  return res.data;
};

const hasing = async function (secret) {
  const hash = SHA256(secret + (await getSlt())).toString();
  return hash.substring(0, 45);
};

export default hasing;
