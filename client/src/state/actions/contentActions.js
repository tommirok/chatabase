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

// prefixed function name with underscore because delete is a reserved word in javascript
