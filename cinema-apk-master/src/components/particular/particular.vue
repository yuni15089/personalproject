<template>
	<div class="user-login">
		<div class="login-retreat">
			<h3 v-if="!informationDataShow">登录</h3>
			<h3 v-if="informationDataShow">我的信息</h3>
		</div>
		<!-- 标题 end-->
		<div class="my-information" v-if="informationDataShow">
			<myinfo :data="finishData"></myinfo>
		</div>
		<div v-if="!informationDataShow">
			<div class="user-links">
				<div class="account-code" v-on:click="clickShowHideIphone">账号登录</div>
				<div class="verification-code" v-on:click="clickShowHide">手机验证登录</div>
				<div class="scroll-bar">
					<div class="bar"  :class="{barleft:showHideLogin,barright:showHideIphone}"></div>
				</div>
			</div>
			<!-- 登录方式end -->
			<div class="users-login-ver-code" v-show="showHideLogin">
				<div class="account-login">
					<div class="text-login">
						<input type="text" placeholder="账户名/手机号/Email" class="logins-input" v-model="inquireUsers">
					</div>
					<div class="password-login">
						<input type="text" class="passwords" placeholder="请输入您的密码" v-model="matchPassword">
					</div>
				</div>
				<div class="button-login" @click="loginStorage">
					<div class="uplogin">
						<p class="login-success">登录</p>
					</div>
				</div>
			</div>
			<!-- 普通登录end -->
			<div class="users-login-ver-code" v-show="showHideIphone">
				<div class="account-login">
					<div class="text-login">
						<input type="text" placeholder="请输入手机号" class="logins-input iphones-num">
						<div class="obtain">获取验证码</div>
					</div>
					<div class="password-login">
						<input type="text" class="passwords iphones-seat" placeholder="请输入短信验证码">
					</div>
				</div>
				<div class="button-login pass">
					<div class="uplogin">
						<p class="login-success">登录</p>
					</div>
				</div>
			</div>
			<!-- 手机登录end -->
			<div class="user-registered">
				<p>
					<router-link to="/particular/infor" class="link-to">立即注册</router-link>
				</p>
				<p>找回密码</p>
			</div>
			<!-- 登录问题end -->
			<p class="customer">© 豆瓣电影 客服电话：<span>400-670-5335</span></p>
			<div>
				<transition name="fade">
					<router-view name="infor"></router-view>
				</transition>
			</div>
			<!-- 注册组件 -->
			<div class="exist" v-if="doesExist">
				<div class="content-does-not">用户不存在</div>
			</div>
			<div class="exist" v-if="wrongPws">
				<div class="content-does-not">密码错误</div>
			</div>
			<div class="exist" v-if="loading">
				<div class="content-does-not"><p>登录成功</p>加载中...</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState, mapMutations}from 'vuex'
	import MyInfo from '../information/MyInfo'
	export default {
		name: 'particular',
		components: {
			'myinfo': MyInfo
		},
		data () {
			return {
				inquireUsers:'', // 用户名查询 
				matchPassword:'', // 用户输入的密码
				finishData:null,
				showHideLogin: true,
				showHideIphone: false,
				allShowAndHide: false,
				doesExist: false,
				wrongPws: false,
				loading:false,
				informationDataShow: false,
			}
		},
		computed: {
			...mapState(['usersData','logining']),
		},
		methods: {
			...mapMutations({logins:'LOGIN_ING_TRUE'}),
			//点击触发 切换 登录方式
			clickShowHide: function () {
				this.showHideLogin = false
				this.showHideIphone = true
			},
			//点击触发 切换 手机登录方式
			clickShowHideIphone: function () {
				this.showHideLogin = true
				this.showHideIphone = false
			},
			inquire: function (arr) {
				return arr.users == this.inquireUsers
			},
			//这是用store当做后台数据库来存用户数据 缺点 刷新一次 用户数据全无
			loginMatch: function () {
				console.log(this.usersData)
				//检查是否获取到用户数组
				var result = this.usersData.find(this.inquire)
				//将检查到的值 存入 result 里面
				if (result) {
					//要是用户存在
					let passwordToo = result.password
					//就获取数据库中的用户密码
					if (this.matchPassword == passwordToo) {
						//如果用户存在 判断 用户输入的密码是否与数据库里的密码匹配
						console.log('登录成功')
						this.loading = true
						setTimeout(()=>{
							this.loading = false
							this.informationDataShow = true
						},2000)
						this.finishData = {name:this.inquireUsers}
					} else {
						//否则 输出密码错误 
						//且 将 输入框的字符串清空
						console.log('密码错误')
						this.wrongPws = true
						setTimeout(()=>{
							this.wrongPws = false
						},2000)
					}
				} else {
					console.log('用户不存在')
					this.doesExist = true
					setTimeout(()=>{
						//异步 定时器 是window 所以调用setTime this指向全局
						//箭头函数 没有this空对象
						this.doesExist = false
						console.log(this)
					},2000)
				}
			},
			//这是用浏览器自带的 localStorage  存用户数据  缺点 容易暴露信息
			loginStorage: function () {
				var localStorage = window.localStorage
				if (localStorage[this.inquireUsers]) {
					console.log('用户名存在')
					if (localStorage[this.inquireUsers] == this.matchPassword) {
						console.log('密码正确')
					//如果用户存在 判断 用户输入的密码是否与数据库里的密码匹配
						console.log('登录成功')
						this.loading = true
						this.logins()
						setTimeout(()=>{
							this.loading = false
							this.informationDataShow = true
						},2000)
						this.finishData = {name:this.inquireUsers}	
					} else {
						//否则 输出密码错误 
						//且 将 输入框的字符串清空
						console.log('密码错误')
						this.wrongPws = true
						setTimeout(()=>{
							this.wrongPws = false
						},2000)
					}
				}else{
					console.log('用户不存在')
					this.doesExist = true
					setTimeout(()=>{
						//异步 定时器 是window 所以调用setTime this指向全局
						//箭头函数 没有this空对象
						this.doesExist = false
						console.log(this)
					},2000)
				}
			}
		}
	}
