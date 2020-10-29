<template>
    <div>
        <loading :isShow="showLoading" v-show="false"></loading>
        <el-form :model="stayhomeform" ref="stayhomeform" :rules="stayhomeRules">
            <el-form-item label="所属分类">
                <el-select v-model="stayhomeform.cid" placeholder="请选择分类名称">
                    <el-option
                            v-for="item in categorys"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="stayhomeform.sname" placeholder="请输入民宿名称"></el-input>
            </el-form-item>
            <el-form-item label="民宿描述" >
                <el-input v-model="stayhomeform.sdesc" placeholder="请输入民宿描述"></el-input>
            </el-form-item>

            <el-form-item label="民宿缩略图">
            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        :show-file-list="false"
                        :on-success="handleThumbSuccess"
                        :before-upload="handleThumbBeforeupload">
                    <img v-if="stayhomeform.sthumb" :src="IMGURL+stayhomeform.sthumb" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                    <div class="el-upload__tip" slot="tip" style="font-size: 15px">只能上传jpg/png/webp/jpeg格式文件，且不超过200kb,最佳比例1：1</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="民宿标签">
                <el-input v-model="stayhomeform.stag" placeholder="请输入民宿标签"></el-input>
            </el-form-item>
            <el-form-item label="民宿评分">
                <el-input v-model="stayhomeform.score" placeholder="请输入民宿评分"></el-input>
            </el-form-item>
            <el-form-item label="民宿价格">
                <el-input v-model="stayhomeform.sprice" placeholder="请输入民宿价格"></el-input>
            </el-form-item>
            <el-form-item label="民宿省份">
                <el-select v-model="stayhomeform.sprovince" placeholder="请选择所在省份">
                    <el-option v-for="(item,index) in province" :key="index" :value="item" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿城市">
                <el-select v-model="stayhomeform.scity" placeholder="请选择所在城市">
                    <el-option v-for="(item,index) in cityLists" :key="index" :value="item" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿区域">
                <el-select v-model="stayhomeform.sarea" placeholder="请选择所在区域">
                    <el-option
                            v-for="(item,index) in areaList"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿地址">
                <el-input v-model="stayhomeform.saddress" placeholder="请输入民宿地址"></el-input>
            </el-form-item>
            <el-form-item label="民宿轮播">
            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        list-type="picture-card"
                        multiple
                        :limit="5"
                        :on-success="handleBannerSuccess"
                        :on-preview="handleBannerPreview"
                        :on-remove="handleBannerRemove">
<!--                        :before-upload="handleThumbBeforeupload"-->
                    <!--                        上传成功后要做的事情
                                                上传之前要进行的验证-->
                    <!--                    有图显示那个，没图显示默认样式
                    list-type是指列表的风格，这里用到的是方块
                    -->
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip" style="font-size: 15px">只能上传jpg/png/webp/jpeg格式文件，且不超过200kb,最多只能上传5张</div>

                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogPreviewImg" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="民宿详情"></el-form-item>
            <el-form-item>
                <rich-text @change-text="sethtml"  formfield="sdetail"></rich-text>
            </el-form-item>

            <el-form-item label="入住须知">
            </el-form-item>

            <el-form-item>
                <rich-text @change-text="sethtml"  formfield="snotice"></rich-text>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleradd" >添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// <!--    1.loading 2.上传图片,提交方式为post,将图片提交给服务器,服务器将图片放到一个位置,再返回图片的路径,在数据库中存的是在服务器中的路径 3.富文本编辑器 4.三级联动 5.请求的封装-->
    import {SUCCESS,IMGURL,URL} from "../../../lib/base";
    import loading from "../../../components/loading/loading";
    import instance from "@/http/http";
    import E from 'wangeditor';
    import city from "../../../lib/city.json";
    import RichText from "../../../components/rich-text/RichText";
    import {categoryindex} from "../../../http/category";


