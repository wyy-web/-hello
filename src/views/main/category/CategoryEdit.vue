<template>
    <div class="add" ref="add">
    <div v-if="category">
        <el-form :model="category" :rules="categoryRules" ref="categoryform">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="category.cname" placeholder="请输入分类名称">
                </el-input>
            </el-form-item>

            <el-form-item label="分类描述" prop="cdesc">
                <el-input v-model="category.cdesc" placeholder="请输入分类的描述">
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handlerSubmit">更新</el-button>
            </el-form-item>


        </el-form>
    </div>
    </div>
</template>

<script>
    import {SUCCESS, URL,FAIL} from "../../../lib/base";
    import axios from "axios";

    export default {
        name: "Add",
        data() {
            let validateCname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('分类名称不能为空'));
                } else if(!(/[\u4e00-\u9fa5]{2,6}/.test(value))){
                    callback(new Error('分类名称只能是2-6位的汉字字母下划线'))

                } else {
                    callback();
                }

        }

            return{
                category:null,
                categoryRules:{
                    cname:[
                        {validator:validateCname,tigger:'blur'}
                    ],
                    cdesc:[
                        {required: true, message: '请输入分类的描述', trigger: 'blur'},
                        {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            handlerSubmit(){
                this.$refs.category.validate(valid=>{
                    if (valid){
                        let url=URL+'/admin/category/CategoryAdd';
                        let token=sessionStorage.getItem('token');
                        FAIL,
                        axios({
                            url,
                            method:'POST',
                            data:this.category,
                            headers:{
                                token
                            }
                        }).then(res=>{
                            if (res.status===200&&res.data.code==SUCCESS){
                                this.$message.success(res.data.msg)
                                this.$router.push({path:'/index'})
                            }
                        }).catch(()=>{
                            this.$message.error('分类修改失败');
                        })
                    }
                })
            },
            initCategory(cid){
                let url=URL+'/admin/category/read';
                let token=sessionStorage.getItem('token')
                axios({
                    mothod:'GET',
                    url,
                    params:{cid},
                    headers:{
                        token
                    }
                }).then(res=>{
                    SUCCESS;
                    if (res.status===200&&res.data.code===SUCCESS){
                        if(res.data.data){
                            this.category=res.data.data;
                        }else{
                            this.$message.error(res.data.msg)
                        }

                    }
                }).catch(()=>{

                })
            }
        },
        mounted() {
            let {cid}=this.$route.query;
            this.initCategory(cid);
        }
    }
</script>

<style scoped>

</style>