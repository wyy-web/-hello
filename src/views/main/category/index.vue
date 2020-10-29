<template>
    <div>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item >
                <el-input v-model="search.cname" ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handlerSearch">查询</el-button>
            </el-form-item>

        </el-form>
        <el-table :data="categories">
            <el-table-column prop="cid" label="ID"></el-table-column>
            <el-table-column prop="cname" label="分类名称"></el-table-column>
            <el-table-column prop="cdesc" label="分类描述"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handlerEdit(scope.row.cid)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="delcategory(scope.row.cid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination
                    :total="total"
                    :page-size.sync="paginate.limit"
                    :current-page.sync="paginate.page"
                    layout="total,prev,pager,next,jumper"
                    @current-change="handlerCurrentPageChange">

            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {URL,SUCCESS} from "../../../lib/base";

    export default {
        name: "Index",
        data(){
            return{
                //搜索条件
                search:{cname:''},
                //分页
                paginate:{
                    page:1,
                    limit:3
                },
                categories:[],
                total:0
            }
        },
        methods:{
            initCategory(){
                let url=URL+'/admin/category/index';
                let token=sessionStorage.getItem('token');
                let params=Object.assign({},this.paginate,this.search);
                axios({
                    method:'GET',
                    url,
                    params,
                    headers:{
                        token
                    }
                }).then(res=>{
                    if(res.status===200 && res.data.code===SUCCESS){
                        if (res.data.data){
                            this.categories=res.data.data;
                            this.total=res.data.total;
                        }else {
                            this.$message.info(res.data.msg)
                        }
                    }
                }).catch(()=>{

                })

            },
            delcategory(cid) {
                let url = URL + '/admin/category/delcategory';
                let token = sessionStorage.getItem('token')
                axios({
                    method:'GET',
                    url,
                    params:{cid},
                    headers:{
                        token
                    }
                }).then(res=>{
                    if(res.status===200 && res.data.code===SUCCESS){
                        this.$message.info(res.data.msg)
                        this.initCategory();
                    }else{
                        this.$message.error(res.data.msg)
                    }
                }).catch(()=>{

                })

            },
            handlerCurrentPageChange(val){
                this.paginate.page=val;
                this.initCategory();
            },
            handlerSearch(){
                this.paginate.page=1;
                this.initCategory()
            },
            handlerEdit(cid){
                console.log(cid);
                this.$router.push({path:'/CategoryEdit',query:{cid}})
            }
        },
        //不要使用箭头函数，this不一定找到实例
        mounted() {
            this.initCategory();
        }

    }
</script>

<style scoped>

</style>