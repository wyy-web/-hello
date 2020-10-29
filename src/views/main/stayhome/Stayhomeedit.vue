<template>
    <div>
        <loading :isShow="showloading" v-show="false"></loading>
        <el-form :model="homeaddform"   ref="homeaddform"   :rules="homeaddrulrs" v-if="homeaddform">
            <el-form-item label="所属分类" >
                <el-select v-model="homeaddform.cid" placeholder="请选择分类名称">
                    <el-option
                            v-for="item in category"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称" >
                <el-input v-model="homeaddform.sname" placeholder="请输入民宿名称">
                </el-input>
            </el-form-item>
            <el-form-item label="民宿描述" >
                <el-input v-model="homeaddform.sdesc" placeholder="请输入民宿描述">
                </el-input>
            </el-form-item>
            <el-form-item label="民宿缩略图" >

            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        :show-file-list="false"
                        :on-success="handlethumbSuccess"
                        :before-upload="beforethumbUpload">
                    <img v-if="homeaddform.sthumb" :src="IMGURL+homeaddform.sthumb" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                    <div class="el-upload__tip" slot="tip" style="font-size: 15px">只能上传jpg/png/webp/jpeg格式文件，且不超过200kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="民宿价格" >
                <el-input v-model="homeaddform.sprice" placeholder="请输入民宿名称">
                </el-input>
            </el-form-item>
            <el-form-item label="所在省份" >
                <el-select v-model="homeaddform.sprovince" placeholder="请选择所在省份">
                    <el-option
                            v-for="(item,index) in province"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在城市" >

                <el-select v-model="homeaddform.scity" placeholder="请选择所在城市">
                    <el-option
                            v-for="(item,index) in citylist"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在地区" >
                <el-select v-model="homeaddform.sarea" placeholder="请选择所在区域">
                    <el-option
                            v-for="(item,index) in arealist"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" >
                <el-input v-model="homeaddform.saddress" placeholder="请输入详细地址">
                </el-input>
            </el-form-item>
            <el-form-item label="民宿标签" >
                <el-input v-model="homeaddform.stag" placeholder="请输入民宿标签">
                </el-input>
            </el-form-item>
            <el-form-item label="轮播图" >
            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        list-type="picture-card"
                        :file-list="bannerfilelist"
                        multiple
                        :limit="5"
                        :on-preview="handlebannerpreview"
                        :on-remove="handlebannerremove"
                        :on-success="handlebannerSuccess">
                    <!--                 :before-upload="beforethumbUpload">-->
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip" style="font-size: 15px">只能上传jpg/png/webp/jpeg格式文件，且不超过200kb,最多只能上传5张</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="民宿评分" >
                <el-input v-model="homeaddform.score" placeholder="请输入民宿评分">
                </el-input>
            </el-form-item>

            <el-form-item label="民宿详情" >
            </el-form-item>

            <el-form-item >
                <rich-text @change-text="sethtml"  formfield="sdetail" :value="homeaddform.sdetail"></rich-text>
            </el-form-item>

            <el-form-item label="入住须知" >
            </el-form-item>
            <el-form-item>
                <rich-text @change-text="sethtml"  formfield="snotice" :value="homeaddform.snotice"></rich-text>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleedit" >修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // loading components
    //上传
    //富文本编辑器
    //省份 城市 区域
    //分装请求

    import {SUCCESS,URL,IMGURL} from "../../../lib/base";
    import loading from "../../../components/loading/loading"
    // import instance from "../../../http/http";
    import E from 'wangeditor'
    import RichText from "../../../components/rich-text/RichText";
    import city from '../../../lib/city.json'
    import {categoryindex} from "../../../http/category";
    import {homeindex,homeupdate} from "../../../http/home";

    export default {
        name: "homeadd",
        components:{
            loading,
            RichText,
        },
        data(){
            return {
                SUCCESS,
                dialogVisible:false,
                dialogImageUrl:'',
                IMGURL,
                city,
                province:[],
                uploadurl:URL+'/admin/Upload/index',
                showloading:true,
                category:[],
                bannerarr:[],
                bannerfilelist:[],
                homeaddform:null,
                homeaddrulrs:{

                }
            }
        },
        computed:{
            citylist(){
                let citylists=[];
                let current=this.city.find(ele=>ele.name===this.homeaddform.sprovince)
                // console.log(current);
                if(current){
                    citylists=current.city.map(ele=>ele.name)
                }
                return citylists;

            },
            arealist(){
                let arealists=[];
                let current=this.city.find(ele=>ele.name === this.homeaddform.sprovince)
                if(current){
                    let city=current.city.find(ele=>ele.name === this.homeaddform.scity)
                    if(city){
                        arealists=city.area
                    }
                }

                return arealists;
            } ,
        },
        methods:{
            inithome(sid){
                console.log(sid);
                homeindex(sid).then(res=>{
                    if(res.data){

                        this.homeaddform=res.data;
                        this.bannerarr=res.data.sbanner1;
                        this.bannerfilelist= res.data.sbanner1.map(ele=>({name:res.data.sname,url:this.IMGURL+ele}))


                    }
                }).catch(()=>{

                })
            },
            initcategory(){
                this.showloading=true;
                // let url=URL+"/admin/category/indexall"
                // let token=sessionStorage.getItem('token');
                // this.$http({
                //    methods: 'GET',
                //    url,
                //    headers:{
                //       token
                //    }
                // }).then(res=>{
                //    console.log(res);
                //   if(res.status===200 && res.data.code===SUCCESS){
                //      if(res.data.data){
                //         this.showloading=false;
                //         this.category=res.data.data;
                //      }
                //   }
                // }).catch(()=>{
                //
                // })
                //  instance.get('/admin/category/indexall').then(res=>{
                //      if(res.code === SUCCESS){
                //          this.category=res.data;
                //      }
                //  }).catch(()=>{
                //
                //  })


                categoryindex().then(res=>{
                    this.category=res.data
                }).catch(()=>{

                })


            },
            handlethumbSuccess(res){
                if(res.code===200){
                    // console.log(res);
                    this.homeaddform.sthumb=res.imgpath;
                }
            },
            beforethumbUpload(file){
                let {size,type}=file;
                let uploadmaxsize=500 * 1024 ;
                let uploadtype=['image/jpg','image/png','image/webp','image/jpeg'];
                let sizeflag=true,typeflag=true;
                sizeflag=size <uploadmaxsize;
                typeflag=uploadtype.some(ele=>ele==type)
                if (!sizeflag) {
                    this.$message.error('图片大小不能超过400kb');
                }
                if (!typeflag) {
                    this.$message.error('图片类型只能是jpg/png/webp/jpeg');
                }
                return sizeflag && typeflag;
            },
            handlebannerSuccess(res){
                // console.log(res);
                this.bannerarr.push(res.imgpath)
                this.homeaddform.sbanner=this.bannerarr.join(',');
            },
            handlebannerremove(file){
                let url=file.response?file.response.imgpath :file.url ;
                this.bannerarr= this.bannerarr.filter(ele=>ele=!url.includes(ele))
                this.homeaddform.sbanner=this.bannerarr.join(',');
            },
            handlebannerpreview(file){
                // console.log(file);
                this.dialogVisible=true;
                if(file.response){
                    var url=IMGURL+file.response.imgpath;
                }else{
                    url=file.url;
                }
                this.dialogImageUrl = url;

            },
            initrichtext(){
                var that=this;
                var editor= new E(this.$refs.sdetail)
                editor.customConfig.uploadImgServer = this.uploadurl;
                editor.customConfig.uploadFileName = 'file'
                editor.customConfig.onchange =  (html)=> {
                    this.homeaddform.sdetail=html;
                    // console.log(this.homeaddform.sdetail);
                }

                editor.customConfig.uploadImgHooks = {
                    customInsert: function (insertImg, result,) {
                        insertImg(that.IMGURL+result.imgpath)

                    }
                }

                editor.create()
            },
            sethtml(html,formfield){
                this.homeaddform[formfield]=html;

            },
            setprovince(){
                this.province=this.city.map(ele=>ele.name);
            },

            handleedit(){
                homeupdate(this.homeaddform.sid,this.homeaddform).then(res=>{
                    this.$message.success(res.msg)
                    this.$router.push({path:'/Stayhomeindex'})
                }).catch((error)=>{
                    console.log(error);

                })
            },
        },
        mounted() {
            let sid=this.$route.params.id;
            console.log(sid);
            this.inithome(sid);
            this.initcategory();
            this.setprovince();



        },
    }
</script>

<style scoped>

</style>
<style>
    .el-icon-plus.avatar-uploader-icon{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>