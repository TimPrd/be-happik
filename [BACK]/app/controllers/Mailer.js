const sgMail = require('@sendgrid/mail');

exports.send = async function (mail, templateId, datas) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: mail,
        from: 'be@happik.com',
        templateId: templateId,
        dynamic_template_data: datas
    };
    sgMail.send(msg);

}