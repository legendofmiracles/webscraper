/* eslint-disable no-undef */
const cheerio = require('cheerio');
const fs = require('fs');
const discord = require('discord.js')
const os = require('os')
require('dotenv').config()
const diff = require('diff')
fs.readFile(os.homedir()+ '/programming/nodejs/webscraper/out.html', 'utf8', function (err, data) {
  if (err) throw err;
  var $ = cheerio.load(data);
  
  var dataFromScrape = $('#myform').find('p').next().next().next().text().trim();
  
  console.log(dataFromScrape + "\n");
  
  var file = fs.readFileSync(os.homedir()+'/scrape/scrape', function (err) {
    if (err) throw err
  });

  console.log(file.toString().trim());
  if (file != dataFromScrape) {
    console.log("true")
    fs.writeFileSync(os.homedir()+ '/scrape/scrape', dataFromScrape, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    var difference = diff.diffChars(file.toString(), dataFromScrape.toString());
    console.log(difference[0].value)
    const id = process.env.id;
    const token = process.env.token
    console.log(id)
    console.log(token)
    new discord.WebhookClient(id, token).send('Neue Hausaufgaben :( Link: http://kkst.s.schule-bw.de/homeoffice/ Es hat kamen dazu:' + difference[0].value).catch(console.error);
  } else {
    fs.writeFile(os.homedir() + '/scrape/scrape', dataFromScrape, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("false")
      console.log("The file was saved!");
      //new discord.WebhookClient(id, token).send('Nichts hat sich geandert :)').catch(console.error);
    });
  }
});