export default {
        name: "Stayhomeadd",
        components: {
            loading,
            RichText,
        },
        data() {
            return {
                dialogVisible: false,
                IMGURL,
                //上传到后台的路径
                uploadurl: URL + '/admin/upload/index',
                showLoading: true,
                categorys: null,
                stayhomeform: {
                    sname: '',
                    sdesc: '',
                    sprice: '',
                    sthumb: '',
                    stag: '',
                    scity: '',
                    sarea: '',
                    saddress: '',
                    sbanner: '',
                    snotice: '',
                    sdetail: '',
                    cid: '',
                    score: '',
                    sprovince: ''
                },
                bannerArr: [],
                dialogPreviewImg: '',
                province: [],
                city,
                stayhomeRules: {}
            }
        },
        //计算属性
        computed: {
            cityLists() {
                let cityLists = [];
                let current = this.city.find(ele => ele.name === this.stayhomeform.sprovince);
                if (current) {
                    cityLists = current.city.map(ele => ele.name);

                }
                return cityLists;
            },
            areaList() {
                let area = [];
                let current = this.city.find(ele => ele.name === this.stayhomeform.sprovince);
                if (current) {
                    let city = current.city.find(ele => ele.name === this.stayhomeform.scity);
                    if (city) {
                        area = city.area;
                    }
                }
                return area;
            }
        },
        methods: {
            initCategory() {
                this.showLoading = true;
                categoryindex().then(res => {
                    this.categorys = res.data

                }).catch(() => {

                })
                // instance('./admin/category/indexall').then(res => {
                //     this.showLoading = false;
                //     if (res.code === SUCCESS) {
                //         this.category = res.data;
                //     }
                // }).catch(() => {
                //
                // })
            },
            //缩略图上传成功
            //后台将图片返回后
            handleThumbSuccess(res) {
                if (res.code === SUCCESS) {
                    //把路径给到字段
                    this.stayhomeform.sthumb = res.imgpath;

                }
                console.log(res);

            },
            handleThumbBeforeupload(file) {
                let {size, type} = file;
                let uploadMaxSize = 500 * 1024;
                let uploadType = ['image/jpg', 'image/png', 'image/webp', 'image/jpeg'];
                let sizeFlag = true, typeFlag = true;
                sizeFlag = size < uploadMaxSize;
                //判断存在性问题
                typeFlag = uploadType.some(ele => ele == type);
                if (!typeFlag) {
                    this.$message.error('上传的图片格式只能是JPG、PNG、WEBP、JPEG格式！')
                }
                if (!sizeFlag) {
                    this.$message.error('上传的头像图片大小不能超过200KB！')
                }
                //如果两个都是真的，则可以提交成功
                return sizeFlag && typeFlag;
            },
            //轮播上传sbanner=img1，img2  多次每次一张或者一次多张
            handleBannerSuccess(res) {
                //回来一张图片就推进去一张
                this.bannerArr.push(res.imgpath);
                //通过数组来对图片进行删除
                //join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
                this.stayhomeform.sbanner = this.bannerArr.join(',');
            },
            handleBannerRemove(file) {
                // console.log(file);
                //找到路径进行删除
                let url = file.response.imgpath;
                //过滤，留下不等的，删掉相等的
                this.bannerArr = this.bannerArr.filter(ele => ele != url);
                this.stayhomeform.sbanner = this.bannerArr.join(',');

                // let url=URL+'/admin/category/indexall';
                // let token =sessionStorage.getItem('token');
                // this.$http({
                //     url,
                //     header:{
                //         token
                //     }
                // }).then(res=>{
                //     if (res.status===200&&res.data.code===SUCCESS){
                //         this.showLoading=false;
                //         if (res.data.data){
                //             this.category=res.data.data;
                //         }
                //     }
                //
                // })
            },
            handleBannerPreview(file) {
                let url = this.IMGURL + file.response.imgpath;
                this.dialogVisible = true;
                this.dialogPreviewImg = url;
            },

            // handleExceed(files, fileList) {
            //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // },
            initRichText() {
                let that = this;
                let editor = new E(this.$refs.sdetail);
                // edit.customConfig.uploadImgShowBase64=true;
                // edit.customConfig.showLinkImg=false;
                editor.customConfig.uploadImgServer = this.uploadurl;
                editor.customConfig.uploadFileName = 'file';
                editor.customConfig.onchange = (html) => {
                    this.stayhomeform.sdetail = html;
                }
                editor.customConfig.uploadImgHooks = {
                    customInsert: function (insertImg, result) {
                        insertImg(that.IMGURL + result.imgpath);

                    }
                }
                editor.create();
            },
            sethtml(html, formfield) {
                this.stayhomeform[formfield] = html;

            },
            //父子组件通信
            // setSnotice(field, html) {
            //     this.stayhomeform[field] = html;
            // },
            setProvince() {
                //把所有的省份过滤出来
                this.province = this.city.map(ele => ele.name);
            },
            handleradd() {
                instance.post('/api/stayhome', this.stayhomeform).then(res => {
                    if (res.code === SUCCESS) {
                        this.$message.success('民宿添加成功')
                        this.$router.push({path: '/Stayhomeindex'})
                    }
                }).catch(() => {

                })
            },
        },
            mounted() {
                this.initCategory();
                this.setProvince();

            }
    }
</script>

<style>
    .el-icon-plus .avatar-uploader-icon{
        display: flex;
        justify-content: center;
        /*在弹性盒对象的 <div> 元素中的各项周围留有空白：*/
        align-items: center;
    /*    居中对齐弹性盒的各项 <div> 元素：*/
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