const nodemailer=require('nodemailer')




const sendemail=async (subject,message,send_to,send_from,replay)=>{

    const trasnsport=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:587,
        auth:{
           user: process.env.EMAIL_USER,
           pass:process.env.EMAIL_PASS
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    const option={
        from:send_from,
        to:send_to,
        subject:subject,
        replayTo:replay,
        html:message
    }
    //send email
    trasnsport.sendMail(option,function(error,info){
        if(error){
            console.log(error)
        }else{
             console.log(info)
        }
       
    })


}