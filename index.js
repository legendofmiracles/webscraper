const cheerio = require('cheerio');
const fs = require('fs');
const discord = require('discord.js')

fs.readFile('/home/legendofmiracles/programming/nodejs/webscraper/out.html', 'utf8', function (err, data) {
  const id = '---';
  const token = '---'
  if (err) throw err;
  var $ = cheerio.load(data);
  var dataFromScrape = $('#myform').find('p').next().first().text().trim();
  console.log(dataFromScrape);
  var file = fs.readFileSync('/home/user/_tmp/scrape', function (err) {
    if (err) throw err
  });
  console.log(file.toString().trim());
  if (file != dataFromScrape) {
    console.log("true")
    new discord.WebhookClient(id, token).send('Neue Hausaufgaben :( Link: ---').catch(console.error);
    fs.writeFile("/home/user/_tmp/scrape", dataFromScrape, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  } else {
    fs.writeFile("/home/user/_tmp/scrape", dataFromScrape, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      new discord.WebhookClient(id, token).send('Nichts hat sich geandert :)').catch(console.error);
    });
  }
});