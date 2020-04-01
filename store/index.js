export const state = () => ({
  answers: {
    date_area: null,
    date_budget: null,
    date_time: null,
    date_type: null
  }
})

export const actions = {}

export const mutations = {
  UPDATE_ANSWERS(state, value) {
    state.answers.date_area = value.date_area
    state.answers.date_budget = value.date_budget
    state.answers.date_time = value.date_time
    state.answers.date_type = value.date_type
  }
}

export const getters = {
  qParams(state) {
    return `/v1/date-suggest?date_area=${state.answers.date_area}&date_budget=${state.answers.date_budget}&date_time=${state.answers.date_time}&date_type=${state.answers.date_type}`
  }
}
