const ArticleSchema = require('./article.js');
const NoteSchema = require('./note.js');
module.exports = {
  Article: ArticleSchema.Article,
  Note: NoteSchema.Note
}
