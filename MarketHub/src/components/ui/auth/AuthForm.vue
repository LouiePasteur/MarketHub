<template>
  <div>
    <h1>
      <span class="app_name">Market</span><span class="app_name app_name--highlight">Hub</span>
    </h1>
    <p class="app_subtitle">Your trusted marketplace for all your shopping needs</p>
    <div class="login_container" v-if="login">
      <base-form @submit.prevent="submitForm">
        <h2>{{ login ? 'Login' : 'Register' }}</h2>
        <p>
          {{
            login ? 'Welcome back! Please enter your details.' : 'Create an account to get started.'
          }}
        </p>
        <auth-error v-if="error" :errorMessage="errorMessage"></auth-error>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            ref="loginEmail"
            :class="{ error: issueLocation === 'email' }"
            required
            v-model="email"
            @input="onFieldChange"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            ref="loginPassword"
            :class="{ error: issueLocation === 'password' }"
            required
            v-model="password"
            @input="onFieldChange"
          />
        </div>
        <div class="form-group form-group--button">
          <base-button class="button button-primary" type="submit">Login</base-button>
        </div>
        <div class="form-group form-group--links">
          <a href="/forgot-password">Forgot password?</a>
          <p @click="toggleLoginForm">Don't have an account? Sign up</p>
        </div>
        <div class="form-group">
          <base-button class="button button-secondary" type="button" @click="googleLogin"
            >Login with Google</base-button
          >
          <base-button class="button button-secondary" type="button" @click="facebookLogin"
            >Login with Facebook</base-button
          >
        </div>
      </base-form>
    </div>
    <div class="login_container" v-else>
      <base-form @submit.prevent="submitForm">
        <h2>{{ login ? 'Login' : 'Register' }}</h2>
        <p>
          {{
            login ? 'Welcome back! Please enter your details.' : 'Create an account to get started.'
          }}
        </p>
        <auth-error v-if="error" :errorMessage="errorMessage"></auth-error>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            ref="signupEmail"
            :class="{ error: issueLocation === 'email' }"
            required
            v-model="email"
            @input="onFieldChange"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            ref="signupPassword"
            :class="{ error: issueLocation === 'password' }"
            required
            v-model="password"
            @input="onFieldChange"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            ref="signupConfirmPassword"
            required
            v-model="confirmPassword"
            @input="onFieldChange"
          />
        </div>
        <div class="form-group form-group--button">
          <base-button class="button button-primary" type="submit" :disabled="submitting">
            {{ submitting ? 'Registering…' : 'Register' }}
          </base-button>
        </div>
      </base-form>
    </div>
  </div>
</template>

<script>
import baseForm from '@/components/ui/BaseForm.vue'
import authError from '@/components/ui/auth/AuthError.vue'
export default {
  components: {
    baseForm,
    authError,
  },
  props: {
    login: {
      type: Boolean,
      default: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    issueLocation: {
      type: String,
      default: '',
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  watch: {
    issueLocation(newVal) {
      if (!newVal) return

      this.password = ''
      this.confirmPassword = ''

      this.$nextTick(() => {
        if (this.login) {
          if (newVal === 'email' && this.$refs.loginEmail) {
            this.$refs.loginEmail.focus()
          } else if (newVal === 'password' && this.$refs.loginPassword) {
            this.$refs.loginPassword.focus()
          }
          return
        }

        if (newVal === 'email' && this.$refs.signupEmail) {
          this.$refs.signupEmail.focus()
        } else if (newVal === 'password' && this.$refs.signupPassword) {
          this.$refs.signupPassword.focus()
        }
      })
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        login: this.login,
      })
    },
    onFieldChange() {
      this.$emit('clear-error')
    },
    toggleLoginForm() {
      this.$emit('toggle-form')
    },
  },
}
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 0 !important;
}

.app_name {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  background-color: var(--primary);
  border-radius: var(--radius-lg);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0 1rem;

  &--highlight {
    color: var(--primary);
    background-color: #fff;
    border-radius: var(--radius-lg);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.app_subtitle {
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
  margin-bottom: 1rem;
}

.error {
  border: 2px solid var(--error);
  border-radius: var(--radius-lg);
  padding: 0.5rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border: 2px solid var(--error);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;

  & label {
    text-align: left;
    font-weight: 700;
  }

  & input {
    padding: 0.5rem;
    border-radius: var(--radius-lg);
  }

  &--links {
    margin-top: 1rem;
  }
}

.login_container {
  & h2 {
    font-size: 1.75rem;
    color: var(--primary);
  }

  & p {
    font-size: 1rem;
  }
}
</style>