</script>
<style>
.yeah{
	width: 100px;
	height: 30px;
	background: #000;
}
	.user-login{
		width: 100%;
		height: 572px;
		background: #f8f8f8;
	}
	.user-login .login-retreat{
		position: absolute;
		top: 0px;
		background: #072;
		width: 100%;
		height: 40px;
	}
	.user-login .login-retreat .retreat-button{
		position: absolute;
		top: 0px;
		line-height: 40px;		
		width: 40px;
		height: 40px;
		text-align: center;
		color: #fff;
	}
	.user-login .login-retreat h3{
		line-height: 40px;
		text-align: center;
		color: #fff;
	}
	.user-login .user-links{
		background: #fff;
		position: relative;
		overflow: hidden;
		height: 40px;
		line-height:40px;

	}
	.user-login .user-links .scroll-bar{
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 4px;
		background: #d6d6d6;
		/*border: 1px solid #000;*/
	}
	.user-login .user-links .scroll-bar .bar{
		position: absolute;
		margin:0px 4px;
		width: 45%;
		height: 4px;
		background: #072;
		border-radius: 2px;
	}
	.user-login .user-links .account-code{
		float: left;
		width: 49%;
		text-align: center;
	}
	.user-login .user-links .verification-code{
		float: left;
		width: 49%;
		text-align: center;
	}
	.user-login .users-login-ver-code{
		width: 100%;
		height: 150px;
		/*border:1px solid #000;*/
	}
	.user-login .users-login-ver-code .account-login{
		background: #fff;
		padding: 0px 6px;
		border-bottom:1px solid #ddd;
		/*border: 1px solid #000;*/
	}
	.user-login .users-login-ver-code .account-login .text-login{
		position: relative;
		font-size: 14px;
		border-bottom:2px solid #ccc;
	}
	.user-login .users-login-ver-code .account-login .text-login .obtain{
		position: absolute;
		top: 8px;
		right: 10px;
		width: 100px;
		height: 26px;
		line-height: 26px;
		border-radius: 4px;
		background: #ddd;
		text-align: center;
	}
	.user-login .users-login-ver-code .account-login .logins-input{
		outline: none;
		border: 0px;
		width: 360px;
		height: 40px;
		font-size: 16px;
	}
	.user-login .users-login-ver-code .account-login .passwords{
		outline: none;
		border: 0px;
		width: 360px;
		height: 40px;
		font-size: 16px;

	}
	.user-login .users-login-ver-code .account-login .passwords.iphones-seat{
		margin:8px 0px;
		padding: 1px 4px;
		width: 350px;
		height: 24px;
		background: rgb(235, 235, 228);
		border-radius: 2px;
		font-size: 14px;
	}
	.user-login .users-login-ver-code .button-login{
		margin: 6px auto;
		margin-top: 10px;
		line-height: 46px;
		width: 340px;
		height: 46px;
		text-align: center;
		background: #072;
		font-size: 18px;
		font-weight: 600;
		color: #fff;
		border-radius: 4px;
	}
		.user-login .users-login-ver-code .button-login.pass{
			background: #999;
		}
	.user-login .user-registered{
		display: flex;
		justify-content: space-between;
		margin-top:4px;
		height: 26px;
		color: #f40;
	}
	.link-to,
	.user-login .user-registered p{
		padding: 6px;
	}
	.link-to{
		color: #f40;
	}
	.user-login	.customer{
		margin-top: 10px;
		font-size: 13px;
		text-align: center;
	}
	.user-login	.customer span{
		color: #f40;
	}
	.barleft{
		left:0px;
	}
	.barright{
		left: 195px;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
	.fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
 .fade-enter-to, .fade-leave {
    opacity: 1;
  }
  .user-login .exist{
  	position: fixed;
  	top: 0px;
  	width: 100%;
  	height: 100%;
  	background: rgba(0,0,0,0.1);
  }
  .user-login .exist .content-does-not{
  	position: absolute;
  	top:50%;
  	left:50%;
  	transform: translateX(-50%) translateY(-50%);
  	width: 120px;
  	height: 50px;
  	text-align: center;
  	line-height: 50px;
  	background: rgba(0,0,0,0.7);
  	color: #fff;
  	border-radius: 6px;
  }
</style>
