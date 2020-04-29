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
  },

  weekIterations: {
    allWeekIterations: [],
    isWeekIterationsFormDisplayed: false,
    isCurrentWeekIterationCreated: false
  },

  actualTerms: {
    allActualTerms: [],
    isActualTermsFormDisplayed: false,
    isCurrentActualTermCreated: false
  },

  actualWeeks: {
    allYearsWeeks: [],
    isActualWeeksFormDisplayed: false,
    isCurrentActualWeekCreated: false
  },

  lotDescriptions: {
    allLotDescriptions: [],
    isLotDescriptionsFormDisplayed: false,
    isCurrentLotDescriptionCreated: false
  },

  actualLots: {
    allActualLots: [],
    isActualLotsFormDisplayed: false,
    isCurrentActualLotCreated: false
  },

  actualClasses: {
    allActualClasses: [],
    isActualClassesFormDisplayed: false,
    isCurrentActualClassCreated: false
  },

  userManagement: {
    isUserRegistrationFormDisplayed: false
  },

  feeComponents: {
    allFeeComponents: [],
    isFeeComponentFormDisplayed: false,
    isCurrentFeeComponentCreated: false
  }
};
