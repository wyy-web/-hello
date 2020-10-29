
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Login from "../views/Login"
import Main from "../views/main/Main";
import List from "../views/main/List";
import Changepass from "../views/main/Changepass/Changepass";
import Stayhomeadd from "../views/main/stayhome/Stayhomeadd";
import Stayhomeindex from "../views/main/stayhome/Stayhomeindex";
import Stayhomeedit from "../views/main/stayhome/Stayhomeedit";
import CategoryAdd from "../views/main/category/CategoryAdd";
import index from "../views/main/category/index";
import CategoryEdit from "../views/main/category/CategoryEdit";
import Echartscom from "../views/main/echarts/Echarts";



let router=new VueRouter({
    routes:[
        {path:'/',component:Main,name:'index',
            // redirect:'/echarts',
        meta:{
            auth:true,title:"首页"
        },children:[{
            path:'CategoryAdd',component:CategoryAdd,name:'CategoryAdd',
                meta:{
                    auth:true,title:"分类添加"
                }
            }, {
                    path:'index',component:index,name:'index',
                    meta:{
                        auth:true,title:"分类查看"
                    }
                },
                {
                    path:'CategoryEdit',component:CategoryEdit,name:'CategoryEdit',
                    meta:{
                        auth:true,title:"分类编辑"
                    }
                },
                {
                    path:'Stayhomeadd',component:Stayhomeadd,name:'Stayhomeadd',
                    meta:{
                        auth:true,title:"民宿添加"
                    }
                },
                {
                    path:'Stayhomeedit',component:Stayhomeedit,name:'Stayhomeedit',
                    meta:{
                        auth:true,title:"民宿编辑"
                    }
                },
                {
                    path:'Stayhomeindex',component:Stayhomeindex,name:'Stayhomeindex',
                    meta:{
                        auth:true,title:"民宿查看"
                    }
                },
                {
                    path: 'changepass', component: Changepass, name: 'changepass', meta: {
                        auth: true, title: '修改密码'
                    }
                },
                {
                    path:'echarts',
                    component:Echartscom,
                    name:'echarts',
                    meta:{
                        auth:true,
                        title:"数据可视化"}
                }
            ]},
        {path:'/Login',component:Login,name:'Login',
            meta:{
                auth:false,title:"登录"
            },children:[]},
        {path:'/List',component:List,name:'List',
            meta:{
                auth:true,title:"列表"
            },children:[]},
    ]

})

router.beforeEach((to,from,next)=>{
    // to,from;
    let title=to.meta.title||'首页';
    document.title=title;
        if (to.meta.auth){
            let token=sessionStorage.getItem('token');
            token=token && token.trim();
        if (token){
            next();
        }else {
            next({name: 'Login', query: {redirect: to.name}})
        }
        }else{
            next();


    }

})
export default router;
