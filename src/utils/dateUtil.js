const dateUtil = {
    yyyy_mm_dd : function(date,sep){
        if(date === null) return '';
        const _date = new Date(date);
        const month = _date.getMonth() < 10 ? '0'+(_date.getMonth()+1).toString() : (_date.getMonth()+1).toString()
        const date_ = _date.getDate() < 10 ? '0'+_date.getDate().toString() : _date.getDate().toString()
        return `${_date.getFullYear()}${sep}${month}${sep}${date_}`
    },
    hh_mm_ss : function(date,sep){
        const _date = new Date(date);
        const minute = _date.getMinutes() < 10 ? '0'+(_date.getMinutes()).toString() : (_date.getMinutes()).toString();
        const second = _date.getSeconds() < 10 ? '0'+(_date.getSeconds()).toString() : (_date.getSeconds()).toString();
        return `${_date.getHours()}${sep}${minute}${sep}${second}`
    },
    getToday : function(){ 
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    },
    
}



module.exports = dateUtil





const mm = [
    '00','01','02','03','04','05','06','07','08','09','10','11','12'
]

const dd = [
    '00','01','02','03','04','05','06','07','08','09','10','11','12',
    '13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'
]