<script setup lang="ts">
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import 'primeicons/primeicons.css'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { User } from '@/types/user'
import store from '@/store'
import { useToast } from 'primevue/usetoast'
const username = ref('')
const password = ref('')

interface LoginResponse {
  user: User
  access_token: string
  reflesh_token: string
}

const isLoginDisabled = computed(() => !username.value || !password.value)
const errorMessage = ref<string>('')
const toast = useToast()

const handleLogin = async () => {
  try {
    const response = await axios.post<LoginResponse>('', {
      username: username.value,
      password: password.value,
    })
    store.setUser(
      response.data.user,
      response.data.access_token,
      response.data.reflesh_token,
    )
    toast.add({
      severity: 'success',
      summary: 'Hello $(response.data.user.full_name)',
      detail: 'You have succesfully logged in',
      life: 3000,
    })
  } catch (error: any) {
    if (error.response && error.response.status == 404) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'An error has occured. please try again later'
    }
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: errorMessage.value,
      life: 3000,
    })
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="">
      <div class="flex flex-column row-gap-5">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>

          <FloatLabel>
            <InputText id="username" v-model="username" />
            <label for="username">Username</label>
          </FloatLabel>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <FloatLabel>
            <InputText type="password" id="password" v-model="password" />
            <label for="username">Password</label>
          </FloatLabel>
        </InputGroup>
        <Button
          type="submit"
          label="Login"
          :disabled="isLoginDisabled"
          @click="handleLogin"
        />
      </div>
    </form>
  </div>
</template>
