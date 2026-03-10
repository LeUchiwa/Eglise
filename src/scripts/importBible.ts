import { createClient } from '@supabase/supabase-js';
import bibleData from '../data/louis-segond.json' with { type: 'json' };

const supabaseUrl = 'https://cmszlrjbgozgmswhtyeb.supabase.co';
const supabaseKey = 'sb_publishable_T1dkK5rTaelXEzGRXhJIkw_VRibRKUe';

const supabase = createClient(supabaseUrl, supabaseKey);

async function importBible() {
  console.log('📖 Import de la Bible en cours...');
  
  if (!Array.isArray(bibleData)) {
    console.error('❌ Format incorrect');
    return;
  }

  console.log(`📚 ${bibleData.length} livres trouvés`);
  
  let total = 0;
  let errors = 0;

  for (const book of bibleData) {
    console.log(`📚 Import de ${book.book}...`);
    
    for (let chapterIdx = 0; chapterIdx < book.chapters.length; chapterIdx++) {
      const chapterNum = chapterIdx + 1;
      const verses = book.chapters[chapterIdx];
      
      for (let verseIdx = 0; verseIdx < verses.length; verseIdx++) {
        const verseNum = verseIdx + 1;
        
        const { error } = await supabase
          .from('bible_verses')
          .insert({
            book: book.book,
            chapter: chapterNum,
            verse: verseNum,
            text: verses[verseIdx],
            translation: 'LSG'
          });
        
        if (error) {
          console.error(`❌ Erreur ${book.book} ${chapterNum}:${verseNum}`, error.message);
          errors++;
        } else {
          total++;
          if (total % 10 === 0) {
            console.log(`✅ ${total} versets importés...`);
          }
        }
      }
    }
  }
  
  console.log(`\n🎉 Import terminé ! ${total} versets importés, ${errors} erreurs.`);
}

importBible().catch(console.error);