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
        <div class="form-group social-login-group">
          <base-button class="button-google" type="button" @click="googleLogin">
            <span class="google-icon-wrapper">
              <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                <path
                  fill="#EA4335"
                  d="M9 7.2v3.12h4.35c-.18 1.02-.78 1.89-1.65 2.46l2.67 2.07C15.54 13.62 16.2 11.52 16.2 9c0-.54-.06-1.08-.15-1.59H9z"
                />
                <path
                  fill="#34A853"
                  d="M5.01 10.71 4.41 11.16 2.25 12.84C3.42 15.09 5.97 16.8 9 16.8c2.43 0 4.47-.81 5.97-2.19l-2.67-2.07c-.72.48-1.65.78-3.3.78-2.52 0-4.65-1.71-5.4-4.05z"
                />
                <path
                  fill="#4A90E2"
                  d="M2.25 5.16C1.65 6.39 1.65 7.74 2.25 9l2.76-2.13c-.3-.9-.3-1.86 0-2.76z"
                />
                <path
                  fill="#FBBC05"
                  d="M9 3.18c1.32 0 2.49.45 3.42 1.35l2.55-2.55C13.47.96 11.43.2 9 .2 5.97.2 3.42 1.91 2.25 4.16l2.76 2.13C5.7 4.89 7.83 3.18 9 3.18z"
                />
              </svg>
            </span>
            <span class="social-button-text">Sign in with Google</span>
          </base-button>
          <base-button class="button-facebook" type="button" @click="facebookLogin">
            <span class="facebook-icon-wrapper">
              <svg class="facebook-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M22 12.07C22 6.503 17.523 2 12 2S2 6.503 2 12.07C2 17.08 5.657 21.245 10.438 22v-7.02H8.078v-2.91h2.36V9.845c0-2.33 1.388-3.62 3.513-3.62.994 0 2.034.177 2.034.177v2.26h-1.146c-1.13 0-1.482.705-1.482 1.428v1.72h2.52l-.403 2.91h-2.117V22C18.343 21.245 22 17.08 22 12.07Z"
                />
                <path
                  fill="#ffffff"
                  d="M16.937 14.98 17.34 12.07h-2.52v-1.72c0-.723.353-1.428 1.482-1.428h1.146v-2.26S16.388 6.48 15.394 6.48c-2.125 0-3.513 1.29-3.513 3.62v2.225h-2.36v2.91h2.36V22h2.843v-7.02h2.117Z"
                />
              </svg>
            </span>
            <span class="social-button-text">Login with Facebook</span>
          </base-button>
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
    login() {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
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
    googleLogin() {
      // Emit event so parent component can handle the actual Google auth flow
      this.$emit('google-login')
    },
    facebookLogin() {
      // Emit event so parent component can handle the actual Facebook auth flow
      this.$emit('facebook-login')
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

.social-login-group {
  margin-top: 0.5rem;
  gap: 0.75rem;
}

.google-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-right: 12px;
}

.google-icon {
  width: 18px;
  height: 18px;
  display: block;
}

.social-button-text {
  font-size: 14px;
}

.facebook-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 0;
  background-color: transparent;
  margin-right: 12px;
}

.facebook-icon {
  width: 30px;
  height: 30px;
  display: block;
}
</style>
