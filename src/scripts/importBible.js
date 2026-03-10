import { createClient } from '@supabase/supabase-js';
const bibleData = require('../data/louis-segond.json');

const supabaseUrl = 'https://cmszlrjbgozgmswhtyeb.supabase.co';
const supabaseKey = 'sb_publishable_T1dkK5rTaelXEzGRXhJIkw_VRibRKUe';

const supabase = createClient(supabaseUrl, supabaseKey);

async function importBible() {
  console.log('📖 Import de la Bible en cours...');
  
  let total = 0;
  let errors = 0;

  for (const book of bibleData) {
    console.log(`📚 Import de ${book.name}...`);
    
    for (const chapter of book.chapters) {
      const chapterNum = chapter.number;
      
      for (let i = 0; i < chapter.verses.length; i++) {
        const verseText = chapter.verses[i];
        const verseNum = i + 1;
        
        const { error } = await supabase
          .from('bible_verses')
          .insert({
            book: book.name,
            chapter: chapterNum,
            verse: verseNum,
            text: verseText,
            translation: 'LSG'
          });
        
        if (error) {
          console.error(`❌ Erreur ${book.name} ${chapterNum}:${verseNum}`, error);
          errors++;
        } else {
          total++;
          if (total % 1000 === 0) {
            console.log(`✅ ${total} versets importés...`);
          }
        }
      }
    }
  }
  
  console.log(`\n🎉 Import terminé ! ${total} versets importés, ${errors} erreurs.`);
}

importBible().catch(console.error);