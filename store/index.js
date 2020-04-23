export const state = () => ({
  answers: {
    date_area: null,
    date_budget: null,
    date_time: null,
    date_type: null
  },
  login: {
    id: '',
    dateToken: '',
    email: 'null'
  }
})

export const actions = {}

export const mutations = {
  UPDATE_ANSWERS(state, value) {
    state.answers.date_area = value.date_area
    state.answers.date_budget = value.date_budget
    state.answers.date_time = value.date_time
    state.answers.date_type = value.date_type
  },
  UPDATE_LOGIN(state, value) {
    state.login.id = value.id
    state.login.dateToken = value.dateToken
    state.login.email = value.email
  },
  UPDATE_LOGIN_ID(state, value) {
    state.login.id = value.id
  }
}

export const getters = {
  qParams(state) {
    return `date_area=${state.answers.date_area}&date_budget=${state.answers.date_budget}&date_time=${state.answers.date_time}&date_type=${state.answers.date_type}`
  },
  loginState(state) {
    return state.login
  }
}
