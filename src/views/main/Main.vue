<template>
    <el-container class="main-box">
        <el-header  style="height: 120px">
            <div class="logo" style="margin-left: 80px">
                <img src="../../assets/1.png" alt="">
            </div>
        <div class="nav">
            <el-menu mode="horizontal">
                <el-menu-item index="1" >指南</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        个人中心
                    </template>
                    <el-menu-item>
                        <router-link to="/Changepass">修改密码</router-link>
                    </el-menu-item>
                    <el-menu-item>
                        <router-link to="login">退出登录</router-link>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        </el-header>

        <el-container>
            <el-aside width="200px"  style="background: #f2dede; border:2px solid #d4d4d4">
                        <el-menu style="background: #f2dede;border-bottom: none;margin-left: 30px">
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-setting"></i>
                                    <span>分类管理</span>
                                </template>
                                <el-menu-item>
                                    <router-link to="/CategoryAdd">分类添加</router-link>
                                </el-menu-item>
                                <el-menu-item>
                                    <router-link to="/index">分类查看</router-link>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>

                <el-menu style="background: #f2dede;border-bottom: none;margin-left: 30px">
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>民宿管理</span>
                        </template>
                        <el-menu-item>
                            <router-link to="/Stayhomeadd">民宿添加</router-link>
                        </el-menu-item>
                        <el-menu-item>
                            <router-link to="/Stayhomeindex">民宿查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

        <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
        </el-container>

        </el-container>
    </el-container>
</template>

<script>
    export default {
        name:"Main",

    }
</script>

<style scoped>
    .main-box{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

    }
    .el-main{
        background: #e7e7e7 !important;
        border:2px solid #d4d4d4
    }
    .el-header {
        /*弹性布局*/
        display: flex;
        /*左右对齐*/
        justify-content: space-between;
        background-color: #f2dede;
        color: #333;

    }
    a{
        color: #333333;
    }
    .el-header .nav{
        background: #f2dede;
        margin-top: 40px;
    }
    .nav .el-menu{
        height: 100%;
        width: 200px;
        background: #f2dede ;
        border-bottom: none;
        margin-right: 50px;
    }


    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        overflow: hidden;

    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;

    }
</style>