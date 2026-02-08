<template>
<div>
  
  <div class="login_container">
    <span class="app_name">Market</span>
    <span class="app_name app_name--highlight">Hub</span>
    <p class="app_tagline">Your trusted marketplace for all your shopping needs</p>
    <base-form @submit.prevent="submitForm" v-if="login">
      <base-card >
        <h2 class="form_title">{{ formTitle }}</h2>
        <p class="form_subtitle">{{ formDescription }}</p>
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
        <a href="/signup">Don't have an account? Sign up</a>
      </div>
      <div class="form-group form-group--social">
        <button class="button button-google" type="button" @click="googleLogin">
          <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
        <button class="button button-facebook" type="button" @click="facebookLogin">
          <svg class="facebook-icon" viewBox="0 0 24 24" width="20" height="20" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Continue with Facebook</span>
        </button>
      </div>
      </base-form>
      <base-form @submit.prevent="submitForm" v-else>
      <base-card>
      <h2 class="form_title">{{ formTitle }}</h2>
      <p class="form_subtitle">{{ formDescription }}</p>
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
          <base-button class="button button-primary" type="submit">Create Account</base-button>
        </div>
      </base-card>
    </base-form>
    
  </div>
</div>
</template>

<script>
export default {
  props: {
    login: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    formTitle() {
      return this.login ? 'Login' : 'Register'
    },
    formDescription() {
      return this.login ? 'Welcome back! Please enter your details.' : 'Create an account to get started.'
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', { email: this.email, password: this.password })
    },
    googleLogin() {
      // TODO: Implement Google login
      console.log('Google login clicked')
    },
    facebookLogin() {
      // TODO: Implement Facebook login
      console.log('Facebook login clicked')
    },
  }
}
</script>


<style scoped lang="scss">

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

.app_tagline {
  font-size: 1.25rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 1rem;
}

.form_title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
}
.form_subtitle {
  font-size: 1rem;
  font-weight: 400;
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
    
    a {
      color: #1877F2;
      text-decoration: none;
      
      &:visited {
        color: #1877F2;
      }
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    p {
      color: #1877F2;
      font-size: 1rem;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  
  &--social {
    gap: 0.75rem;
    margin-top: 1rem;
  }
}

.button-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  background-color: #fff;
  color: #3c4043;
  border: 1px solid #dadce0;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    background-color: #f1f3f4;
  }
  
  .google-icon {
    flex-shrink: 0;
  }
  
  span {
    flex: 1;
    text-align: center;
  }
}

.button-facebook {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  background-color: #1877F2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #166FE5;
    box-shadow: 0 2px 4px rgba(24, 119, 242, 0.3);
  }
  
  &:active {
    background-color: #1460C7;
  }
  
  .facebook-icon {
    flex-shrink: 0;
  }
  
  span {
    flex: 1;
    text-align: center;
  }
}
</style>