import instance from "./http";
import {SUCCESS} from "../lib/base";

function categoryindex() {
    return  new Promise((resolve,reject)=>{
        instance.get('/admin/category/indexall').then(res=>{
            if(res.code === SUCCESS){
               resolve(res)
            }
        }).catch((error)=>{
              reject(error)
        })
    })

}

function categorydel() {

}

function categoryadd() {

}

function categoryupdate() {

}

function categoryread() {

}

export  {categoryindex,categoryadd,categorydel,categoryread,categoryupdate};