import express from 'express';
import Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import * as admin from 'firebase-admin';

const projectId = process.env.GCP_PROJECT;

const router = express.Router();

router.post('/', async (req, res) => {
  const { json, template } = req.body;
  try {
    const handlebar = Handlebars.compile(template);
    Handlebars.registerHelper('indexHelper', (index) => {
      return index + 1;
    });
    const renderedPage = handlebar(json);
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROMIUM_PATH,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(renderedPage);
    const pdf = await page.pdf({ format: 'a4', preferCSSPageSize: true });
    const newId = admin.firestore().collection('medias').doc().id;
    const path = `media/${newId}/${newId}.pdf`;
    const newMedia = {
      path: path,
      name: `${newId}.pdf`,
      type: 'application/pdf',
      size: pdf.byteLength,
      set_at: new Date(),
      extension: 'pdf',
    };
    await admin.storage().bucket('gs://com-b2allsolution-autolive.appspot.com/').file(path).save(pdf, { contentType: 'application/pdf' });
    await admin.firestore().collection('medias').doc(newId).set(newMedia);
    await page.close();
    await browser.close();
    res.status(200).send({ message: 'success', status: 'success', data: { media_id: newId } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
});

export const v1 = router;
