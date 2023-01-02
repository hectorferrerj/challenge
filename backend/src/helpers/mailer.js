const nodemailer = require("nodemailer")

const createTransporter = () => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "challenge.test.main@gmail.com",
      pass: "tujnedbqkbrlercu",
    },
  })

  return transport
}

const sendMails = async (newsletter, recipients, unsubscribeOid) => {
  const transporter = createTransporter()
  for (let recipient of recipients) {
    const emailBody = {
      from: "Stori Newsletter <newsletter@stori.com>",
      subject: `¡Han llegado las nuevas novedades para ti ${recipient.name}, no te las pierdas!`,
      attachments: newsletter,
      html: ` 
            <div style="width: 1000px; margin: auto; background-color: #00baab">
                <div
                    style="
                    background-color: #00baab;
                    display: table-row;
                    width: 600px;
                    text-align: center;
                    "
                >
                    <div style="padding-top: 2rem; display: table-row;">
                      <img 
                          style="width: 100px; padding: 1rem;"
                          src="https://blog.storicard.com/wp-content/uploads/2019/07/stori.logo-horizontal-03.png"
                          alt="stori_logo"
                      />
                    </div>
                    <div style="display: table-row; padding-top: 6rem; width: 39rem">
                    <h1
                        style="
                        margin: 0;
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 4rem;
                        line-height: 120%;
                        text-align: center;
                        "
                    >
                        <strong>Una Tarjeta de Crédito a tu Medida!</strong>
                    </h1>
                    </div>
                    <div style="display: table-row;">
                    <p
                        style="
                        background-color: #bdffa1;
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 3.6em;
                        font-style: normal;
                        text-align: center;
                        "
                    >
                        ${recipient.name}
                    </p>
                    <h2
                        style="
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 3.6em;
                        line-height: 1.25em;
                        font-weight: 500;
                        "
                    >
                        ¡Llegaron las nuevas novedades!
                    </h2>
                    <img
                      style="width: 400px;"
                      src="https://www.storicard.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmobile-card-desktop.deda4c78.webp&w=750&q=100"
                      alt="stori_logo"
                    />
                    <p
                        style="
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 2em;
                        text-align: center;
                        "
                    >
                        Para visualizar más información descarga el newsletter adjunto
                    </p>
                    </div>
                    <div style="display: table-row;">
                    <p
                        style="
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 1em;
                        line-height: 1.5em;
                        padding-top: 1rem;
                        padding-bottom: 2rem;
                        text-align: center;
                        "
                    >
                        Si ya no deseas recibir esta información da click en
                        <a
                        href="http://localhost:3008/stori/api/recipient-unsubscribe?_id=${recipient._id}&newsletter_oid=${unsubscribeOid}"
                        >
                        Anular Subscripción</a
                        >
                    </p>
                    </div>
                </div>
            </div>
            
            `,
    }
    emailBody.to = recipient.email
    const response = await transporter.sendMail(emailBody)
    console.log("Message send: %s", response.messageId)
  }
  return
}

exports.sendMails = sendMails
