<template>
    <div class="login" ref="Login">
        <div class="login-content">
            <el-form :model="loginForm" ref="loginform" :rules="rules">
                <el-form-item label="用户名：" prop="username">
                     <el-input v-model="loginForm.username">
                     </el-input>
                </el-form-item>

                <el-form-item label="密码:" prop="password">
                    <el-input v-model="loginForm.password" >
                    </el-input>
                </el-form-item>

                <el-form>
                    <el-form-item>
                        <el-button type="primary" @click="handleLogin('loginform')">登录</el-button>
                    </el-form-item>
                </el-form>


            </el-form>

        </div>

    </div>
</template>

<script>
    //1.前台进行权限验证
    //2.路由的前置守卫
    //3.路由元信息
    //4.登录成功后返回之前的页面  在地址栏添加查询字符串
    import {SUCCESS} from "../lib/base";
    import {URL} from "../lib/base";
    // import {FAIL} from "../lib/base";
    // import base from "@/lib/base";
    import axios from 'axios';
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
                    ],
                }

            }
        },
        methods:{
            handleLogin(formname){
                // console.log(this.$refs);
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        // 跨域   代理   服务器端   jsonp

                        axios.post(URL+'/admin/login/check',this.loginForm).then( (res)=> {
                            // console.log(res.data);
                            if(res.status===200 && res.data.code===SUCCESS){
                                sessionStorage.setItem('token',res.data.token);
                                sessionStorage.setItem('user',JSON.stringify(res.data.user));
                                let redirect=this.$route.query.redirect || 'index';
                                this.$router.push({name:redirect});
                            }else{
                                this.$message.error(res.data.msg)
                            }
                        }).catch(function (error) {
                            console.log(error);
                        })
                        console.log(this.loginForm);
                        // this.$router.push({path:'/'})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }

        // methods: {
        //     handleLogin(formname) {
        //         // console.log(this.$refs)
        //         this.$refs[formname].validate((valid) => {
        //             if (valid) {
        //                 //同源和跨域
        //                 //解决跨域：1.代理 2.服务器端 3.jsonp  1、3是前端解决  2是服务器解决
        //                 // let url='http://localhost/hotel-admin/public/index.php'
        //                 axios.post(URL+'admin/Login/check',this.loginForm.then( (res) =>{
        //                     if (res.status===200&&res.data===SUCCESS){
        //                         sessionStorage.setItem('tokebn',res.data.token);
        //                         let redirect=this.$route.query.redirect||'index';
        //                         this.$router.push({name:redirect});
        //                     }else{
        //                         this.$message.error(res.data.msg)
        //                     }
        //                 }).catch(function (error){
        //                     console.log(error);
        //                 })
        //                console.log(this.loginForm);
        //
        //            }else {
        //                 console.log('error submit!!');
        //                 return false;
        //             }
        //         });
        //     }
        // }

                // this.$refs[formname].validate(valid => {
                //     if (valid) {
                //         console.log(this.loginForm);
                //         this.$router.push({path:'/'})
                //     }else{
                //         console.log('error submit!');
                //         return false;
                //     }
                // })

    }

</script>

<style scoped>
    .login{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #e7e7e7 ;
    }
    .login >.login-content{
        width: 400px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background:#f2dede;
        padding: 20px;
        border-radius: 20px;
    }

</style>