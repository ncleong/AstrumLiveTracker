const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 6000)); // Wait for scripts
  
  // Dump data variable
  let currentData = await page.evaluate(() => {
     return typeof data !== 'undefined' ? data : "UNDEFINED";
  });
  console.log("DATA VALUE IS:", currentData);
  
  await browser.close();
})();
