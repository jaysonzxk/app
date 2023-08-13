<template>
  <view class="login">
    <view class="header">
      <view class="back" @click="goBack"></view>
      <view class="title">
        注 册
      </view>
      <view class="tip">
        请用手机号密码注册
      </view>
    </view>
    <view class="body">
      <view class="body-top">
        <view class="mobile">
          <input v-model="mobile" placeholder="手机号" class="username"/>
        </view>
        <view class="reg-code">
          <input placeholder="请输短信验证码" class="code"/>
          <span v-show="show" class="get-code" @click="getCode(mobile)">获取验证码</span>
          <span v-show="!show" class="count">{{ count }}秒</span>
        </view>
        <input placeholder="请输入密码" type="password" class="pwd1"/>
        <input placeholder="请再次输入密码" type="password" class="pwd2"/>
      </view>
      <view class="body-btn">
        <view class="login-btn">注 册</view>
        <view class="tips">注册即代表已阅读并同意 <span style="color: rgb(0, 122, 255);">《用户协议》</span> <span
            style="color: rgb(0, 122, 255);">《隐私协议》</span></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      regCode: '获取验证码',
      mobile: undefined,
      show: true,
      count: '',
      timer: null
    }
  },
  methods: {
    goBack(){
      uni.navigateBack({
        delta:1
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
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    },
  }
}
</script>

<style>
.login {
  /*height: 100%;*/
}
.header {
  margin-top: 20px;
  margin-left: 20px;
}
.back{
  background: url("./images/public_back_black.png") no-repeat;
  background-size: 50%;
  height: 25px;
  width: 25px;
}

.title {
  font-weight: 700;
  font-size: 24px;
  /*padding-top: 16px;*/
  /*margin-bottom: 10px;*/
  /*margin-left: 20px;*/
  /*font-weight: 550;*/
}

.tip {
  font-size: 16px;
  color: #999;
}

.body {
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
  margin-left: calc(10% / 2);

}

.reg-code {
  display: flex;
  flex-direction: row;
}

/*.mobile{*/
/*  background: #fff;*/
/*  border-radius: 20px;*/
/*  height: 50px;*/
/*  width: 90%;*/
/*  margin-left: calc(10% / 2);*/
/*}*/
.code {
  background: #fff;
  border-radius: 20px;
  height: 50px;
  width: 90%;
  margin-left: calc(10% / 2);
  margin-top: 20px;
  padding-left: 20px;
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

.pwd1 {
  background: #fff;
  border-radius: 20px;
  height: 50px;
  width: 90%;
  margin-left: calc(10% / 2);
  margin-top: 20px;
  padding-left: 20px;
}

.pwd2 {
  background: #fff;
  border-radius: 20px;
  height: 50px;
  width: 90%;
  margin-left: calc(10% / 2);
  margin-top: 20px;
  padding-left: 20px;
}

.body-middle {
  display: flex;
  justify-content: space-between;
  /*width: 90%;*/
  margin: 30px calc(10% / 2) 0 calc(10% / 2);

}

.other {
  /*margin-right: 10px;*/
}

.other1 {
  color: #3ab54a;
  display: flex;
}

.forget::after {
  content: '';
  background: #3ab54a;
  height: 10px;
  line-height: 10px;
  width: 2px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;

}

.body-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tips {
  /*width: 90%;*/
  margin-top: 40px;
}

.login-btn {
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
  /*margin-left: calc(10% / 2);*/
  margin-top: 40px;
  /*justify-items: center;*/
}
</style>
