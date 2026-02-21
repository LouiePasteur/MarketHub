<template>
<div>
  <div class="login_container" v-if="login">
    <base-form @submit.prevent="submitForm">
    <base-card>
      <h2>{{ login ? 'Login' : 'Register' }}</h2>
      <p>{{ login ? 'Welcome back! Please enter your details.' : 'Create an account to get started.' }}</p>
      <auth-error v-if="error" :errorMessage="errorMessage"></auth-error>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" required v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" required v-model="password" />
      </div>
      <div class="form-group form-group--button">
        <base-button class="button button-primary" type="submit">Login</base-button>
      </div>
    </base-card>
      <div class="form-group form-group--links">
        <a href="/forgot-password">Forgot password?</a>
        <p href="/signup">Don't have an account? Sign up</p>
      </div>
      <div class="form-group">
        <base-button class="button button-secondary" type="button" @click="googleLogin">Login with Google</base-button>
        <base-button class="button button-secondary" type="button" @click="facebookLogin">Login with Facebook</base-button>
      </div>
    </base-form>
  </div>
  <div class="register" v-else>
    <base-form @submit.prevent="submitForm">
      <base-card>
      <h2>{{ login ? 'Login' : 'Register' }}</h2>
      <p>{{ login ? 'Welcome back! Please enter your details.' : 'Create an account to get started.' }}</p>
      <auth-error v-if="error" :errorMessage="errorMessage"></auth-error>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required v-model="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" required v-model="password" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" required v-model="confirmPassword" />
        </div>
        <div class="form-group form-group--button">
          <base-button class="button button-primary" type="submit" :disabled="submitting">
          {{ submitting ? 'Registering…' : 'Register' }}
        </base-button>
        </div>
      </base-card>
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
  methods: {
    submitForm() {
      this.$emit('submit', { 
        email: this.email, 
        password: this.password,
        confirmPassword: this.confirmPassword
      })
    },
  }
}
</script>


<style scoped lang="scss">
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
</style>