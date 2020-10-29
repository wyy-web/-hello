import instance from "./http";
// import {SUCCESS} from "../lib/base";

function homeindex(sid) {
    return  new Promise((resolve,reject)=>{
        instance.get('/api/stayhome/'+sid,{}).then(res=>{

            resolve(res)

        }).catch((error)=>{
            reject(error)
        })
    })

}

function homedel() {

}
function homeupdate(sid,data) {

    return  new Promise((resolve,reject)=>{
        instance.put('/api/stayhome/'+sid,data).then(res=>{

            resolve(res)

        }).catch((error)=>{
            reject(error)
        })
    })
}

export {homedel,homeindex,homeupdate}