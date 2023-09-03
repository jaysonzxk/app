<template>
  <view class="login">
    <view class="header">
      <view class="back" @click="goBack"></view>
      <view class="title">
        手机号登录/注册
      </view>
    </view>
    <view class="body">
      <view class="body-top">
        <u--input v-model="mobile" placeholder="请输入手机号" border="bottom" type="number" class="username">
<!--          <u&#45;&#45;text-->
<!--              text="+86"-->
<!--              slot="prefix"-->
<!--              margin="0 8px 0 0"-->
<!--              type="tips"-->
<!--          ></u&#45;&#45;text>-->
        </u--input>
        <view class="reg-code">
<!--          <u&#45;&#45;input v-model="password" placeholder="请输短信验证码" border="bottom" type="number" class="code">-->
<!--          </u&#45;&#45;input>-->
          <u-code-input v-model="code" :maxlength="4" :space="20" ></u-code-input>
          <span v-show="codeShow" class="get-code" @click="getCode(mobile)">获取验证码</span>
          <span v-show="!codeShow" class="count">({{ count }})重新获取</span>
        </view>
      </view>
      <!--      <view class="body-middle">-->
      <!--        <view class="remember"></view>-->
      <!--        <view class="other">-->
      <!--          <view @click="changeLogin" v-show="isCode">切换验证码登录</view>-->
      <!--          <view @click="changeLogin" v-show="!isCode">切换密码登录</view>-->
      <!--          <view class="other1">-->
      <!--            <span class="forget">找回密码</span>-->
      <!--            <span @click="goRegister">注册账号</span>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <view class="body-btn">
        <view class="login-btn" @click="userLogin">登录</view>
        <view class="tips">登录即代表已阅读并同意 <span style="color: rgb(249, 213, 85);">《用户协议》</span> <span
            style="color: rgb(249, 213, 85);">《隐私协议》</span></view>
      </view>
    </view>
  </view>
</template>

<script>
import {getMobileCode} from '@/common/api'
export default {
  data() {
    return {
      tips: '',
      show: true,
      codeShow: true,
      isCode: true,
      count: '',
      timer: null,
      mobile: '',
      password: '',
      loginType: 1,
      code: ''

    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    codeChange(text) {
      this.tips = text;
    },
    // getCode() {
    //   if (this.$refs.uCode.canGetCode) {
    //     // 模拟向后端请求验证码
    //     uni.showLoading({
    //       title: '正在获取验证码'
    //     })
    //     setTimeout(() => {
    //       uni.hideLoading();
    //       // 这里此提示会被this.start()方法中的提示覆盖
    //       uni.$u.toast('验证码已发送');
    //       // 通知验证码组件内部开始倒计时
    //       this.$refs.uCode.start();
    //     }, 2000);
    //   } else {
    //     uni.$u.toast('倒计时结束后再发送');
    //   }
    // },
    change(e) {
      console.log('change', e);
    },
    changeLogin() {
      this.show = !this.show
      this.isCode = !this.isCode
    },
    goRegister() {
      uni.navigateTo({
        url: '/pages/center/register'
      })
    },
    async getCode(val) {

      const TIME_COUNT = 60
      const phoneReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      if (phoneReg.test(val) === false) {
        uni.$u.toast('手机号格式错误')
        return
      }
      if (this.mobile === '') {
        uni.$u.toast('手机号不能为空')
      } else {
        if (!this.timer) {
          const query = {mobile: val}
          let res = await getMobileCode(query)
          if (res.code === 2000) {
            this.code = res.data.code
          }else {
            uni.$u.toast(''+res.msg)
            return
          }
          this.count = TIME_COUNT
          this.codeShow = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.codeShow = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
          uni.$u.toast('验证码已发送');
        }
      }
    },
    async userLogin() {
      const loginForm = {mobile: this.mobile, code: this.code}
      await this.$store.dispatch('user/Login', loginForm);
      await this.$store.dispatch('user/GetUserInfo', {});
      // uni.showLoading({
      // 	title: '数据加载中...'
      // });
      // this.tabIndex = 0;
      // if (this.categorys.length == 1) {
      //   await this.$store.dispatch('category/GetCategory');
      //   this.tabs = this.categorys;
      // }
      // await this.$store.dispatch('banner/GetBanner');
      // await this.$store.dispatch('activity/GetActivity', {});
      // await this.$store.dispatch('good/InitGoods', this.tabs);
      // await this.$store.dispatch('good/GetGoods', {
      //   cid: 0,
      //   page: 1
      // });
      // this.gotTop();
      // // console.log(this.tabs)
      // uni.hideLoading();
    },
  }
}
</script>

<style>
.header {
  margin-top: 70px;
  margin-left: 20px;
}

.back {
  background: url("./images/public_back_black.png") no-repeat;
  background-size: 50%;
  height: 25px;
  width: 25px;
  margin-bottom: 20px;
}

.reg-code {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  justify-content: space-between;
  margin-left: calc(10% / 2);
  margin-right: calc(10% / 2);
}

.get-code {
  color: rgb(249, 213, 85);
}

.count {
  color: red;
}

.title {
  font-weight: 700;
  font-size: 24px;
}

.body {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.username {
  margin-left: calc(10% / 2);
  margin-right: calc(10% / 2);
}

.login-btn {
  background: rgb(249, 213, 85);
  border-radius: 20px;
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 16px;
}

.body-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}

.tips {
  font-size: 12px;
  margin-top: 20px;
}
</style>
