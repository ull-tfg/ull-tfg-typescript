const defaultHeaders = {
  "Content-Type": "application/json",
};

const get = async (url: string, headers?: any) => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers ? headers : defaultHeaders,
  });
  return await response;
};

const post = async (url: string, body: any, headers?: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers ? headers : defaultHeaders,
    body: JSON.stringify(body),
  });
  return await response;
};

const put = async (url: string, body: any, headers?: any) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: headers ? headers : defaultHeaders,
    body: JSON.stringify(body),
  });
  return await response;
};

const _delete = async (url: string, headers?: any) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers ? headers : defaultHeaders,
  });
  return await response;
};

export const http = {
  get,
  post,
  put,
  delete: _delete,
};
