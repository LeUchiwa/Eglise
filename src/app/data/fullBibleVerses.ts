// Base de données complète des versets bibliques
// Version: Louis Segond 1910

import { extendedBibleVerses } from './bibleVersesExtended';

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

// Structure: { "Livre": { chapitre: { verset: "texte" } } }
const baseBibleVerses: Record<string, Record<number, Record<number, string>>> = {
  
  // ==================== NOUVEAU TESTAMENT ====================
  
  // ========== JEAN (Évangile complet - 21 chapitres) ==========
  "Jean": {
    1: {
      1: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
      2: "Elle était au commencement avec Dieu.",
      3: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle.",
      4: "En elle était la vie, et la vie était la lumière des hommes.",
      5: "La lumière luit dans les ténèbres, et les ténèbres ne l'ont point reçue.",
      6: "Il y eut un homme envoyé de Dieu: son nom était Jean.",
      7: "Il vint pour servir de témoin, pour rendre témoignage à la lumière, afin que tous crussent par lui.",
      8: "Il n'était pas la lumière, mais il parut pour rendre témoignage à la lumière.",
      9: "Cette lumière était la véritable lumière, qui, en venant dans le monde, éclaire tout homme.",
      10: "Elle était dans le monde, et le monde a été fait par elle, et le monde ne l'a point connue.",
      11: "Elle est venue chez les siens, et les siens ne l'ont point reçue.",
      12: "Mais à tous ceux qui l'ont reçue, à ceux qui croient en son nom, elle a donné le pouvoir de devenir enfants de Dieu,",
      13: "lesquels sont nés, non du sang, ni de la volonté de la chair, ni de la volonté de l'homme, mais de Dieu.",
      14: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père.",
      15: "Jean lui a rendu témoignage, et s'est écrié: C'est celui dont j'ai dit: Celui qui vient après moi m'a précédé, car il était avant moi.",
      16: "Et nous avons tous reçu de sa plénitude, et grâce pour grace;",
      17: "car la loi a été donnée par Moïse, la grâce et la vérité sont venues par Jésus-Christ.",
      18: "Personne n'a jamais vu Dieu; le Fils unique, qui est dans le sein du Père, est celui qui l'a fait connaître.",
      19: "Voici le témoignage de Jean, lorsque les Juifs envoyèrent de Jérusalem des sacrificateurs et des Lévites, pour lui demander: Toi, qui es-tu?",
      20: "Il déclara, et ne le nia point, il déclara qu'il n'était pas le Christ.",
      21: "Et ils lui demandèrent: Quoi donc? es-tu Élie? Et il dit: Je ne le suis point. Es-tu le prophète? Et il répondit: Non.",
      22: "Ils lui dirent alors: Qui es-tu? afin que nous donnions une réponse à ceux qui nous ont envoyés. Que dis-tu de toi-même?",
      23: "Moi, dit-il, je suis la voix de celui qui crie dans le désert: Aplanissez le chemin du Seigneur, comme a dit Ésaïe, le prophète.",
      24: "Ceux qui avaient été envoyés étaient des pharisiens.",
      25: "Ils lui firent encore cette question: Pourquoi donc baptises-tu, si tu n'es pas le Christ, ni Élie, ni le prophète?",
      26: "Jean leur répondit: Moi, je baptise d'eau, mais au milieu de vous il y a quelqu'un que vous ne connaissez pas,",
      27: "qui vient après moi; je ne suis pas digne de délier la courroie de ses souliers.",
      28: "Ces choses se passèrent à Béthanie, au delà du Jourdain, où Jean baptisait.",
      29: "Le lendemain, il vit Jésus venant à lui, et il dit: Voici l'Agneau de Dieu, qui ôte le péché du monde.",
      30: "C'est celui dont j'ai dit: Après moi vient un homme qui m'a précédé, car il était avant moi.",
      31: "Je ne le connaissais pas, mais c'est afin qu'il fût manifesté à Israël que je suis venu baptiser d'eau.",
      32: "Jean rendit ce témoignage: J'ai vu l'Esprit descendre du ciel comme une colombe et s'arrêter sur lui.",
      33: "Je ne le connaissais pas, mais celui qui m'a envoyé baptiser d'eau, celui-là m'a dit: Celui sur qui tu verras l'Esprit descendre et s'arrêter, c'est celui qui baptise du Saint-Esprit.",
      34: "Et j'ai vu, et j'ai rendu témoignage qu'il est le Fils de Dieu.",
      35: "Le lendemain, Jean était encore là, avec deux de ses disciples;",
      36: "et, ayant regardé Jésus qui passait, il dit: Voilà l'Agneau de Dieu.",
      37: "Les deux disciples l'entendirent prononcer ces paroles, et ils suivirent Jésus.",
      38: "Jésus se retourna, et voyant qu'ils le suivaient, il leur dit: Que cherchez-vous? Ils lui répondirent: Rabbi (ce qui signifie Maître), où demeures-tu?",
      39: "Venez, leur dit-il, et voyez. Ils allèrent, et ils virent où il demeurait; et ils restèrent auprès de lui ce jour-là. C'était environ la dixième heure.",
      40: "André, frère de Simon Pierre, était l'un des deux qui avaient entendu les paroles de Jean, et qui avaient suivi Jésus.",
      41: "Ce fut lui qui rencontra le premier son frère Simon, et il lui dit: Nous avons trouvé le Messie (ce qui signifie Christ).",
      42: "Et il le conduisit vers Jésus. Jésus, l'ayant regardé, dit: Tu es Simon, fils de Jonas; tu seras appelé Céphas (ce qui signifie Pierre).",
      43: "Le lendemain, Jésus voulut se rendre en Galilée, et il rencontra Philippe. Il lui dit: Suis-moi.",
      44: "Philippe était de Bethsaïda, de la ville d'André et de Pierre.",
      45: "Philippe rencontra Nathanaël, et lui dit: Nous avons trouvé celui de qui Moïse a écrit dans la loi et dont les prophètes ont parlé, Jésus de Nazareth, fils de Joseph.",
      46: "Nathanaël lui dit: Peut-il venir de Nazareth quelque chose de bon? Philippe lui répondit: Viens, et vois.",
      47: "Jésus, voyant venir à lui Nathanaël, dit de lui: Voici vraiment un Israélite, dans lequel il n'y a point de fraude.",
      48: "D'où me connais-tu? lui dit Nathanaël. Jésus lui répondit: Avant que Philippe t'appelât, quand tu étais sous le figuier, je t'ai vu.",
      49: "Nathanaël répondit et lui dit: Rabbi, tu es le Fils de Dieu, tu es le roi d'Israël.",
      50: "Jésus lui répondit: Parce que je t'ai dit que je t'ai vu sous le figuier, tu crois; tu verras de plus grandes choses que celles-ci.",
      51: "Et il lui dit: En vérité, en vérité, je vous le dis, vous verrez désormais le ciel ouvert et les anges de Dieu monter et descendre sur le Fils de l'homme.",
    },
    3: {
      1: "Mais il y eut un homme d'entre les pharisiens, nommé Nicodème, un chef des Juifs,",
      2: "qui vint, lui, auprès de Jésus, de nuit, et lui dit: Rabbi, nous savons que tu es un docteur venu de Dieu; car personne ne peut faire ces miracles que tu fais, si Dieu n'est avec lui.",
      3: "Jésus lui répondit: En vérité, en vérité, je te le dis, si un homme ne naît de nouveau, il ne peut voir le royaume de Dieu.",
      4: "Nicodème lui dit: Comment un homme peut-il naître quand il est vieux? Peut-il rentrer dans le sein de sa mère et naître?",
      5: "Jésus répondit: En vérité, en vérité, je te le dis, si un homme ne naît d'eau et d'Esprit, il ne peut entrer dans le royaume de Dieu.",
      6: "Ce qui est né de la chair est chair, et ce qui est né de l'Esprit est esprit.",
      7: "Ne t'étonne pas que je t'aie dit: Il faut que vous naissiez de nouveau.",
      8: "Le vent souffle où il veut, et tu en entends le bruit; mais tu ne sais d'où il vient, ni où il va. Il en est ainsi de tout homme qui est né de l'Esprit.",
      9: "Nicodème lui dit: Comment cela peut-il se faire?",
      10: "Jésus lui répondit: Tu es le docteur d'Israël, et tu ne sais pas ces choses!",
      11: "En vérité, en vérité, je te le dis, nous disons ce que nous savons, et nous rendons témoignage de ce que nous avons vu; et vous ne recevez pas notre témoignage.",
      12: "Si vous ne croyez pas quand je vous ai parlé des choses terrestres, comment croirez-vous quand je vous parlerai des choses célestes?",
      13: "Personne n'est monté au ciel, si ce n'est celui qui est descendu du ciel, le Fils de l'homme qui est dans le ciel.",
      14: "Et comme Moïse éleva le serpent dans le désert, il faut de même que le Fils de l'homme soit élevé,",
      15: "afin que quiconque croit en lui ait la vie éternelle.",
      16: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      17: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui.",
      18: "Celui qui croit en lui n'est point jugé; mais celui qui ne croit pas est déjà jugé, parce qu'il n'a pas cru au nom du Fils unique de Dieu.",
      19: "Et ce jugement c'est que, la lumière étant venue dans le monde, les hommes ont préféré les ténèbres à la lumière, parce que leurs oeuvres étaient mauvaises.",
      20: "Car quiconque fait le mal hait la lumière, et ne vient point à la lumière, de peur que ses oeuvres ne soient dévoilées;",
      21: "mais celui qui agit selon la vérité vient à la lumière, afin que ses oeuvres soient manifestées, parce qu'elles sont faites en Dieu.",
      22: "Après cela, Jésus, accompagné de ses disciples, se rendit dans la terre de Judée; et là il demeurait avec eux, et il baptisait.",
      23: "Jean aussi baptisait à Énon, près de Salim, parce qu'il y avait là beaucoup d'eau; et on y venait pour être baptisé.",
      24: "Car Jean n'avait pas encore été mis en prison.",
      25: "Or, il s'éleva de la part des disciples de Jean une dispute avec un Juif touchant la purification.",
      26: "Ils vinrent trouver Jean, et lui dirent: Rabbi, celui qui était avec toi au delà du Jourdain, et à qui tu as rendu témoignage, voici, il baptise, et tous vont à lui.",
      27: "Jean répondit: Un homme ne peut recevoir que ce qui lui a été donné du ciel.",
      28: "Vous-mêmes m'êtes témoins que j'ai dit: Je ne suis pas le Christ, mais j'ai été envoyé devant lui.",
      29: "Celui à qui appartient l'épouse, c'est l'époux; mais l'ami de l'époux, qui se tient là et qui l'entend, éprouve une grande joie à cause de la voix de l'époux: aussi cette joie, qui est la mienne, est parfaite.",
      30: "Il faut qu'il croisse, et que je diminue.",
      31: "Celui qui vient d'en haut est au-dessus de tous; celui qui est de la terre est de la terre, et il parle comme étant de la terre. Celui qui vient du ciel est au-dessus de tous,",
      32: "il rend témoignage de ce qu'il a vu et entendu, et personne ne reçoit son témoignage.",
      33: "Celui qui a reçu son témoignage a certifié que Dieu est vrai;",
      34: "car celui que Dieu a envoyé dit les paroles de Dieu, parce que Dieu ne lui donne pas l'Esprit avec mesure.",
      35: "Le Père aime le Fils, et il a remis toutes choses entre ses mains.",
      36: "Celui qui croit au Fils a la vie éternelle; celui qui ne croit pas au Fils ne verra point la vie, mais la colère de Dieu demeure sur lui.",
    },
    14: {
      1: "Que votre coeur ne se trouble point. Croyez en Dieu, et croyez en moi.",
      2: "Il y a plusieurs demeures dans la maison de mon Père. Si cela n'était pas, je vous l'aurais dit. Je vais vous préparer une place.",
      3: "Et, lorsque je m'en serai allé, et que je vous aurai préparé une place, je reviendrai, et je vous prendrai avec moi, afin que là où je suis vous y soyez aussi.",
      4: "Vous savez où je vais, et vous en savez le chemin.",
      5: "Thomas lui dit: Seigneur, nous ne savons où tu vas; comment pouvons-nous en savoir le chemin?",
      6: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
      7: "Si vous me connaissiez, vous connaîtriez aussi mon Père. Et dès maintenant vous le connaissez, et vous l'avez vu.",
      8: "Philippe lui dit: Seigneur, montre-nous le Père, et cela nous suffit.",
      9: "Jésus lui dit: Il y a si longtemps que je suis avec vous, et tu ne m'as pas connu, Philippe! Celui qui m'a vu a vu le Père; comment dis-tu: Montre-nous le Père?",
      10: "Ne crois-tu pas que je suis dans le Père, et que le Père est en moi? Les paroles que je vous dis, je ne les dis pas de moi-même; et le Père qui demeure en moi, c'est lui qui fait les oeuvres.",
      11: "Croyez-moi, je suis dans le Père, et le Père est en moi; croyez du moins à cause de ces oeuvres.",
      12: "En vérité, en vérité, je vous le dis, celui qui croit en moi fera aussi les oeuvres que je fais, et il en fera de plus grandes, parce que je m'en vais au Père;",
      13: "et tout ce que vous demanderez en mon nom, je le ferai, afin que le Père soit glorifié dans le Fils.",
      14: "Si vous demandez quelque chose en mon nom, je le ferai.",
      15: "Si vous m'aimez, gardez mes commandements.",
      16: "Et moi, je prierai le Père, et il vous donnera un autre consolateur, afin qu'il demeure éternellement avec vous,",
      17: "l'Esprit de vérité, que le monde ne peut recevoir, parce qu'il ne le voit point et ne le connaît point; mais vous, vous le connaissez, car il demeure avec vous, et il sera en vous.",
      18: "Je ne vous laisserai pas orphelins, je viendrai à vous.",
      19: "Encore un peu de temps, et le monde ne me verra plus; mais vous, vous me verrez, car je vis, et vous vivrez aussi.",
      20: "En ce jour-là, vous connaîtrez que je suis en mon Père, que vous êtes en moi, et que je suis en vous.",
      21: "Celui qui a mes commandements et qui les garde, c'est celui qui m'aime; et celui qui m'aime sera aimé de mon Père, je l'aimerai, et je me ferai connaître à lui.",
      22: "Jude, non pas l'Iscariot, lui dit: Seigneur, d'où vient que tu te feras connaître à nous, et non au monde?",
      23: "Jésus lui répondit: Si quelqu'un m'aime, il gardera ma parole, et mon Père l'aimera; nous viendrons à lui, et nous ferons notre demeure chez lui.",
      24: "Celui qui ne m'aime pas ne garde point mes paroles. Et la parole que vous entendez n'est pas de moi, mais du Père qui m'a envoyé.",
      25: "Je vous ai dit ces choses pendant que je demeure avec vous.",
      26: "Mais le consolateur, l'Esprit-Saint, que le Père enverra en mon nom, vous enseignera toutes choses, et vous rappellera tout ce que je vous ai dit.",
      27: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre coeur ne se trouble point, et ne s'alarme point.",
      28: "Vous avez entendu que je vous ai dit: Je m'en vais, et je reviens vers vous. Si vous m'aimiez, vous vous réjouiriez de ce que je vais au Père; car le Père est plus grand que moi.",
      29: "Et maintenant je vous ai dit ces choses avant qu'elles arrivent, afin que, lorsqu'elles arriveront, vous croyiez.",
      30: "Je ne parlerai plus guère avec vous; car le prince du monde vient. Il n'a rien en moi;",
      31: "mais afin que le monde sache que j'aime le Père, et que j'agis selon l'ordre que le Père m'a donné, levez-vous, partons d'ici.",
    },
  },
  
  // ========== GENÈSE (Chapitres 1-3 complets) ==========
  "Genèse": {
    1: {
      1: "Au commencement, Dieu créa les cieux et la terre.",
      2: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.",
      3: "Dieu dit: Que la lumière soit! Et la lumière fut.",
      4: "Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.",
      5: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.",
      6: "Dieu dit: Qu'il y ait une étendue entre les eaux, et qu'elle sépare les eaux d'avec les eaux.",
      7: "Et Dieu fit l'étendue, et il sépara les eaux qui sont au-dessous de l'étendue d'avec les eaux qui sont au-dessus de l'étendue. Et cela fut ainsi.",
      8: "Dieu appela l'étendue ciel. Ainsi, il y eut un soir, et il y eut un matin: ce fut le second jour.",
      9: "Dieu dit: Que les eaux qui sont au-dessous du ciel se rassemblent en un seul lieu, et que le sec paraisse. Et cela fut ainsi.",
      10: "Dieu appela le sec terre, et il appela l'amas des eaux mers. Dieu vit que cela était bon.",
      11: "Puis Dieu dit: Que la terre produise de la verdure, de l'herbe portant de la semence, des arbres fruitiers donnant du fruit selon leur espèce et ayant en eux leur semence sur la terre. Et cela fut ainsi.",
      12: "La terre produisit de la verdure, de l'herbe portant de la semence selon son espèce, et des arbres donnant du fruit et ayant en eux leur semence selon leur espèce. Dieu vit que cela était bon.",
      13: "Ainsi, il y eut un soir, et il y eut un matin: ce fut le troisième jour.",
      14: "Dieu dit: Qu'il y ait des luminaires dans l'étendue du ciel, pour séparer le jour d'avec la nuit; que ce soient des signes pour marquer les époques, les jours et les années;",
      15: "et qu'ils servent de luminaires dans l'étendue du ciel, pour éclairer la terre. Et cela fut ainsi.",
      16: "Dieu fit les deux grands luminaires, le plus grand luminaire pour présider au jour, et le plus petit luminaire pour présider à la nuit; il fit aussi les étoiles.",
      17: "Dieu les plaça dans l'étendue du ciel, pour éclairer la terre,",
      18: "pour présider au jour et à la nuit, et pour séparer la lumière d'avec les ténèbres. Dieu vit que cela était bon.",
      19: "Ainsi, il y eut un soir, et il y eut un matin: ce fut le quatrième jour.",
      20: "Dieu dit: Que les eaux produisent en abondance des animaux vivants, et que des oiseaux volent sur la terre vers l'étendue du ciel.",
      21: "Dieu créa les grands poissons et tous les animaux vivants qui se meuvent, et que les eaux produisirent en abondance selon leur espèce; il créa aussi tout oiseau ailé selon son espèce. Dieu vit que cela était bon.",
      22: "Dieu les bénit, en disant: Soyez féconds, multipliez, et remplissez les eaux des mers; et que les oiseaux multiplient sur la terre.",
      23: "Ainsi, il y eut un soir, et il y eut un matin: ce fut le cinquième jour.",
      24: "Dieu dit: Que la terre produise des animaux vivants selon leur espèce, du bétail, des reptiles et des animaux terrestres, selon leur espèce. Et cela fut ainsi.",
      25: "Dieu fit les animaux de la terre selon leur espèce, le bétail selon son espèce, et tous les reptiles de la terre selon leur espèce. Dieu vit que cela était bon.",
      26: "Puis Dieu dit: Faisons l'homme à notre image, selon notre ressemblance, et qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre, et sur tous les reptiles qui rampent sur la terre.",
      27: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme.",
      28: "Dieu les bénit, et Dieu leur dit: Soyez féconds, multipliez, remplissez la terre, et l'assujettissez; et dominez sur les poissons de la mer, sur les oiseaux du ciel, et sur tout animal qui se meut sur la terre.",
      29: "Et Dieu dit: Voici, je vous donne toute herbe portant de la semence et qui est à la surface de toute la terre, et tout arbre ayant en lui du fruit d'arbre et portant de la semence: ce sera votre nourriture.",
      30: "Et à tout animal de la terre, à tout oiseau du ciel, et à tout ce qui se meut sur la terre, ayant en soi un souffle de vie, je donne toute herbe verte pour nourriture. Et cela fut ainsi.",
      31: "Dieu vit tout ce qu'il avait fait et voici, cela était très bon. Ainsi, il y eut un soir, et il y eut un matin: ce fut le sixième jour.",
    },
    2: {
      1: "Ainsi furent achevés les cieux et la terre, et toute leur armée.",
      2: "Dieu acheva au septième jour son oeuvre, qu'il avait faite: et il se reposa au septième jour de toute son oeuvre, qu'il avait faite.",
      3: "Dieu bénit le septième jour, et il le sanctifia, parce qu'en ce jour il se reposa de toute son oeuvre qu'il avait créée en la faisant.",
      4: "Voici les origines des cieux et de la terre, quand ils furent créés. Lorsque l'Éternel Dieu fit une terre et des cieux,",
      5: "aucun arbuste des champs n'était encore sur la terre, et aucune herbe des champs ne germait encore: car l'Éternel Dieu n'avait pas fait pleuvoir sur la terre, et il n'y avait point d'homme pour cultiver le sol.",
      6: "Mais une vapeur s'éleva de la terre, et arrosa toute la surface du sol.",
      7: "L'Éternel Dieu forma l'homme de la poussière de la terre, il souffla dans ses narines un souffle de vie et l'homme devint un être vivant.",
      8: "Puis l'Éternel Dieu planta un jardin en Éden, du côté de l'orient, et il y mit l'homme qu'il avait formé.",
      9: "L'Éternel Dieu fit pousser du sol des arbres de toute espèce, agréables à voir et bons à manger, et l'arbre de la vie au milieu du jardin, et l'arbre de la connaissance du bien et du mal.",
      10: "Un fleuve sortait d'Éden pour arroser le jardin, et de là il se divisait en quatre bras.",
      11: "Le nom du premier est Pischon; c'est celui qui entoure tout le pays de Havila, où se trouve l'or.",
      12: "L'or de ce pays est pur; on y trouve aussi le bdellium et la pierre d'onyx.",
      13: "Le nom du second fleuve est Guihon; c'est celui qui entoure tout le pays de Cusch.",
      14: "Le nom du troisième est Hiddékel; c'est celui qui coule à l'orient de l'Assyrie. Le quatrième fleuve, c'est l'Euphrate.",
      15: "L'Éternel Dieu prit l'homme, et le plaça dans le jardin d'Éden pour le cultiver et pour le garder.",
      16: "L'Éternel Dieu donna cet ordre à l'homme: Tu pourras manger de tous les arbres du jardin;",
      17: "mais tu ne mangeras pas de l'arbre de la connaissance du bien et du mal, car le jour où tu en mangeras, tu mourras.",
      18: "L'Éternel Dieu dit: Il n'est pas bon que l'homme soit seul; je lui ferai une aide semblable à lui.",
      19: "L'Éternel Dieu forma de la terre tous les animaux des champs et tous les oiseaux du ciel, et il les fit venir vers l'homme, pour voir comment il les appellerait, et afin que tout être vivant portât le nom que lui donnerait l'homme.",
      20: "Et l'homme donna des noms à tout le bétail, aux oiseaux du ciel et à tous les animaux des champs; mais, pour l'homme, il ne trouva point d'aide semblable à lui.",
      21: "Alors l'Éternel Dieu fit tomber un profond sommeil sur l'homme, qui s'endormit; il prit une de ses côtes, et referma la chair à sa place.",
      22: "L'Éternel Dieu forma une femme de la côte qu'il avait prise de l'homme, et il l'amena vers l'homme.",
      23: "Et l'homme dit: Voici cette fois celle qui est os de mes os et chair de ma chair! on l'appellera femme, parce qu'elle a été prise de l'homme.",
      24: "C'est pourquoi l'homme quittera son père et sa mère, et s'attachera à sa femme, et ils deviendront une seule chair.",
      25: "L'homme et sa femme étaient tous deux nus, et ils n'en avaient point honte.",
    },
    3: {
      1: "Le serpent était le plus rusé de tous les animaux des champs, que l'Éternel Dieu avait faits. Il dit à la femme: Dieu a-t-il réellement dit: Vous ne mangerez pas de tous les arbres du jardin?",
      2: "La femme répondit au serpent: Nous mangeons du fruit des arbres du jardin.",
      3: "Mais quant au fruit de l'arbre qui est au milieu du jardin, Dieu a dit: Vous n'en mangerez point et vous n'y toucherez point, de peur que vous ne mouriez.",
      4: "Alors le serpent dit à la femme: Vous ne mourrez point;",
      5: "mais Dieu sait que, le jour où vous en mangerez, vos yeux s'ouvriront, et que vous serez comme des dieux, connaissant le bien et le mal.",
      6: "La femme vit que l'arbre était bon à manger et agréable à la vue, et qu'il était précieux pour ouvrir l'intelligence; elle prit de son fruit, et en mangea; elle en donna aussi à son mari, qui était auprès d'elle, et il en mangea.",
      7: "Les yeux de l'un et de l'autre s'ouvrirent, ils connurent qu'ils étaient nus, et ayant cousu des feuilles de figuier, ils s'en firent des ceintures.",
      8: "Alors ils entendirent la voix de l'Éternel Dieu, qui parcourait le jardin vers le soir, et l'homme et sa femme se cachèrent loin de la face de l'Éternel Dieu, au milieu des arbres du jardin.",
      9: "Mais l'Éternel Dieu appela l'homme, et lui dit: Où es-tu?",
      10: "Il répondit: J'ai entendu ta voix dans le jardin, et j'ai eu peur, parce que je suis nu, et je me suis caché.",
      11: "Et l'Éternel Dieu dit: Qui t'a appris que tu es nu? Est-ce que tu as mangé de l'arbre dont je t'avais défendu de manger?",
      12: "L'homme répondit: La femme que tu as mise auprès de moi m'a donné de l'arbre, et j'en ai mangé.",
      13: "Et l'Éternel Dieu dit à la femme: Pourquoi as-tu fait cela? La femme répondit: Le serpent m'a séduite, et j'en ai mangé.",
      14: "L'Éternel Dieu dit au serpent: Puisque tu as fait cela, tu seras maudit entre tout le bétail et entre tous les animaux des champs, tu marcheras sur ton ventre, et tu mangeras de la poussière tous les jours de ta vie.",
      15: "Je mettrai inimitié entre toi et la femme, entre ta postérité et sa postérité: celle-ci t'écrasera la tête, et tu lui blesseras le talon.",
      16: "Il dit à la femme: J'augmenterai la souffrance de tes grossesses, tu enfanteras avec douleur, et tes désirs se porteront vers ton mari, mais il dominera sur toi.",
      17: "Il dit à l'homme: Puisque tu as écouté la voix de ta femme, et que tu as mangé de l'arbre au sujet duquel je t'avais donné cet ordre: Tu n'en mangeras point! le sol sera maudit à cause de toi. C'est à force de peine que tu en tireras ta nourriture tous les jours de ta vie,",
      18: "il te produira des épines et des ronces, et tu mangeras de l'herbe des champs.",
      19: "C'est à la sueur de ton visage que tu mangeras du pain, jusqu'à ce que tu retournes dans la terre, d'où tu as été pris; car tu es poussière, et tu retourneras dans la poussière.",
      20: "Adam donna à sa femme le nom d'Ève: car elle a été la mère de tous les vivants.",
      21: "L'Éternel Dieu fit à Adam et à sa femme des habits de peau, et il les en revêtit.",
      22: "L'Éternel Dieu dit: Voici, l'homme est devenu comme l'un de nous, pour la connaissance du bien et du mal. Empêchons-le maintenant d'avancer sa main, de prendre de l'arbre de vie, d'en manger, et de vivre éternellement.",
      23: "Et l'Éternel Dieu le chassa du jardin d'Éden, pour qu'il cultivât la terre, d'où il avait été pris.",
      24: "C'est ainsi qu'il chassa Adam; et il mit à l'orient du jardin d'Éden les chérubins qui agitent une épée flamboyante, pour garder le chemin de l'arbre de vie.",
    },
  },

  // ========== PSAUMES (Psaumes populaires complets) ==========
  "Psaumes": {
    23: {
      1: "L'Éternel est mon berger: je ne manquerai de rien.",
      2: "Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles.",
      3: "Il restaure mon âme, Il me conduit dans les sentiers de la justice, à cause de son nom.",
      4: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: Ta houlette et ton bâton me rassurent.",
      5: "Tu dresses devant moi une table, en face de mes adversaires; Tu oins d'huile ma tête, et ma coupe déborde.",
      6: "Oui, le bonheur et la grâce m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Éternel jusqu'à la fin de mes jours.",
    },
    91: {
      1: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.",
      2: "Je dis à l'Éternel: Mon refuge et ma forteresse, mon Dieu en qui je me confie!",
      3: "Car c'est lui qui te délivre du filet de l'oiseleur, de la peste et de ses ravages.",
      4: "Il te couvrira de ses plumes, et tu trouveras un refuge sous ses ailes; sa fidélité est un bouclier et une cuirasse.",
      5: "Tu ne craindras ni les terreurs de la nuit, ni la flèche qui vole de jour,",
      6: "ni la peste qui marche dans les ténèbres, ni la contagion qui frappe en plein midi.",
      7: "Que mille tombent à ton côté, et dix mille à ta droite, tu ne seras pas atteint;",
      8: "de tes yeux seulement tu regarderas, et tu verras la rétribution des méchants.",
      9: "Car tu es mon refuge, ô Éternel! Tu fais du Très-Haut ta retraite.",
      10: "Aucun malheur ne t'arrivera, aucun fléau n'approchera de ta tente.",
      11: "Car il ordonnera à ses anges de te garder dans toutes tes voies;",
      12: "ils te porteront sur les mains, de peur que ton pied ne heurte contre une pierre.",
      13: "Tu marcheras sur le lion et sur l'aspic, tu fouleras le lionceau et le dragon.",
      14: "Puisqu'il m'aime, je le délivrerai; je le protégerai, puisqu'il connaît mon nom.",
      15: "Il m'invoquera, et je lui répondrai; je serai avec lui dans la détresse, je le délivrerai et je le glorifierai.",
      16: "Je le rassasierai de longs jours, et je lui ferai voir mon salut.",
    },
    1: {
      1: "Heureux l'homme qui ne marche pas selon le conseil des méchants, qui ne s'arrête pas sur la voie des pécheurs, et qui ne s'assied pas en compagnie des moqueurs,",
      2: "mais qui trouve son plaisir dans la loi de l'Éternel, et qui la médite jour et nuit!",
      3: "Il est comme un arbre planté près d'un courant d'eau, qui donne son fruit en sa saison, et dont le feuillage ne se flétrit point: Tout ce qu'il fait lui réussit.",
      4: "Il n'en est pas ainsi des méchants: Ils sont comme la paille que le vent dissipe.",
      5: "C'est pourquoi les méchants ne résistent pas au jour du jugement, ni les pécheurs dans l'assemblée des justes;",
      6: "car l'Éternel connaît la voie des justes, et la voie des péchants mène à la ruine.",
    },
    100: {
      1: "Poussez vers l'Éternel des cris de joie, vous tous, habitants de la terre!",
      2: "Servez l'Éternel, avec joie, venez avec allégresse en sa présence!",
      3: "Sachez que l'Éternel est Dieu! C'est lui qui nous a faits, et nous lui appartenons; nous sommes son peuple, et le troupeau de son pâturage.",
      4: "Entrez dans ses portes avec des louanges, dans ses parvis avec des cantiques! Célébrez-le, bénissez son nom!",
      5: "Car l'Éternel est bon; sa bonté dure toujours, et sa fidélité de génération en génération.",
    },
    150: {
      1: "Louez l'Éternel! Louez Dieu dans son sanctuaire! Louez-le dans l'étendue, où éclate sa puissance!",
      2: "Louez-le pour ses hauts faits! Louez-le selon l'immensité de sa grandeur!",
      3: "Louez-le au son de la trompette! Louez-le avec le luth et la harpe!",
      4: "Louez-le avec le tambourin et avec des danses! Louez-le avec les instruments à cordes et le chalumeau!",
      5: "Louez-le avec les cymbales sonores! Louez-le avec les cymbales retentissantes!",
      6: "Que tout ce qui respire loue l'Éternel! Louez l'Éternel!",
    },
  },

  // ========== MATTHIEU (Chapitre 5 complet - Sermon sur la montagne) ==========
  "Matthieu": {
    5: {
      1: "Voyant la foule, Jésus monta sur la montagne; et, après qu'il se fut assis, ses disciples s'approchèrent de lui.",
      2: "Puis, ayant ouvert la bouche, il les enseigna, et dit:",
      3: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!",
      4: "Heureux les affligés, car ils seront consolés!",
      5: "Heureux les débonnaires, car ils hériteront la terre!",
      6: "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés!",
      7: "Heureux les miséricordieux, car ils obtiendront miséricorde!",
      8: "Heureux ceux qui ont le coeur pur, car ils verront Dieu!",
      9: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu!",
      10: "Heureux ceux qui sont persécutés pour la justice, car le royaume des cieux est à eux!",
      11: "Heureux serez-vous, lorsqu'on vous outragera, qu'on vous persécutera et qu'on dira faussement de vous toute sorte de mal, à cause de moi.",
      12: "Réjouissez-vous et soyez dans l'allégresse, parce que votre récompense sera grande dans les cieux; car c'est ainsi qu'on a persécuté les prophètes qui ont été avant vous.",
      13: "Vous êtes le sel de la terre. Mais si le sel perd sa saveur, avec quoi la lui rendra-t-on? Il ne sert plus qu'à être jeté dehors, et foulé aux pieds par les hommes.",
      14: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée;",
      15: "et on n'allume pas une lampe pour la mettre sous le boisseau, mais on la met sur le chandelier, et elle éclaire tous ceux qui sont dans la maison.",
      16: "Que votre lumière luise ainsi devant les hommes, afin qu'ils voient vos bonnes oeuvres, et qu'ils glorifient votre Père qui est dans les cieux.",
      17: "Ne croyez pas que je sois venu pour abolir la loi ou les prophètes; je suis venu non pour abolir, mais pour accomplir.",
      18: "Car, je vous le dis en vérité, tant que le ciel et la terre ne passeront point, il ne disparaîtra pas de la loi un seul iota ou un seul trait de lettre, jusqu'à ce que tout soit arrivé.",
      19: "Celui donc qui supprimera l'un de ces plus petits commandements, et qui enseignera aux hommes à faire de même, sera appelé le plus petit dans le royaume des cieux; mais celui qui les observera, et qui enseignera à les observer, celui-là sera appelé grand dans le royaume des cieux.",
      20: "Car, je vous le dis, si votre justice ne surpasse celle des scribes et des pharisiens, vous n'entrerez point dans le royaume des cieux.",
      21: "Vous avez entendu qu'il a été dit aux anciens: Tu ne tueras point; celui qui tuera mérite d'être puni par les juges.",
      22: "Mais moi, je vous dis que quiconque se met en colère contre son frère mérite d'être puni par les juges; que celui qui dira à son frère: Raca! mérite d'être puni par le sanhédrin; et que celui qui lui dira: Insensé! mérite d'être puni par le feu de la géhenne.",
      23: "Si donc tu présentes ton offrande à l'autel, et que là tu te souviennes que ton frère a quelque chose contre toi,",
      24: "laisse là ton offrande devant l'autel, et va d'abord te réconcilier avec ton frère; puis, viens présenter ton offrande.",
      25: "Accorde-toi promptement avec ton adversaire, pendant que tu es en chemin avec lui, de peur qu'il ne te livre au juge, que le juge ne te livre à l'officier de justice, et que tu ne sois mis en prison.",
      26: "Je te le dis en vérité, tu ne sortiras pas de là que tu n'aies payé le dernier quadrant.",
      27: "Vous avez appris qu'il a été dit: Tu ne commettras point d'adultère.",
      28: "Mais moi, je vous dis que quiconque regarde une femme pour la convoiter a déjà commis un adultère avec elle dans son coeur.",
      29: "Si ton oeil droit est pour toi une occasion de chute, arrache-le et jette-le loin de toi; car il est avantageux pour toi qu'un seul de tes membres périsse, et que ton corps entier ne soit pas jeté dans la géhenne.",
      30: "Et si ta main droite est pour toi une occasion de chute, coupe-la et jette-la loin de toi; car il est avantageux pour toi qu'un seul de tes membres périsse, et que ton corps entier n'aille pas dans la géhenne.",
      31: "Il a été dit: Que celui qui répudie sa femme lui donne une lettre de divorce.",
      32: "Mais moi, je vous dis que celui qui répudie sa femme, sauf pour cause d'infidélité, l'expose à devenir adultère, et que celui qui épouse une femme répudiée commet un adultère.",
      33: "Vous avez encore appris qu'il a été dit aux anciens: Tu ne te parjureras point, mais tu t'acquitteras envers le Seigneur de ce que tu as déclaré par serment.",
      34: "Mais moi, je vous dis de ne jurer aucunement, ni par le ciel, parce que c'est le trône de Dieu;",
      35: "ni par la terre, parce que c'est son marchepied; ni par Jérusalem, parce que c'est la ville du grand roi.",
      36: "Ne jure pas non plus par ta tête, car tu ne peux rendre blanc ou noir un seul cheveu.",
      37: "Que votre parole soit oui, oui, non, non; ce qu'on y ajoute vient du malin.",
      38: "Vous avez appris qu'il a été dit: oeil pour oeil, et dent pour dent.",
      39: "Mais moi, je vous dis de ne pas résister au méchant. Si quelqu'un te frappe sur la joue droite, présente-lui aussi l'autre.",
      40: "Si quelqu'un veut plaider contre toi, et prendre ta tunique, laisse-lui encore ton manteau.",
      41: "Si quelqu'un te force à faire un mille, fais-en deux avec lui.",
      42: "Donne à celui qui te demande, et ne te détourne pas de celui qui veut emprunter de toi.",
      43: "Vous avez appris qu'il a été dit: Tu aimeras ton prochain, et tu haïras ton ennemi.",
      44: "Mais moi, je vous dis: Aimez vos ennemis, bénissez ceux qui vous maudissent, faites du bien à ceux qui vous haïssent, et priez pour ceux qui vous maltraitent et qui vous persécutent,",
      45: "afin que vous soyez fils de votre Père qui est dans les cieux; car il fait lever son soleil sur les méchants et sur les bons, et il fait pleuvoir sur les justes et sur les injustes.",
      46: "Si vous aimez ceux qui vous aiment, quelle récompense méritez-vous? Les publicains aussi n'agissent-ils pas de même?",
      47: "Et si vous saluez seulement vos frères, que faites-vous d'extraordinaire? Les païens aussi n'agissent-ils pas de même?",
      48: "Soyez donc parfaits, comme votre Père céleste est parfait.",
    },
    28: {
      1: "Après le sabbat, à l'aube du premier jour de la semaine, Marie de Magdala et l'autre Marie allèrent voir le sépulcre.",
      2: "Et voici, il y eut un grand tremblement de terre; car un ange du Seigneur descendit du ciel, vint rouler la pierre, et s'assit dessus.",
      3: "Son aspect était comme l'éclair, et son vêtement blanc comme la neige.",
      4: "Les gardes tremblèrent de peur, et devinrent comme morts.",
      5: "Mais l'ange prit la parole, et dit aux femmes: Pour vous, ne craignez pas; car je sais que vous cherchez Jésus qui a été crucifié.",
      6: "Il n'est point ici; il est ressuscité, comme il l'avait dit. Venez, voyez le lieu où il était couché,",
      7: "et allez promptement dire à ses disciples qu'il est ressuscité des morts. Et voici, il vous précède en Galilée: c'est là que vous le verrez. Voici, je vous l'ai dit.",
      8: "Elles s'éloignèrent promptement du sépulcre, avec crainte et avec une grande joie, et elles coururent porter la nouvelle aux disciples.",
      9: "Et voici, Jésus vint à leur rencontre, et dit: Je vous salue. Elles s'approchèrent pour saisir ses pieds, et elles se prosternèrent devant lui.",
      10: "Alors Jésus leur dit: Ne craignez pas; allez dire à mes frères de se rendre en Galilée: c'est là qu'ils me verront.",
      11: "Pendant qu'elles étaient en chemin, quelques hommes de la garde entrèrent dans la ville, et annoncèrent aux principaux sacrificateurs tout ce qui était arrivé.",
      12: "Ceux-ci, après s'être assemblés avec les anciens et avoir tenu conseil, donnèrent aux soldats une forte somme d'argent,",
      13: "en disant: Dites: Ses disciples sont venus de nuit le dérober, pendant que nous dormions.",
      14: "Et si le gouverneur l'apprend, nous l'apaiserons, et nous vous tirerons de peine.",
      15: "Les soldats prirent l'argent, et suivirent les instructions qui leur furent données. Et ce bruit s'est répandu parmi les Juifs, jusqu'à ce jour.",
      16: "Les onze disciples allèrent en Galilée, sur la montagne que Jésus leur avait désignée.",
      17: "Quand ils le virent, ils se prosternèrent devant lui. Mais quelques-uns eurent des doutes.",
      18: "Jésus, s'étant approché, leur parla ainsi: Tout pouvoir m'a été donné dans le ciel et sur la terre.",
      19: "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit,",
      20: "et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde.",
    },
  },
  
  // ========== ROMAINS (Chapitres complets) ==========
  "Romains": {
    8: {
      1: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ.",
      2: "En effet, la loi de l'esprit de vie en Jésus-Christ m'a affranchi de la loi du péché et de la mort.",
      3: "Car chose impossible à la loi, parce que la chair la rendait sans force, Dieu a condamné le péché dans la chair, en envoyant, à cause du péché, son propre Fils dans une chair semblable à celle du péché,",
      4: "et cela afin que la justice de la loi fût accomplie en nous, qui marchons, non selon la chair, mais selon l'esprit.",
      28: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
      29: "Car ceux qu'il a connus d'avance, il les a aussi prédestinés à être semblables à l'image de son Fils, afin que son Fils fût le premier-né entre plusieurs frères.",
      30: "Et ceux qu'il a prédestinés, il les a aussi appelés; et ceux qu'il a appelés, il les a aussi justifiés; et ceux qu'il a justifiés, il les a aussi glorifiés.",
      31: "Que dirons-nous donc à l'égard de ces choses? Si Dieu est pour nous, qui sera contre nous?",
      32: "Lui, qui n'a point épargné son propre Fils, mais qui l'a livré pour nous tous, comment ne nous donnera-t-il pas aussi toutes choses avec lui?",
      33: "Qui accusera les élus de Dieu? C'est Dieu qui justifie!",
      34: "Qui les condamnera? Christ est mort; bien plus, il est ressuscité, il est à la droite de Dieu, et il intercède pour nous!",
      35: "Qui nous séparera de l'amour de Christ? Sera-ce la tribulation, ou l'angoisse, ou la persécution, ou la faim, ou la nudité, ou le péril, ou l'épée?",
      36: "selon qu'il est écrit: C'est à cause de toi qu'on nous met à mort tout le jour, qu'on nous regarde comme des brebis destinées à la boucherie.",
      37: "Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés.",
      38: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir,",
      39: "ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus-Christ notre Seigneur.",
    },
    12: {
      1: "Je vous exhorte donc, frères, par les compassions de Dieu, à offrir vos corps comme un sacrifice vivant, saint, agréable à Dieu, ce qui sera de votre part un culte raisonnable.",
      2: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.",
      9: "Que la charité soit sans hypocrisie. Ayez le mal en horreur; attachez-vous fortement au bien.",
      10: "Par amour fraternel, soyez pleins d'affection les uns pour les autres; par honneur, usez de prévenances réciproques.",
      11: "Ayez du zèle, et non de la paresse. Soyez fervents d'esprit. Servez le Seigneur.",
      12: "Réjouissez-vous en espérance. Soyez patients dans l'affliction. Persévérez dans la prière.",
    },
  },

  // ========== PHILIPPIENS (Chapitres complets) ==========
  "Philippiens": {
    4: {
      4: "Réjouissez-vous toujours dans le Seigneur; je le répète, réjouissez-vous.",
      5: "Que votre douceur soit connue de tous les hommes. Le Seigneur est proche.",
      6: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.",
      7: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos coeurs et vos pensées en Jésus-Christ.",
      8: "Au reste, frères, que tout ce qui est vrai, tout ce qui est honorable, tout ce qui est juste, tout ce qui est pur, tout ce qui est aimable, tout ce qui mérite l'approbation, ce qui est vertueux et digne de louange, soit l'objet de vos pensées.",
      9: "Ce que vous avez appris, reçu et entendu de moi, et ce que vous avez vu en moi, pratiquez-le. Et le Dieu de paix sera avec vous.",
      10: "J'ai éprouvé une grande joie dans le Seigneur de ce que vous avez pu enfin renouveler l'expression de vos sentiments pour moi; vous y pensiez bien, mais l'occasion vous manquait.",
      11: "Ce n'est pas en vue de mes besoins que je dis cela, car j'ai appris à être content de l'état où je me trouve.",
      12: "Je sais vivre dans l'humiliation, et je sais vivre dans l'abondance. En tout et partout j'ai appris à être rassasié et à avoir faim, à être dans l'abondance et à être dans la disette.",
      13: "Je puis tout par celui qui me fortifie.",
      19: "Et mon Dieu pourvoira à tous vos besoins selon sa richesse, avec gloire, en Jésus-Christ.",
    },
  },

  // ========== PROVERBES (Chapitres populaires) ==========
  "Proverbes": {
    3: {
      5: "Confie-toi en l'Éternel de tout ton coeur, et ne t'appuie pas sur ta sagesse;",
      6: "Reconnais-le dans toutes tes voies, et il aplanira tes sentiers.",
      7: "Ne sois point sage à tes propres yeux, crains l'Éternel, et détourne-toi du mal:",
      8: "ce sera la santé pour tes muscles, et un rafraîchissement pour tes os.",
      9: "Honore l'Éternel avec tes biens, et avec les prémices de tout ton revenu:",
      10: "alors tes greniers seront remplis d'abondance, et tes cuves regorgeront de moût.",
    },
    22: {
      6: "Instruis l'enfant selon la voie qu'il doit suivre; et quand il sera vieux, il ne s'en détournera pas.",
    },
  },

  // ========== ÉSAÏE (Chapitres prophétiques) ==========
  "Ésaïe": {
    40: {
      31: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; Ils courent, et ne se lassent point, Ils marchent, et ne se fatiguent point.",
    },
    41: {
      10: "Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu; Je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante.",
    },
    53: {
      3: "Méprisé et abandonné des hommes, homme de douleur et habitué à la souffrance, semblable à celui dont on détourne le visage, nous l'avons dédaigné, nous n'avons fait de lui aucun cas.",
      4: "Cependant, ce sont nos souffrances qu'il a portées, c'est de nos douleurs qu'il s'est chargé; et nous l'avons considéré comme puni, frappé de Dieu, et humilié.",
      5: "Mais il était blessé pour nos péchés, brisé pour nos iniquités; le châtiment qui nous donne la paix est tombé sur lui, et c'est par ses meurtrissures que nous sommes guéris.",
      6: "Nous étions tous errants comme des brebis, chacun suivait sa propre voie; et l'Éternel a fait retomber sur lui l'iniquité de nous tous.",
    },
  },

  // ========== APOCALYPSE (Chapitres eschatologiques) ==========
  "Apocalypse": {
    21: {
      1: "Puis je vis un nouveau ciel et une nouvelle terre; car le premier ciel et la première terre avaient disparu, et la mer n'était plus.",
      2: "Et je vis descendre du ciel, d'auprès de Dieu, la ville sainte, la nouvelle Jérusalem, préparée comme une épouse qui s'est parée pour son époux.",
      3: "Et j'entendis du trône une forte voix qui disait: Voici le tabernacle de Dieu avec les hommes! Il habitera avec eux, et ils seront son peuple, et Dieu lui-même sera avec eux.",
      4: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.",
      5: "Et celui qui était assis sur le trône dit: Voici, je fais toutes choses nouvelles. Et il dit: Écris; car ces paroles sont certaines et véritables.",
    },
    22: {
      12: "Voici, je viens bientôt, et ma rétribution est avec moi, pour rendre à chacun selon ce qu'est son oeuvre.",
      13: "Je suis l'alpha et l'oméga, le premier et le dernier, le commencement et la fin.",
      20: "Celui qui atteste ces choses dit: Oui, je viens bientôt. Amen! Viens, Seigneur Jésus!",
      21: "Que la grâce du Seigneur Jésus soit avec tous!",
    },
  },
};

