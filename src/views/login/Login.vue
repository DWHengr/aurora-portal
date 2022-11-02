<template>
  <div class="login-container">
    <div class="w-500px flex justify-center">
      <div class="card">
        <div class="login">
          <h2>
            <img
              class="w-30px inline-block mr-1 pointer-events-none text-red-600"
              src="@/assets/logo.png"
              alt=""
            />用户登录</h2
          >
          <div class="login_box">
            <input type="text" v-model="username" required /><label
              :style="{
                color: IsUsernameTitleColor,
              }"
              >{{ usernameTitle }}</label
            >
          </div>
          <div class="login_box">
            <input type="password" v-model="password" required /><label
              :style="{
                color: IsPasswordTitleColor,
              }"
              >{{ passwordTitle }}</label
            >
          </div>
          <a @click="onLogin">
            登录
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </div>
      <div class="title">Aurora</div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import loginapi from '@/api/login.js';
  import { useLoadingBar, useMessage } from 'naive-ui';
  export default defineComponent({
    name: 'Login',
    setup() {
      if (!window.$message) window.$message = useMessage();
      const router = useRouter();
      let username = ref('');
      let password = ref('');
      let usernameTitle = ref('用户名');
      let passwordTitle = ref('密码');
      let IsUsernameTitleColor = ref('#fff');
      let IsPasswordTitleColor = ref('#fff');
      const loadingBar = useLoadingBar();

      watch(username, () => {
        verifyUsername();
      });
      watch(password, () => {
        verifyPassword();
      });

      const verifyUsername = () => {
        if (username.value.length <= 0) {
          usernameTitle.value = '请输入用户名';
          IsUsernameTitleColor.value = '#47ebae';
        } else {
          usernameTitle.value = '用户名';
          IsUsernameTitleColor.value = '#fff';
        }
      };

      const verifyPassword = () => {
        if (password.value.length <= 0) {
          passwordTitle.value = '请输入密码';
          IsPasswordTitleColor.value = '#47ebae';
        } else {
          passwordTitle.value = '密码';
          IsPasswordTitleColor.value = '#fff';
        }
      };

      const onLogin = () => {
        if (username.value.length > 0 && password.value.length > 0) {
          // loadingBar.start();
          loginapi.login({ username: username.value, password: password.value }).then((res) => {
            // loadingBar.finish();
            if (res.code == 0) {
              sessionStorage.setItem('Aurora-Token', res.data);
              router.push({ path: '/alert/rule' });
            }
          });
        } else {
          verifyPassword();
          verifyUsername();
        }
      };
      return {
        onLogin,
        username,
        password,
        usernameTitle,
        passwordTitle,
        IsUsernameTitleColor,
        IsPasswordTitleColor,
      };
    },
  });
</script>

<style>
  .login-container {
    position: relative;
    min-width: 100vh;
    width: 100%;
    height: 100vh;
    background-color: #121321;
    background: linear-gradient(135deg, #001224, #110011);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .red {
    color: red;
  }

  .login-container::before {
    content: '';
    position: absolute;
    height: 240px;
    width: 240px;
    transform: translate(-180px, -80px);
    border-radius: 50%;
    background: linear-gradient(90deg, #1545b7, #f3f5f5);
    box-shadow: #1545b7 0 0 200px 1px;
  }

  .login-container::after {
    content: '';
    position: absolute;
    height: 240px;
    width: 240px;
    transform: translate(180px, 80px);
    border-radius: 50%;
    background: linear-gradient(90deg, #f3f5f5, #9c27b0);
    box-shadow: #9c27b0 0 0 200px 1px;
  }

  .title {
    position: absolute;
    font-size: 180px;
    font-weight: 700px;
    color: rgba(255, 255, 255);
    transform: translate(0px, -310px);
    z-index: 999;
    user-select: none;
  }

  .title:hover::before {
    color: #1545b7;
    filter: blur(20px);
  }

  .title::before {
    content: 'Aurora';
    position: absolute;
    color: #9c27b0;
    z-index: -1;
    filter: blur(12px);
  }

  .card {
    position: relative;
    height: 300px;
    width: 500px;
    z-index: 100;
    border-radius: 25px;
    backdrop-filter: blur(60px);
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 50px rgba(40, 40, 40, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .card:hover + .title::before {
    color: #1545b7;
    filter: blur(20px);
  }

  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 40px;
  }
  .login h2 {
    font-size: 23px;
    color: #fff;
    margin-bottom: 20px;
    user-select: none;
  }
  .login .login_box {
    position: relative;
    width: 100%;
  }
  .login .login_box input {
    --tw-ring-color: none;
    outline: none;
    border: none;
    width: 100%;
    padding: 0 0 0 2px;
    margin-bottom: 30px;
    color: #fff;
    font-size: 16px;
    border-bottom: 1px solid #fff;
    background-color: transparent;
  }
  .login .login_box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: all 0.5s;
    user-select: none;
  }
  .login .login_box input:focus + label,
  .login .login_box input:valid + label {
    top: -18px;
    color: #fff;
    font-size: 12px;
  }
  .login a {
    overflow: hidden;
    position: relative;
    padding: 10px 35px;
    font-size: 16px;
    color: #47ebae;
    text-decoration: none;
    transition: all 0.5s;
    user-select: none;
  }
  .login a:hover {
    color: #fff;
    font-weight: 500;
    border-radius: 5px;
    background-color: rgba(71, 235, 174, 0.9);
    box-shadow: 0 0 5px #47ebae, 0 0 25px #47ebae, 0 0 50px #47ebae, 0 0 100px #47ebae;
  }
  .login a span {
    position: absolute;
  }
  .login a span:first-child {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, #47ebae);
    animation: move1 2s linear infinite;
  }
  .login a span:nth-child(2) {
    right: 0;
    top: -100%;
    width: 3px;
    height: 100%;
    background: linear-gradient(transparent, #47ebae);
    animation: move2 2s linear 0.5s infinite;
  }
  .login a span:nth-child(3) {
    right: -100%;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to left, transparent, #47ebae);
    animation: move3 2s linear 1s infinite;
  }
  .login a span:last-child {
    left: 0;
    bottom: -100%;
    width: 3px;
    height: 100%;
    background: linear-gradient(#47ebae, transparent);
    animation: move4 2s linear 1.5s infinite;
  }

  @keyframes move1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }
  @keyframes move2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }
  @keyframes move3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }
  @keyframes move4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
</style>
