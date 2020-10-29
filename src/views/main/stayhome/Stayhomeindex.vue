<template>
    <div>
        <loading :isShow="showloading" ></loading>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="所属分类">
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="search.sname" ></el-input>
            </el-form-item>
            <el-form-item label="所在城市">
                <el-input v-model="search.scity" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchhome">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="homedata">
            <el-table-column prop="sid" label="ID"></el-table-column>
            <el-table-column prop="sname" label="民宿名称"></el-table-column>
            <el-table-column prop="sdesc" label="民宿描述"></el-table-column>
            <el-table-column prop="sprice" label="民宿价格"></el-table-column>
            <el-table-column label="位置">
                <template slot-scope="scope">
                    <span>  {{scope.row.sprovince}}--{{scope.row.scity}}--{{scope.row.sarea}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="saddress" label="具体地址"></el-table-column>
            <el-table-column  label="民宿标签">
                <template slot-scope="scope">
                    <el-button v-for="item in scope.row.stag.split(/,|，/)" :key="item">{{item}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="sarea" label="所在区域"></el-table-column>
            <el-table-column prop="score" label="民宿评分"></el-table-column>
            <el-table-column  label="创建时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.ctime">{{scope.row.ctime|date2}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="缩略图">
                <template slot-scope="scope">
                    <img v-if=" scope.row.sthumb" :src="IMGURL+scope.row.sthumb"  style="width: 80px;height: 80px">
                </template>
            </el-table-column>


            <!--        <el-table-column  label="轮播图" prop="sbanner"> </el-table-column>-->
            <!--        <el-table-column prop="sdetail" label="民宿详情"></el-table-column>-->
            <!--        <el-table-column prop="snotice" label="入驻须知"></el-table-column>-->
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button type="text" ><router-link :to="{name:'Stayhomeedit',params:{id:scope.row.sid}}">编辑</router-link></el-button>
                    <el-button type="text"  @click="delhome(scope.row.sid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {SUCCESS,IMGURL} from "../../../lib/base";
    import instance from "../../../http/http";
    import {categoryindex} from "../../../http/category";
    import loading from "../../../components/loading/loading";
    export default {
        name: "Stayhomeindex",
        components:{
            loading
        },
        data() {
            return {
                category:[],
                IMGURL,
                showloading:false,
                homedata: [],
                search:{
                    sname:'',
                    scity:'',
                    cid:''
                },
                paginate:{
                    limit:20,
                    page:1,
                },
                total:0
            }
        },
        methods: {
            inithomedata() {
                this.showloading=true;
                let params=Object.assign({},this.paginate,this.search);
                instance.get('/api/stayhome',{params}).then(res => {
                    this.showloading=false;
                    if (res.code === SUCCESS) {
                        if(res.data) {
                            this.homedata = res.data;
                            this.total = res.total;
                            this.category=res.category;
                            // console.log(res.category)
                        }else{
                            this.$message.success('暂无数据')
                        }
                    }
                }).catch(() => {

                })
            },
            initcategory(){
                this.showloading=true;
                categoryindex().then(res=>{
                    this.category=res.data
                }).catch(()=>{

                })
            },

            delhome(sid){

                instance.delete('/api/stayhome/'+sid).then(res=>{
                    // console.log(res);
                    if(res.code === SUCCESS){
                        this.inithomedata();
                        this.$message.success('删除成功')
                    }
                }).catch(()=>{
                })
            },
            searchhome(){
                this.inithomedata();
            },



        },
        filters:{
            myfilter(value){
                return value;
            },
        },
        mounted() {
            this.inithomedata();
            this.initcategory();
        }
    }
</script>

<style scoped>
    .el-table td{
        width: 300px;
    }
</style>