const nodemailer = require("nodemailer")

const createTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a0517202a523af",
      pass: "9bd351ff8262a8",
    },
  })

  return transport
}

const sendMails = async (newsletter, recipients) => {
  const transporter = createTransporter()

  for (let recipient of recipients) {
    const emailBody = {
      from: "Stori Newsletter",
      subject: `¡Han llegado las nuevas novedades para ti ${recipient.name}, no te las pierdas!`,
      attachments: [
        {
          filename: newsletter.file,
          path: newsletter.url,
        },
      ],
      html: ` 
            <div style="width: 100%; margin: auto; background-color: #00baab">
                <div
                    style="
                    background-color: #00baab;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    "
                >
                    <div style="align-self: center">
                    <img
                        src="https://blog.storicard.com/wp-content/uploads/2019/07/stori.logo-horizontal-03.png"
                        alt="stori_logo"
                    />
                    </div>
                    <div style="align-self: center; padding-top: 6rem; width: 39rem">
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
                    <div style="align-self: center">
                    <p
                        style="
                        background-color: #bdffa1;
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 3.6em;
                        font-style: normal;
                        margin: 16px 0;
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
                        style="margin-left: 10%"
                        src="https://www.storicard.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmobile-card-desktop.deda4c78.webp&w=750&q=100"
                        alt="stori_logo"
                    />

                    <p
                        style="
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 2.8em;
                        width: 52rem;
                        text-align: center;
                        "
                    >
                        Para visualizar más información descarga el newsletter adjunto
                    </p>
                    </div>
                    <div style="align-self: center">
                    <p
                        style="
                        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                        font-size: 1.8em;
                        line-height: 1.5em;
                        padding: 0;
                        margin: 0 auto 1.25em;
                        text-align: center;
                        "
                    >
                        Si ya no deseas recibir esta información da click en
                        <a
                        href="http://localhost:80/api/unsubscribe?userOId=${recipient.id}&newsletterOId=${newsletter.id}"
                        >
                        Cancelar Subscripción</a
                        >
                    </p>
                    </div>
                </div>
            </div>
            
            `,
    }
    emailBody.to = recipient.email
    const response = await transporter.sendMai(emailBody)
    console.log("Message send: %s", response.messageId)
  }
  return
}

exports.sendMails = sendMails
