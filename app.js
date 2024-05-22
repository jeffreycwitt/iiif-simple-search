const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const queryParam = req.query.q;
  const dataDir = path.join(__dirname, 'data');
  let bigJson = [];

  fs.readdir(dataDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while reading the directory.' });
    }

    files.forEach((file, index) => {
      if (path.extname(file) === '.json') {
        const filePath = path.join(dataDir, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        bigJson = bigJson.concat(fileData.resources);
      }

      // if (index === files.length - 1) {
      //   res.json({ message: 'Hello, world!', query: queryParam, data: bigJsonObject });
      // }
    });

    const results = [];

    bigJson.forEach((r) => {
      if (r.resource.chars?.toLowerCase().includes(queryParam.toLowerCase())) {
        results.push(r);
      }
    })

    returnObject = { 
      "@context": "http://iiif.io/api/search/2/context.json",
      "@id": "https://iiifsearch.example.org",
      "@type": "sc:AnnotationList",
      "label": "SearchResults",
      "within": {
        "@id": `https://iiifsimplesearch.org?q=${queryParam}`,
        "@type": "sc:Layer",
        "total": results.length,
        // "first": "https://exist.scta.info/exist/apps/scta-app/iiif2/lon/search?q=potest&page=1&codex=lon",
        // "last": "https://exist.scta.info/exist/apps/scta-app/iiif2/lon/search?q=potest&page=315&codex=lon"
      },
      // "next": "https://exist.scta.info/exist/apps/scta-app/iiif2/lon/search?q=potest&page=2&codex=lon",
      // "prev": "https://exist.scta.info/exist/apps/scta-app/iiif2/lon/search?q=potest&page=315&codex=lon",
      // "startIndex": 0,
      "resources": results
    };
    res.json(returnObject);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

