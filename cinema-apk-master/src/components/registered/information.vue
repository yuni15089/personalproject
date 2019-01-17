<template>
	<div class="information-re">
			<div class="infor-code">
				<div class="users-name">
					<input type="text" placeholder="请输入用户名" 
						   ref="usersame" 
						   onfocus="if(this.value =='请输入用户名'||this.value ==''||this.value =='用户名不能为空'|| this.value =='用户名格式错误' || this.value == '用户已存在'){this.value=''}"
						   @blur="usersnameStr">
				</div>
				<div class="users-password">
					<input type="text"
						   placeholder="请输入6~15密码" 
						   ref="pws"
						   onfocus="if(this.value =='请输入6~15密码'||this.value ==''||this.value =='密码格式错误'||this.value == '密码不能为空'){this.value=''}"
						   @blur="passwordFinished">
					<input type="text" 
						   placeholder="请再次输入密码" 
						   ref="pwsto"
						   onfocus="if(this.value =='请再次输入密码'||this.value ==''||this.value == '两次密码不一致'){this.value=''}"
						   @blur="passwordToFinished">
						   <p>以字母开头，长度在6~18之间，只能包含字母、数字和下划线</p>
				</div>
				<div class="registered-show-hide-btn">
					<p class="registered-btn-cd">注册</p>
					<p @click="judgeDataStr" class="registered-btn-cd before" v-if="tests">注册</p>
				</div>
				<div v-show="showStatus">注册成功,加载中...</div>
			</div>
			<a href="#/particular">
				<div class="van-overlay"></div>
			</a>
	</div> 
</template>
<script>
	import {mapState, mapMutations}from 'vuex'
	export default {
		name:'information',
		data () {
			return {
				textValue:'',
				passwordsDataHandel:'',
				passwordsDataRenew:'',
				usersCorrect: false,
				passwordCorrect: false,
				passwordToCorrect: false,
				showStatus: false
			}
		},
		computed: {
			...mapState(['usersData']),
			tests () {
				if (this.usersCorrect && this.passwordCorrect && this.passwordToCorrect) {
					return true
				}else{
					return false
				}
			}
		},
		methods: {
			...mapMutations ({
				pushDATA:'CHANGE_USERS_ARRAY'
			}),
			judgeDataStr: function () {
				var localStorage = window.localStorage
				console.log(this.usersCorrect,this.passwordCorrect,this.passwordToCorrect)
				this.pushDATA({users:this.textValue,password:this.passwordsDataRenew})
				console.log(this.usersData)
				localStorage[this.textValue] = this.passwordsDataRenew
				this.showStatus = true
				// 延迟跳转页面
				setTimeout("location.href='#/particular'", 2000)
 			},
 			usersnameStr: function () {
 				var registered = this.$refs.usersame.value // 用户名
 				var numCorrect = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ //正则表达式验证 账号 是否合法 
 				var localStorage = window.localStorage
 				if (registered == '') // 判断输入框是否为空 
 						{
 							this.$refs.usersame.value = '用户名不能为空'
 							this.textValue = '' // 清除
 							this.usersCorrect = false
 							console.log(3,this.textValue)
 						}
 					else if (!numCorrect.test(registered)) { // 判断用户名是否 输入正确
 						this.$refs.usersame.value = '用户名格式错误'
 						this.textValue = '' // 清除
 						this.usersCorrect = false
 						console.log(3,this.textValue)
 					} else if(localStorage[registered]){
 						this.$refs.usersame.value = '用户已存在'
 						this.textValue = '' // 清除
 						this.usersCorrect = false
 						console.log(3,this.textValue)
 					}
 						else {
	 						this.textValue = registered // 排除错误后赋值
	 						this.usersCorrect = true // 输入正确 用于点击注册时判断
	 						console.log(this.textValue )
 					}
 			},
 			passwordFinished: function () {
 				var password = this.$refs.pws.value // 密码
 				var passCorrect = /^[a-zA-Z]\w{5,17}$/ 
 				// 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
 				if (password == '') {
 							this.$refs.pws.value = '密码不能为空'
 							this.passwordsDataHandel = '' // 清除
 							this.passwordCorrect = false
 							console.log(2,this.passwordsDataHandel)
 				}
 					else if (!passCorrect.test(password)) {
 						this.$refs.pws.value = '密码格式错误'
 						this.passwordsDataHandel = '' // 清除
 						this.passwordCorrect = false
 						console.log(2,this.passwordsDataHandel)
 					}
 						else {
 							this.passwordsDataHandel = password // 排除错误后赋值
 							this.passwordCorrect = true // 输入正确 用于点击注册时判断
 							console.log(this.passwordsDataHandel)
 					}
 			},
 			passwordToFinished: function () {
 				var passwordTo = this.$refs.pwsto.value // 再次输入密码
 				if (this.passwordsDataHandel && passwordTo) {
 					if(this.passwordsDataHandel == passwordTo){
 						this.passwordsDataRenew = this.passwordsDataHandel
 						this.passwordToCorrect = true
 					}
 				} else {
 					this.$refs.pwsto.value = '两次密码不一致'
 					this.passwordsDataRenew = '' 
 					this.passwordToCorrect = false 
 					console.log(1,this.passwordsDataRenew)		
 				}
 				console.log(this.passwordsDataRenew)
 			}
		}

	}
</script>
<style>
.tach{
	width: 100px;
	height: 30px;
	background: #000;
}
.information-re{
	width: 100%;
	height: 100%;
}
.information-re .van-overlay{
	position: fixed;
	top: 0px;
	z-index: 10;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.7);
}
.information-re .infor-code{
	position: fixed;
	top: 50%;
	left:50%;
	transform: translateX(-50%) translateY(-50%);
	z-index: 15;
	width: 230px;
	height: 300px;
	background: #fff;
	border-radius: 4px;
}
.registered-btn-cd{
	width: 70px;
	height: 30px;
	background: #ccc;
	text-align: center;
	line-height: 30px;
	border-radius: 4px;
	color: #fff;
	font-size: 14px;
	font-weight: 600;
}
.before{
	position: absolute;
	top:0px;
	background: #f40;
}
.registered-show-hide-btn{
	position: relative;
}
</style>