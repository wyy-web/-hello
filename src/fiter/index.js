let filter={

    date:function(val, format = 'yyyy-MM-dd')
    {
        var date = new Date(val);
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(format)) {
                let str = o[k] + '';
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
            }
        }
        return format;
    },

    date2:function (val) {
       let date=new Date(val*1000);
       let time=[date.getFullYear(),date.getMonth()+1,date.getDate()].join('-')
        return time;
    }



}
export default filter;
