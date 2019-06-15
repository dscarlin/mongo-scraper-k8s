module.exports = (cheerio, axios, db, router) => {
  // routes -- mig
  router.get('/getData/:type', (req, res) => {
    let bool = req.params.type === 'true' || false
    let query = { saved: bool }
    db.Article.find(query).populate('notes')
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  })

  // mark article as saved in database
  router.put('/saveArticle', (req, res) => {
    let { _id } = req.body
    db.Article.update({ _id },
      { $set: { saved: true } },
      (err, data) => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true, data: data })
      });
  })

  //
  router.put('/removeArticle', (req, res) => {
    let { _id } = req.body
    db.Article.findOne({ _id },
      (err, doc) => {
        console.log(doc)
        doc.remove()
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true, data: doc })
      });
  })
  router.put('/addNote', (req, res) => {
    let { title, body, _id } = req.body
    console.log(req.body)
    db.Note.create({ title, body })
      .then(dbNote => {
        // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id }, { $push: { notes: dbNote._id } }, { new: true });
      })
      .then((dbUser) => {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch((err) =>  {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  })
  router.put('/removeNote', (req, res) => {
    console.log(req.body)
    db.Note.findOne({ _id: req.body.noteId },
      (err, doc) => {
        console.log(doc)
        doc.remove()
        if (err) return res.json({ success: false, error: err })
        db.Article.findOneAndUpdate({ _id: req.body.articleId }, { $pull: { notes: req.body.noteId } })
          .then((result) => {
            // If the User was updated successfully, send it back to the client
            res.json(result);
          })
          .catch((err) => {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });
  })
  router.delete('/clearArticles', (req, res) => {
    db.Article.find(
      (err, docs) => {
        console.log(docs)
        docs.forEach(doc => doc.remove());
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true, data: docs })
      });
  })
  router.get('/scrape', (req, res) => {
    axios.get('https://www.huffpost.com/').then(function (response) {
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      var results = [];

      // Select each element in the HTML body from which you want information.
      // NOTE: Cheerio selectors function similarly to jQuery's selectors,
      // but be sure to visit the package's npm page to see how it works
      $('div.card.card--media-left.card--standard.card--twilight.js-card.yr-card').each(function (i, element) {
        var image = $(element).find('img.card__image__src').attr('src');
        var category = $(element).find('span.card__label__text').text();
        var title = $(element).find('div.card__headline__text').text();
        var caption = $(element).find('div.card__description').text();
        var link = $(element).find('a.card__image__wrapper.js-hover-intent-image.yr-card-image').attr('href');
        var author = $(element).find('a.author-list__link').text();
        var authorLink = $(element).find('a.author-list__link').attr('href');

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          image,
          category,
          title,
          caption,
          link,
          author,
          authorLink
        });
      });
      let docArray = []
      results.forEach(doc => {
        let { image, category, title, caption, link, author, authorLink } = doc
        docArray.push({
          updateOne: {
            filter: doc,
            update: {
              $set: { image, category, title, caption, link, author, authorLink }
            },
            upsert: true,
            setDefaultsOnInsert: true
          }
        })
      })

      db.Article.bulkWrite(docArray, (err, result) => {
      // let bulk = db.Article.collection.initializeOrderedBulkOp()
      // for (let i = 0; i < results.length; i++) {
      //   let { image, category, title, caption, link, author, authorLink } = results[i]
      //   bulk.find(results[i]).upsert().updateOne({ $set: { image, category, title, caption, link, author, authorLink } })
      // }
      // bulk.execute((err, result) => {
      //   console.log(err)
      //   console.log(result)
        // eslint-disable-next-line curly
        if (err)
          res.json(err)
        // eslint-disable-next-line curly
        else
          res.json(result)
      })
    })
  })
}