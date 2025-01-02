import { instagramLogo, linkedingLogo, nlvLogo } from "./encodedImages";

interface LinkOptions {
  title: string;
  link: string;
}

interface MailTemplate {
  name: string;
  title: string;
  content: string[];
  plans: string[];
  links: LinkOptions[];
  ebookLinks: LinkOptions[];
  detoxChallenge: LinkOptions | null;
}

interface AdminMail {
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  plans: string[];
}

const nlvLink = "https://nutriendolavida-front-20b7d4f270ae.herokuapp.com/";
const instagramLink = "https://www.instagram.com/nutriendolavida/";
const facebookLink = "https://www.instagram.com/nutriendolavida/";
const linkedinLink =
  "https://www.linkedin.com/in/abril-agustina-sack-44642b142/";

export function MailTemplate({
  name,
  title,
  plans,
  content,
  links,
  ebookLinks,
  detoxChallenge,
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
              width: 80%;
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
              margin-top: 1%;
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
              font-size: 19px;
          }
          .mail-container .button-container {
              width: 75%;
              margin: 0 auto;
              margin-top: 3vh;
              margin-bottom: 3vh;
          }
          .mail-container .button-container a {
              color: #4dada6;
              font-size: 17px;
              font-weight: 600;
              padding: 2.5vh;
              border-radius: 30px;
              border: none;
              padding-inline: 3vw;
              width: fit-content;;
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

          td a{
           text-decoration: none;
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
              ${plans
                .map((item) => {
                  return `<li>${item}</li>`;
                })
                .join("")}
              ${content
                .map((item) => {
                  return `<p>${item}</p>`;
                })
                .join("")}
          </div>

              ${
                links.length > 0
                  ? ` <div class="text-container">
                <p><strong>Completa tu formulario:</strong></p>
           
          </div>`
                  : ""
              }
           ${
             links &&
             links
               .map((item) => {
                 return ` <div class="button-container">
              <a href="${item.link}" target="_blank" class="button">Plan: ${item.title}</a>
          </div>`;
               })
               .join("")
           }


                ${
                  ebookLinks.length > 0
                    ? ` <div class="text-container">
                <p><strong>Descarga tu ebook:</strong></p>
           
          </div>`
                    : ""
                }

           ${
             ebookLinks &&
             ebookLinks
               .map((item) => {
                 return ` <div class="button-container">
              <a href="${item.link}" target="_blank" class="button">Ebook: ${item.title}</a>
          </div>`;
               })
               .join("")
           }




               ${
                 !!detoxChallenge
                   ? ` <div class="text-container">
                <p><strong>Descarga tu Plan Detox:</strong></p>
           
          </div>`
                   : ""
               }

           ${
             !!detoxChallenge &&
             ` <div class="button-container">
              <a href="${detoxChallenge.link}" target="_blank" class="button"> ${detoxChallenge.title}</a>
          </div>`
           }


         
              <div class="text-container">
                <p>Hoy es el primer dia de un nuevo comienzo!!!!</p>
              <p>Te saluda</p>
              <p>Lic. Abril Sack</p>
          </div>


          <div class="mailer-footer">
              <table>
                  <tr>
                      <td class="left-img">
                          <a href=${nlvLink} target="_blank">
                              <img src="${nlvLogo}" alt="logo" class="footer-img" style="margin-left: 30px; height: 50px;" />
                          </a>
                      </td>
                      <td class="right-img">
                          <a href=${instagramLink} target="_blank">
                              <img src=${instagramLogo} alt="Instagram" class="footer-img" style="margin-right: 30px; height: 30px;" />
                          </a>
                          
                          <a href=${linkedinLink} target="_blank">
                              <img src=${linkedingLogo} alt="LinkedIn" class="footer-img" style="margin-right: 30px; height: 30px;" />
                          </a>
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

export function AdminMailTemplate({
  name,
  lastname,
  email,
  phone,
  plans,
}: AdminMail) {
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
             width: 80%;
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
             margin-top: 1%;
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
             font-size: 19px;
         }
         .mail-container .button-container {
             width: fit-content;
             margin-top: 3vh;
             margin-bottom: 3vh;
         }
         .mail-container .button-container a {
             color: #4dada6;
             font-size: 17px;
             font-weight: 600;
             padding: 2.5vh;
             border-radius: 30px;
             border: none;
             padding-inline: 3vw;
             width: 50%;
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
        
             <h2>Nueva venta realizada:</h2>
             ${plans
               .map((item) => {
                 return `<li>${item}</li>`;
               })
               .join("")}
             <br/>

             <p><strong>Datos del cliente:</strong></p>
            <p>Nombre:${name}</p>
            <p>Apellido:${lastname}</p>
            <p>email:${email}</p>
           ${phone ? `<p>Telefono:${phone}</p>` : ""}

         </div>





            
         <div class="mailer-footer">
            <table>
                  <tr>
                      <td class="left-img">
                          <a href=${nlvLink} target="_blank">
                              <img src="${nlvLogo}" alt="logo" class="footer-img" style="margin-left: 30px; height: 50px;" />
                          </a>
                      </td>
                      <td class="right-img">
                          <a href=${instagramLink} target="_blank">
                              <img src=${instagramLogo} alt="Instagram" class="footer-img" style="margin-right: 30px; height: 30px;" />
                          </a>
                          
                          <a href=${linkedinLink} target="_blank">
                              <img src=${linkedingLogo} alt="LinkedIn" class="footer-img" style="margin-right: 30px; height: 30px;" />
                          </a>
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
