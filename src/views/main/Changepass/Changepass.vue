<template>
    <el-form :model="passform"   ref="passform"   :rules="rules" >
        <el-form-item label="原密码" prop="oldpass">
            <el-input v-model="passform.oldpass" placeholder="请输入原密码">
            </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
            <el-input v-model="passform.newpass" placeholder="请输入新密码">
            </el-input>
        </el-form-item>
        <el-form-item label="再次确认密码" prop="newpassagain">
            <el-input v-model="passform.newpassagain" placeholder="请输入确认密码">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handlersubmit">修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {URL,SUCCESS} from "../../../lib/base";
    export default {
        name: "Changepass",
        data(){
            return{
                passform:{
                    oldpass:'',
                    newpass:'',
                    newpassagain:'',
                },
                rules:{
                    oldpass:[],
                    newpass :[],
                    newpassagain:[]

                }
            }
        },
        methods:{
            handlersubmit(){
                let url=URL+'/admin/Login/changepass';
                let token=sessionStorage.getItem('token')
                this.$http({
                    url,
                    method:'POST',
                    data:this.passform,
                    headers:{
                        token
                    }

                }).then(res=>{
                    if(res.status===200 && res.data.code==SUCCESS){
                        this.$message.success(res.data.msg)
                        console.log(res.date.msg)
                        sessionStorage.clear();
                        this.$router.push({path:'/login'})
                    }

                }).catch(()=>{

                })

            }

        }
    }
</script>

<style scoped>

</style>