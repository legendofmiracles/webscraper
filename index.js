const cheerio = require('cheerio');
const fs = require('fs');
const discord = require('discord.js')

fs.readFile('/home/legendofmiracles/programming/nodejs/webscraper/out.html', 'utf8', function (err, data) {
  const id = '689718224933486595';
  const token = 's8KjzvGZFaOVwZL6F1DzJGu8Gxfqg2EZAcd_unAlG7WBZjJ4TPiFYQrCogB0_FczzKmr'
  if (err) throw err;
  var $ = cheerio.load(data);
  var dataFromScrape = $('#myform').find('p').next().first().text().trim();
  console.log(dataFromScrape);
  var file = fs.readFileSync('/home/legendofmiracles/_tmp/scrape', function (err) {
    if (err) throw err
  });
  console.log(file.toString().trim());
  if (file != dataFromScrape) {
    console.log("true")
    new discord.WebhookClient(id, token).send('Neue Hausaufgaben :( Link: http://kkst.s.schule-bw.de/homeoffice/').catch(console.error);
    fs.writeFile("/home/legendofmiracles/_tmp/scrape", dataFromScrape, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  } else {
    fs.writeFile("/home/legendofmiracles/_tmp/scrape", dataFromScrape, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      new discord.WebhookClient(id, token).send('Nichts hat sich geandert :)').catch(console.error);
    });
  }
});