<template>
  <view class="login">
    <view class="header">
      <view class="back" @click="goBack"></view>
      <view class="title">
        欢 迎 登 陆 !
      </view>
      <view class="tip">
        请用手机号密码登陆
      </view>
    </view>
    <view class="body">
      <view class="body-top">
        <input v-model="mobile" placeholder="请输入手机号" type="text" class="username" />
        <input v-show="show" v-model="password" placeholder="请输入密码" type="password" class="pwd" />
        <view class="reg-code" v-show="!show">
          <input placeholder="请输短信验证码" class="code"/>
          <span v-show="codeShow" class="get-code" @click="getCode(mobile)">获取验证码</span>
          <span v-show="!codeShow" class="count">{{ count }}秒</span>
        </view>
      </view>
      <view class="body-middle">
        <view class="remember"></view>
        <view class="other">
          <view @click="changeLogin" v-show="isCode">切换验证码登录</view>
          <view @click="changeLogin" v-show="!isCode">切换密码登录</view>
          <view class="other1">
            <span class="forget">找回密码</span>
            <span @click="goRegister">注册账号</span>
          </view>
        </view>
      </view>
      <view class="body-btn">
        <view class="login-btn" @click="userLogin">登 录</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
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
    goBack(){
      uni.navigateBack({
        delta: 1
      })
    },
    changeLogin(){
      this.show = !this.show
      this.isCode = !this.isCode
    },
    goRegister(){
      uni.navigateTo({
        url: '/pages/center/register'
      })
    },
    getCode(val) {
      const TIME_COUNT = 60
      if (this.mobile === undefined) {
        uni.showToast({
          icon: 'none',
          title: "请输入正确手机号",
          duration: 2000
        })
      } else {
        if (!this.timer) {
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
        }
      }
    },
    async userLogin() {
      const loginForm = {username: this.mobile, password: this.password}
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
.login{
  /*height: 100%;*/
}
.header{
  margin-top: 70px;
  margin-left: 20px;
}
.back{
  background: url("./images/public_back_black.png") no-repeat;
  background-size: 50%;
  height: 25px;
  width: 25px;
  margin-bottom: 20px;
}
.reg-code {
  display: flex;
  flex-direction: row;
}
.get-code {
  position: absolute;
  right: 30px;
  margin-top: 33px;
}

.count {
  position: absolute;
  right: 30px;
  margin-top: 33px;
  color: red;
}
.code {
  background: #fff;
  border-radius: 20px;
  height: 50px;
  width: 90%;
  margin-left: calc(5% / 2);
  margin-top: 20px;
  padding-left: 20px;
}
.title{
  font-weight: 700;
  font-size: 24px;
  /*padding-top: 16px;*/
  /*margin-bottom: 10px;*/
  /*margin-left: 20px;*/
  /*font-weight: 550;*/
}
.tip{
  font-size: 16px;
  color: #999;
}
.body{
  display: flex;
  flex-direction: column;
  margin-top: 40px;

}
.username {
  /*height: 100%;*/
  padding-left: 20px;
  background: #fff;
  border-radius: 20px;
  height: 50px;
  width: 90%;
  margin-left: calc(5% / 2);

}
.pwd{
  background: #fff;
  border-radius: 20px;
  height: 50px;
  width: 90%;
  margin-left: calc(5% / 2);
  margin-top: 20px;
  padding-left: 20px;
}
.body-middle{
  display: flex;
  justify-content: space-between;
  /*width: 90%;*/
  margin: 30px calc(10% / 2) 0 calc(10% / 2) ;

}
.other{
  /*margin-right: 10px;*/
}
.other1{
  color: #3ab54a;
  display: flex;
}
.forget::after{
  content: '';
  background: #3ab54a;
  height: 10px;
  line-height: 10px;
  width: 2px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;

}
.login-btn{
  background: #3ab54a;
  border-radius: 20px;
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-left: calc(10% / 2);
  margin-top: 40px;
  /*justify-items: center;*/
}
</style>
