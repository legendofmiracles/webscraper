const cheerio = require('cheerio');
const fs = require('fs');
const discord = require('discord.js')
const os = require('os')

fs.readFile(os.homedir()+ '/programming/nodejs/webscraper/out.html', 'utf8', function (err, data) {
  const id = '--';
  const token = '---'
  if (err) throw err;
  var $ = cheerio.load(data);
  console.log(data)
  var dataFromScrape = $('#myform').find('p').next().first().text().trim();
  
  console.log(dataFromScrape);
  
  var file = fs.readFileSync(os.homedir()+'/scrape/scrape', function (err) {
    if (err) throw err
  });

  console.log(file.toString().trim());
  if (file != dataFromScrape) {
    console.log("true")
    new discord.WebhookClient(id, token).send('Neue Hausaufgaben :( Link: http://kkst.s.schule-bw.de/homeoffice/').catch(console.error);
    fs.writeFile(os.homedir()+ '/scrape/scrape', dataFromScrape, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
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