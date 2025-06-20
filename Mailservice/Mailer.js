// AIzaSyDc_3CCZUS_SB8kelYFpncejMsmPq7Yd8o
const nodemailer=require('nodemailer');

const createtransport=()=>{
    return nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'perry.pawan@rubicotech.in',
            pass:'hahpmmrozasfzeqd'
        }
    });
};
const sendemail=(transporter,mailoption)=>{
return new Promise((resolve,reject)=>{
    transporter.sendMail(mailoption,(error,info)=>{
        if(error){
            reject(error);
        }
        else{
            resolve(info);
        }
    });
});
};
module.exports={
    createtransport,
    sendemail
}