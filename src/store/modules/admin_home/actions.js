import { apiPost } from "../../../services/api_connector/ApiConnector";

import {
  BEGIN_CLASS_LEVEL_CREATION,
  BEGIN_CLASS_STREAM_CREATION,
  CLASS_LEVEL_CREATED_SUCCESSFULLY,
  CLASS_LEVEL_CREATION_FAILED,
  CLASS_STREAM_CREATED_SUCCESSFULLY,
  CLASS_STREAM_CREATION_FAILED,
  ERROR_OCCURED_WHILE_FETCHING_CLASS_LEVELS,
  ERROR_OCCURED_WHILE_FETCHING_CLASS_STREAMS,
  ERROR_OCCURRED_ON_CREATING_CLASS_LEVEL,
  ERROR_OCCURRED_ON_CREATING_CLASS_STREAM,
  FETCHING_CLASS_LEVELS_EMPTY_RESULT_SET,
  FETCHING_CLASS_LEVELS_SUCCESSFUL, FETCHING_CLASS_STREAMS_EMPTY_RESULT_SET,
  FETCHING_CLASS_STREAMS_SUCCESSFUL,
  RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED,
  RESET_CURRENT_CLASS_STREAM_CREATED,
  SETUP_CLASS_LEVEL_FORM,
  SETUP_CLASS_STREAM_FORM,
  START_FETCHING_CLASS_LEVELS,
  START_FETCHING_CLASS_STREAMS,
  TOGGLE_MODAL_DISPLAY
} from "./actionTypes";

export function toggleAdminModalDisplay(isAdminModalDisplayed) {
  return async dispatch => {
    dispatch({
      type: TOGGLE_MODAL_DISPLAY,
      payload: {
        isAdminModalDisplayed: isAdminModalDisplayed
      }
    });
  };
}

/* START - ACADEMIC CLASS LEVEL ***************************************************************************************/

export function createAcademicClassLevel(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_CLASS_LEVEL_CREATION
    });
    const apiRoute = "/add_academic_class_levels";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: CLASS_LEVEL_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: CLASS_LEVEL_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_CLASS_LEVEL
        });
        console.log(err);
      }
    );
  };
}

export function setupClassLevelForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_CLASS_LEVEL_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: true,
        modalTitle: "Class Configurations",
        isClassStreamFormDisplayed: false
      }
    });
  };
}

export function fetchAlllAcademicClassLevels(payload) {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_CLASS_LEVELS
    });
    const apiRoute = "/get_all_academic_class_levels";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_CLASS_LEVELS_SUCCESSFUL,
            payload: {
              allAcademicClassLevels: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_CLASS_LEVELS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_CLASS_LEVELS
        });
        console.log(err);
      }
    );
  };
}

export function resetCurrentAcademicClassLevelCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_ACADEMIC_CLASS_LEVEL_CREATED
    });
  };
}

/* END - ACADEMIC CLASS LEVEL ***************************************************************************************/

/* START - CLASS STREAMS ***************************************************************************************/
export function createClassStreams(payload) {
  return async dispatch => {
    dispatch({
      type: BEGIN_CLASS_STREAM_CREATION
    });
    const apiRoute = "/add_class_streams";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results.success) {
          dispatch({
            type: CLASS_STREAM_CREATED_SUCCESSFULLY
          });
        } else {
          dispatch({
            type: CLASS_STREAM_CREATION_FAILED
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURRED_ON_CREATING_CLASS_STREAM
        });
        console.log(err);
      }
    );
  };
}

export function fetchAllClassStreams(payload) {
  return async dispatch => {
    dispatch({
      type: START_FETCHING_CLASS_STREAMS
    });
    const apiRoute = "/get_all_class_streams";
    const returnedPromise = apiPost(payload, apiRoute);
    returnedPromise.then(
      function(result) {
        if (result.data.results && result.data.results.length > 0) {
          dispatch({
            type: FETCHING_CLASS_STREAMS_SUCCESSFUL,
            payload: {
              allClassStreams: result.data.results
            }
          });
        } else if (result.data.results && result.data.results.length === 0) {
          dispatch({
            type: FETCHING_CLASS_STREAMS_EMPTY_RESULT_SET
          });
        }
      },
      function(err) {
        dispatch({
          type: ERROR_OCCURED_WHILE_FETCHING_CLASS_STREAMS
        });
        console.log(err);
      }
    );
  };
}

export function resetCurrentClassStreamCreated() {
  return async dispatch => {
    dispatch({
      type: RESET_CURRENT_CLASS_STREAM_CREATED
    });
  };
}

export function setupClassStreamForm() {
  return async dispatch => {
    dispatch({
      type: SETUP_CLASS_STREAM_FORM,
      payload: {
        isAdminModalDisplayed: true,
        dialogHeight: "380",
        dialogWidth: "500",
        isAcademicClassLevelFormDisplayed: false,
        isClassStreamFormDisplayed: true,
        modalTitle: "Class Configurations"
      }
    });
  };
}
/* END - CLASS STREAMS *****************************************************************************************/
