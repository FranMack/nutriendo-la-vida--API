import {
  facebookLogo,
  instagramLogo,
  linkedingLogo,
  nlvLogo,
} from "./encodedImages";

interface MailTemplate {
  name: string;
  title: string;
  content: string;
  link: string;
  plans: string[];
}

export function MailTemplate({
  name,
  title,
  plans,
  content,
  link,
}: MailTemplate) {
  return `
     <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Validación de cuenta</title>
      <style>
          .body-container {
              width: 100vw;
              min-height: 100vh;
          }
          .mail-container {
              margin: 0 auto;
              width: 70%;
              background-color: #f5f3ee;
          }
          .mail-container .logo-container {
              margin: 0 auto;
              padding-top: 10vh;
              width: 17%;
          }
          .mail-container .logo-container img {
              object-fit: cover;
              width: 100%;
          }
          .mail-container .text-container {
              width: 75%;
              margin: auto;
              margin-top: 2%;
          }
          .mail-container .text-container h2 {
              font-size: 30px;
              font-weight: 400;
              color: #6f3289;
              margin-top: 2%;
              margin-bottom: 2%;
          }
               .mail-container .text-container li {
              font-size: 20px;
              font-weight: 400;
              color: #6f3289;
              margin-top: 2%;
              margin-bottom: 2%;
          }
          .mail-container .text-container p {
              font-size: 20px;
          }
          .mail-container .button-container {
              width: fit-content;
              margin: 0 auto;
              margin-top: 8%;
              margin-bottom: 10vh;
          }
          .mail-container .button-container a {
              background-color: #4dada6;
              color: #ffff;
              font-size: 17px;
              font-weight: 600;
              padding: 2.5vh;
              border-radius: 30px;
              border: none;
              padding-inline: 3vw;
              width: 20vw;
              text-decoration: none;
          }
          .mailer-footer {
              width: 100%;
               background-color: #f5f3ee;
               padding-top:6vh;
          }
         
          table {
              width: 100%;
              border-collapse: collapse;
               background-color: #f5f3ee;
               padding-top:6vh;
               padding-bottom:6vh;
          }
          td {
              text-align: center;
              vertical-align: middle;
          }
          .footer-img {
              width: auto;
              height: 30px;
              margin: 0 10px;
          }
          .left-img {
              text-align: left;
          }
          .right-img {
              text-align: right;
          }
          .bottom-container {
              width: 100%;
              text-align: center;
              font-size: 15px;
              padding-top: 1%;
              padding-bottom: 1%;
              background-color: #f5f3ee;
          }

          @media (max-width: 768px) {
          .mail-container {
              width: 100%;
          }
              
          }

      </style>
  </head>
  <body>
      <div class="mail-container">
          <div class="logo-container">
              <img src="${nlvLogo}" alt="logo" />
          </div>
          <div class="text-container">
              <p>Hola ${name},</p>
              <h2>${title}</h2>
              ${plans.map((item) => {
                return `<li>${item}</li>`;
              })}
              <p>${content}</p>
          </div>

          <div class="button-container">
              <a href="${link}" target="_blank" class="button">Formulario</a>
          </div>


              <div class="text-container">
              <p>Saludos</p>
              <p>Lic. Abril Sack</p>
          </div>


          <div class="mailer-footer">
              <table>
                  <tr>
                      <td class="left-img">
                          <img src="${nlvLogo}" alt="logo" class="footer-img" style="margin-left: 30px; height: 50px;" />
                      </td>
                      <td class="right-img">
                          <img src="${instagramLogo}" alt="logo" class="footer-img" style="margin-right: 60px; height: 30px;" />
                          <img src="${facebookLogo}" alt="logo" class="footer-img" style="margin-right: 60px; height: 30px;" />
                          <img src="${linkedingLogo}" alt="logo" class="footer-img" style="margin-right: 60px; height: 30px;" />
                      </td>
                    </tr>
              </table>
              <div class="bottom-container">
                  <p>© 2024 Nutriendo la vida. Todos los derechos reservados</p>
              </div>
          </div>
      </div>
  </body>
  </html>`;
}
