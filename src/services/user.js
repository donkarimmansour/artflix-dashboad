import axios from "axios";
import { Host, ApiEndpoints } from "../common/apiEndPoints";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const EditUser = async (id, data, token) => {
  return await axios.put(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.edit}/${id}`,
    data,
    { headers: { ...config.headers, ...token } }
  );
}; 

const EditRule = async (id, data, token) => {
  return await axios.put(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.rule}/${id}`,
    data,
    { headers: { ...config.headers, ...token } }
  );
}; 


const List = async (filiter, token) => {
  return await axios.get(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.list}`,
    { headers: { ...config.headers, ...token }, params: filiter }
  );
};

const Create = async (data, token) => {
  return await axios.post(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.create}`,
    data,
    { headers: { ...config.headers, ...token } }
  );
};


const Image = async (id, data, token) => {
  return await axios.put(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.image}/${id}`,
    data,
    // { headers: { "Content-Type": "application/json", ...con } }
    { headers: { ...config.headers, ...token } }
  );
};
const ConfirmEmailAuth = async (id) => {
  return await axios.put(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.confirm}/${id}`,
    config
  );
};
const Suspended = async (id, data, token) => {
  return await axios.put(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.suspension}/${id}`,
    data,
    { headers: { ...config.headers, ...token } }
  );
};
const VerifiedEmailUser = async (id, token) => {
  return await axios.put(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.confirm}/${id}`,
    {},
    { headers: { ...config.headers, ...token } }
  );
};
const Count = async (filterage, token) => {
  return await axios.get(
    `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.count}`,
    { headers: { ...config.headers, ...token }, params: { ...filterage } }
  );
};

export {
  Suspended,
  VerifiedEmailUser,
  Create,
  List,
  Image,
  Count,
  ConfirmEmailAuth,
  EditUser,
  EditRule
};