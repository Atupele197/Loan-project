import { reactive, readonly } from 'vue'
import type { AuthState } from './types/auth_state'
import type { User } from './types/user'

const state = reactive<AuthState>({
  user: null,
  accessToken: null,
  refleshToken: null,
})

function setUser(user: User, accessToken: string, refleshToken: string) {
  state.user = user
  state.accessToken = accessToken
  state.refleshToken = refleshToken
}

function clearUser() {
  state.user = null
  state.accessToken = null
  state.refleshToken = null
}

export default {
  state: readonly(state),
  setUser,
  clearUser,
}
