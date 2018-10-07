import contentConstants from "../actionTypes/contentTypes";
const initialState = {
  fetchingTopics: false,
  topics: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case contentConstants.TOPIC_REQUEST:
      return {
        ...state,
        fetchingTopics: true
      };
    case contentConstants.ADD_TOPIC_SUCCESS:
      return {
        ...state,
        fetchingTopics: false,
        topics: [...state.topics, action.payload]
      };
    case contentConstants.TOPIC_SUCCESS:
      return {
        ...state,
        fetchingTopics: false,
        topics: action.payload
      };
    case contentConstants.TOPIC_FAILURE:
      return {
        ...state,
        fetchingMessages: false,

      };
    case contentConstants.MESSAGE_REQUEST:
      return {
        ...state,
        fetchingMessages: true
      };
    case contentConstants.MESSAGE_SUCCESS:
      return {
        ...state,
        fetchingMessages: false,
        messages: action.payload
      };
    case contentConstants.MESSAGE_FAILURE:
      return {
        ...state,
        fetchingMessages: false,

      };
    case contentConstants.REPLY_REQUEST:
      return {
        ...state,
        fetchingReplies: true
      };
    case contentConstants.REPLY_SUCCESS:
      return {
        ...state,
        fetchingReplies: false,
        replies: action.payload
      };
    case contentConstants.REPLY_FAILURE:
      return {
        ...state,
        fetchingReplies: false,

      };
    default:
      return state;
  }
};