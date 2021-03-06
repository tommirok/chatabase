
import { authHeader } from "../helpers/authHeader";
import Request from "./Request";
export const service = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  getTopics,
  addTopic,
  getTopicById,
  addMessage,
  addReply,
  delete: _delete
};
const userUrl = "/user";
const topicUrl = "/topics";
const messageUrl = "/messages";

function login(user) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(user)
  };

  return Request(`${userUrl}/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${userUrl}`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${userUrl}/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(user)
  };

  return Request(`${userUrl}`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${userUrl}/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${userUrl}/${id}`, requestOptions).then(handleResponse);
}

function getTopics() {
  const requestOptions = {
    method: "GET",
  };
  return Request(`${topicUrl}`, requestOptions)
    .then(handleResponse)
    .then(resp => {
      return resp;
    });
}

function getTopicById(id) {
  const requestOptions = {
    method: "GET",
  };
  return Request(`${topicUrl}/${id}`, requestOptions)
    .then(handleResponse)
    .then(resp => {
      console.log(resp);
      return resp;
    });
}

function addTopic(topicToAdd) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(topicToAdd)
  };
  return Request(`${topicUrl}`, requestOptions)
    .then(handleResponse)
    .then(resp => {
      return resp;
    });
}
function addMessage(messageToAdd, topicId) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(messageToAdd)
  };
  return Request(`${topicUrl}/${topicId}/message`, requestOptions)
    .then(handleResponse)
    .then(resp => {
      return resp;
    });
}
function addReply(replyToAdd, messageId) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(replyToAdd)
  };
  return Request(`${messageUrl}/${messageId}/reply`, requestOptions)
    .then(handleResponse)
    .then(resp => {
      return resp;
    });
}

function handleResponse(response) {

  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}