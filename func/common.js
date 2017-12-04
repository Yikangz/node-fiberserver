/**
 * ������:�ӱ�ɭ
 * ����ʱ��:2017-12-4 11:49:00
 * ��������:���������켶ʱ���ּ���ʱ�����ƥ��ĺ���
 */

var moment = require("moment");
var config = require("./config.js");

var common = {};

/* [ȥ�������к���null��
���÷���:
result:json���ͻ�����string����
 */
common.removenull = function (result) {
    var reg = new RegExp(":null", "g");
    var notnull;
    if (typeof (result) == "string") {
        try {
            notnull = result.replace(reg, ':""');
        } catch (e) {
            console.error(e);
            return;
        }
        return notnull;
    }
    else if (typeof (result) == "object") {
        try {
            result = JSON.stringify(result);
            result = result.replace(reg, ':""');
            notnull = JSON.parse(result);
        } catch (e) {
            console.error(e);
            return null;
        }

        return notnull;
    }
    else {
        return notnull;
    }
}


/* [ȡ��ǰʱ��ļ������º�
���÷���:
ee:ʱ��[2015-02-01 00:00:00]
type: day�Ǽ����,month�Ǽ��º�
num:�·�,����Ϊ�ϼ���,Number����
*/
common.afterDM = function (ee, type, num) {
    var r = '';
    var now = "";
    if (ee == null) {
        now = new Date();//ָ������
    }
    else {
        now = new Date(ee);
    }

    if (type == "") {
        return null;
    }
    else if (type == "day") {
        var lastMonth = new Date(now.getFullYear(), num + now.getMonth(), now.getDate());
        var ty = 'YYYY-MM-DD HH:mm:ss';
        var le = ee.length;
        ty = ty.substr(0, le);
        r = moment(lastMonth).format(ty);
        return r;
    }
    else if (type == "month") {
        var lastMonth = new Date((now / 1000 + (num * 24 * 60 * 60)) * 1000);
        var ty = 'YYYY-MM-DD HH:mm:ss';
        r = moment(lastMonth).format(ty);
        return r;
    }
    else {
        return null;
    }


}

/*]��ȡ��Χ�ڵ������ 
���÷���:
min:��С��
max:�����
*/
common.sjs = function (min, max) {
    var num = Math.floor(min + Math.random() * (max - min));
    return String(num);
}
/*]��ȡ��Χ�ڵ������ */



/*ȡ�ַ���ƴ������ĸ(��д)*/


/*��ȡ�м��ַ���
	var str = "hello world"
	var newStr = this.getsub(str,"h","o");
	console.log(newStr);  //ell
*/
common.getsub = function (str, start, end) {
    var s = str.indexOf(start);
    var e = str.indexOf(end);
    if (s == -1) {
        return null
    } else {
        if (e == -1) {
            e = str.length;
        }
        return str.substring(s + start.length, e);
    }
}


/*[ȡ����������� */
common.timeSecond = function (time2, time1) {
    var date1 = new Date(time1);
    var date2 = new Date(time2);
    var time = (date2 - date1) / 1000;
    return time;
}

/*]ȡ����������� */


/**
 * �����п�
 * @param obj
 * @param data
 * @returns {*}
 * ʹ�÷�������ҵ�������ǰ��� ��
 *
   const {�ֶ�A, �ֶ�B, �ֶ�C, �ֶ�D, �ֶ�E} = f;
   const obj = {�ֶ�A, �ֶ�B, �ֶ�C, �ֶ�D, �ֶ�E};
   data = judgeNull(obj, data);
   if (data.״̬ != '�ɹ�') return data;
 */
common.judgeNull = (obj, data) => {
    for (let item in obj) {
        if (!obj[item]) {
            data.״̬ = `${item}����Ϊ��`;
            break;
        }
    }
    return data;
};

