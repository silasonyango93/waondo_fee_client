export const initialState = {
  isAdminModalDisplayed: false,
  dialogHeight: "380",
  dialogWidth: "500",
  isAcademicClassLevelFormDisplayed: false,
  modalTitle: "",
  allAcademicClassLevels: [],
  isCurrentClassLevelCreated: false,

  classStreams: {
    isCurrentClassStreamCreated: false,
    allClassStreams: [],
    isClassStreamFormDisplayed: false
  },

  termIterations: {
    allTermIterations: [],
    isTermIterationsFormDisplayed: false,
    isCurrentTermIterationCreated: false
  }
};
