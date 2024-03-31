// for custom server

// require('dotenv').config();
// const fs = require('fs');
// const path = require('path');
// // const axios = require('axios');
// const express = require('express');

// const app = express();

// const port = process.env.NEXT_PUBLIC_PORT || 3000;
// // const currentApi = process.env.API_URL;
// const indexPath = path.resolve(__dirname, 'build', 'index.html');
// const pathBuild = path.resolve(__dirname, 'build');
// const errorMessage = 'Error during file reading';
// // const widthImage = 100;
// // const heightImage = 100;
// const initialTitle = 'title';
// // const description = 'description';

// // example add meta-tags
// // const getFacts = async message => {
// //   try {
// //     const response = await axios.get(`${currentApi}/test/${message}`);
// //     return response;
// //   } catch (error) {
// //     console.log('errorGetFactsInApp.js', error);
// //   }
// // };

// // app.get('/page/*', async (req, res) => {
// //   const message = req.params['0'];
// //   const card = await getFacts(message);

// //   res.setHeader('content-type', 'text/html');
// //   fs.readFile(indexPath, 'utf8', (err, htmlData) => {
// //     if (err) {
// //       console.error(errorMessage, err);
// //       return res.status(404).end();
// //     }
// //     if (!card) return res.send(htmlData);

// //     htmlData = htmlData
// //       .replace('__META_OG_HEIGHT__', heightImage)
// //       .replace('__META_OG_WIDTH__', widthImage)
// //       .replace('__META_OG_TITLE__', card.data.name)
// //       .replace('__META_OG_DESCRIPTION__', description)
// //       .replace('__META_DESCRIPTION__', description)
// //       .replace('__META_OG_IMAGE__', card.data.image);
// //     return res.send(htmlData);
// //   });
// // });

// app.get(/\.(json|js|css|ico|svg|png|pdf|webp|ttf|txt|map)$/, (req, res) => {
//   res.sendFile(pathBuild + req.url.split(/test|test|test/).at(-1));
// });

// app.get('*', (req, res) => {
//   res.setHeader('content-type', 'text/html');
//   fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//     if (err) {
//       console.error(errorMessage, err);
//       return res.status(404).end();
//     }
//     htmlData = htmlData.replace(
//       '<title>Pattern</title>',
//       `<title>${initialTitle}</title>`,
//     );
//     // .replace('__META_OG_TITLE__', initialTitle)
//     // .replace('__META_OG_DESCRIPTION__', description)
//     // .replace('__META_DESCRIPTION__', description);
//     return res.send(htmlData);
//   });
// });

// app.listen(port, err => {
//   if (err) return console.log('errorStartPort', err);
//   console.log(`Server running on port ${port}`);
// });