/**
 * �����켶ʱ���ּ���ʱ�����ƥ��ĺ���
 * @param {*} jsonFile json�ļ��� ·��Ҫ����config�ļ�����
 * @param {*} func  json�ļ��ڶ�Ӧ�������ļ�
 * 
 * ��ʽ���¸�ʽ����������ȡ
{
    "a":{
        "day":[],
        "hour":[],
        "minute":[30,60]   //����ֻ����ÿ30�� �� ÿ60��ִ��
    }
}

֧����ʱ�ִ���ʹ��
����:
if(!common.dealTime("time","p_pay_commit")){
        console.log("û�е�ʱ��,����������O(��_��)O");
        return;
}
ע:�˺���ֻ��Զ�ʱ�����װ�ĺ���
 */
common.dealTime = (jsonFile, func) => {
    var data = false; //��ʼΪfalse;
    var day;
    var hour;
    var minute;
    var nowtime = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        var FILE = eval('config.get(jsonFile).'+func);
    } catch (e) {
        console.warn('��ȡ������Ӧ��' + func + '���ò���');
        data = false;
        return data;
    }

    try {
        day = FILE.day;
        hour = FILE.hour;
        minute = FILE.minute;
    } catch (e) {
        console.warn('��ȡ' + func + '�����쳣,��鿴�����Ƿ���ȷ');
        data = false;
        return data;
    }

    if (!day) {
        console.warn('��ȡ' + func + '����day�쳣,��鿴�����Ƿ���ȷ');
        data = false;
        return data;
    }

    if (!hour) {
        console.warn('��ȡ' + func + '����hour�쳣,��鿴�����Ƿ���ȷ');
        data = false;
        return data;
    }

    if (!minute) {
        console.warn('��ȡ' + func + '����minute�쳣,��鿴�����Ƿ���ȷ');
        data = false;
        return data;
    }

    if(hour.length == 0 && day.length == 0 && minute.length == 0){  //�������κ�ʱ������������ִ��
        data = true;
        return data;
    }

    if(day.length == 0 && minute.length == 0){  //������ʱ������ʱ����ִ��
        if(hour.length > 0){
            for (let value of minute) {
                if (value == Number(moment().format('mm'))) {
                    data = true;
                    return data;
                }
            }
            data = false;
            return data;
        }
    }

    if(day.length == 0 && hour.length == 0){  //���÷ּ�����ʱ����ִ��
        if(minute.length > 0){
            for (let value of minute) {
                if (value == Number(moment().format('mm'))) {
                    data = true;
                    return data;
                }
            }
            data = false;
            return data;
        }
    }

    if(day.length == 0){   //����ʱ����ּ�����ʱ�ּ���ִ��
        if(hour.length > 0){
            for (let value of hour) {
                if (value == Number(moment().format('HH'))) {
                    if(minute.length > 0){
                        for (let value of minute) {
                            if (value == Number(moment().format('mm'))) {
                                data = true;
                                return data;
                            }
                        }
                        data = false;
                        return data;
                    }else{
                        data = true;
                        return data;    //����ʱ������ʱ����ִ��
                    }
                }
            }
            data = false;
            return data;
        }
    }

    if (day.length > 0) {  
        for (let value of day) {
            if (value == Number(moment().format('DD'))) {
                if(hour.length > 0){
                    for (let value of hour) {
                        if (value == Number(moment().format('HH'))) {
                            if(minute.length > 0){
                                for (let value of minute) {
                                    if (value == Number(moment().format('mm'))) {
                                        data = true;
                                        return data;  //�����켶��ʱ�����ּ�������ʱ�ּ���ִ��
                                    }
                                }
                                data = false;
                                return data;
                            }
                            else{
                                data = true;
                                return data;  //������ʱ��������ʱ����ִ��
                            }
                        }
                    }
                    data = false;
                    return data;
                }else{
                    data = true;
                    return data;  //�����켶�����켶��ִ��
                }
            }
        }
        data = false;
        return data;
    }




}

module.exports = common;