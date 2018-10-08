import types from "../actionTypes/contentTypes";
import { service } from "../../service/service";
import { history } from "../../helpers/history";

const _getTopics = () => ({
  type: types.TOPIC_REQUEST
});
const _getTopicsSuccess = (data) => ({
  type: types.TOPIC_SUCCESS,
  payload: data
});
const _getTopicsRejected = (error) => ({
  type: types.TOPIC_FAILURE,
  error
});
export const getTopics = () => (dispatch) => {

  dispatch(_getTopics());

  return service.getTopics()
    .then(
      resp => {
        console.log(resp);
        dispatch(_getTopicsSuccess(resp.topics));
        history.push("/chat");
        return resp;
      }
    )
    .catch(err => {
      dispatch(_getTopicsRejected(err));
      return Promise.reject(err);
    });

};
const _addTopic = () => ({
  type: types.TOPIC_REQUEST
});
const _addTopicSuccess = (data) => ({
  type: types.ADD_TOPIC_SUCCESS,
  payload: data
});
const _addTopicRejected = (error) => ({
  type: types.TOPIC_FAILURE,
  error
});
export const addTopic = (topicToAdd) => (dispatch) => {

  dispatch(_addTopic());

  return service.addTopic(topicToAdd)
    .then(
      resp => {
        console.log(resp);
        dispatch(_addTopicSuccess(resp.topic));
        return resp;
      }
    )
    .catch(err => {
      dispatch(_addTopicRejected(err));
      return Promise.reject(err);
    });

};
const _getTopicById = () => ({
  type: types.TOPIC_REQUEST
});
const _getTopicByIdSuccess = (data) => ({
  type: types.TOPIC_BY_ID_SUCCESS,
  payload: data
});
const _getTopicByIdRejected = (error) => ({
  type: types.TOPIC_FAILURE,
  error
});
export const getTopicById = id => (dispatch) => {

  dispatch(_getTopicById());

  return service.getTopicById(id)
    .then(
      resp => {
        console.log(resp);
        dispatch(_getTopicByIdSuccess(resp.topic));
        history.push("/chat");
        return resp;
      }
    )
    .catch(err => {
      dispatch(_getTopicByIdRejected(err));
      return Promise.reject(err);
    });

};
const _addMessage = () => ({
  type: types.MESSAGE_REQUEST
});
const _addMessageSuccess = (data) => ({
  type: types.ADD_MESSAGE_SUCCESS,
  payload: data
});
const _addMessageRejected = (error) => ({
  type: types.MESSAGE_FAILURE,
  error
});
export const addMessage = (messageToAdd, topicId) => (dispatch) => {

  dispatch(_addMessage());

  return service.addMessage(messageToAdd, topicId)
    .then(
      resp => {
        console.log(resp);
        dispatch(_addMessageSuccess(resp.message));
        return resp;
      }
    )
    .catch(err => {
      dispatch(_addMessageRejected(err));
      return Promise.reject(err);
    });

};
const _addReply = () => ({
  type: types.REPLY_REQUEST
});
const _addReplySuccess = (data) => ({
  type: types.ADD_REPLY_SUCCESS,
  payload: data
});
const _addReplyRejected = (error) => ({
  type: types.REPLY_FAILURE,
  error
});
export const addReply = (messageToAdd, messageId) => (dispatch) => {

  dispatch(_addReply());

  return service.addReply(messageToAdd, messageId)
    .then(
      resp => {
        console.log(resp);
        dispatch(_addReplySuccess(resp.reply));
        return resp;
      }
    )
    .catch(err => {
      dispatch(_addReplyRejected(err));
      return Promise.reject(err);
    });

};

// prefixed function name with underscore because delete is a reserved word in javascript