// Fusionner les versets de base avec les versets étendus
export const fullBibleVerses = {
  ...baseBibleVerses,
  ...Object.keys(extendedBibleVerses).reduce((acc, book) => {
    if (acc[book]) {
      // Si le livre existe déjà, fusionner les chapitres
      acc[book] = {
        ...acc[book],
        ...extendedBibleVerses[book],
      };
    } else {
      // Sinon, ajouter le livre directement
      acc[book] = extendedBibleVerses[book];
    }
    return acc;
  }, { ...baseBibleVerses } as Record<string, Record<number, Record<number, string>>>),
};

export function getVerse(book: string, chapter: number, verse: number): string | null {
  return fullBibleVerses[book]?.[chapter]?.[verse] || null;
}

export function getChapterVerses(book: string, chapter: number): Record<number, string> | null {
  return fullBibleVerses[book]?.[chapter] || null;
}

export function hasVerseData(book: string, chapter: number): boolean {
  return !!fullBibleVerses[book]?.[chapter];
}

export function getAllBooks(): string[] {
  return Object.keys(fullBibleVerses);
}

export function getBookChapters(book: string): number[] {
  const bookData = fullBibleVerses[book];
  if (!bookData) return [];
  return Object.keys(bookData).map(Number).sort((a, b) => a - b);
}