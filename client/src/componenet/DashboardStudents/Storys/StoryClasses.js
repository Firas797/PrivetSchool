import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import './StoryClasses.css';

function StoryClasses() {
  const dispatch = useDispatch();
  const studentClass = useSelector((state) => state.auth.user?.children?.[0]?.class);
  const [showModal, setShowModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');

  // Set default class when component loads
  useEffect(() => {
    if (studentClass) {
      setSelectedClass(studentClass);
    } else {
      setSelectedClass('all');
    }
  }, [studentClass]);

  const handleShowStory = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  // Sample data with complete stories for all classes
// Sample data with complete stories for all classes
// Sample data with complete stories for all classes
const allStories = [
  // Class 1 Stories (3 Arabic stories only)
  {
    id: 1,
    title: "قصة الأرنب الصغير",
    description: "مغامرة جميلة عن أرنب صغير يتعلم قيمة الصدق",
    language: "عربي",
    class: "1",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=300&h=200&fit=crop",
    color: "#FF6B6B",
    fullStory: `
      كان هناك أرنب صغير اسمه نونو. كان نونو يحب الجزر كثيراً. في أحد الأيام، رأى جزراً لذيذاً في حديقة الجيران. أخذ نونو الجزر دون أن يستأذن.

      عندما عاد إلى المنزل، سألته أمه: "من أين حصلت على هذا الجزر يا نونو؟" شعر نونو بالخجل وأخبرها الحقيقة.

      قالت الأم: "الصدق مهم يا نونو. يجب أن نستأذن قبل أخذ أي شيء."

      ذهب نونو مع أمه إلى الجيران واعتذر. أعطوه الجزر كهدية وكان سعيداً لأنه قال الحقيقة.

      **العبرة:** الصدق هو أفضل سياسة.
    `
  },
  {
    id: 2,
    title: "القطة الجميلة",
    description: "قصة عن قطة تتعلم قيمة النظافة والترتيب",
    language: "عربي",
    class: "1",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop",
    color: "#98D8C8",
    fullStory: `
      كانت هناك قطة جميلة اسمها ميمي. كانت ميمي تحب اللعب ولكنها لا تحب الترتيب. كان منزلها دائماً غير مرتب.

      في أحد الأيام، ضاعت لعبتها المفضلة بين الفوضى. بحثت وبحثت ولكنها لم تجدها. حزنت كثيراً.

      من ذلك اليوم، تعلمت ميمي أن تحافظ على ترتيب منزلها. وجدت لعبتها وأصبحت سعيدة.

      **العبرة:** النظافة والترتيب يجلبان السعادة.
    `
  },
  {
    id: 3,
    title: "الشمس والمطر",
    description: "قصة تعلم الأطفال تعاقب الفصول والطقس",
    language: "عربي",
    class: "1",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=300&h=200&fit=crop",
    color: "#F7DC6F",
    fullStory: `
      في يوم من الأيام، تشاجرت الشمس والمطر. كل منهما يعتقد أنه الأهم للأطفال.

      الشمس قالت: "بدونني سيكون الجو بارداً ومظلماً."
      والمطر قال: "بدونني ستموت النباتات والعطش."

      فكرا معاً وقررا التعاون. أصبحا يتناوبان ليعملا معاً من أجل الجميع.

      **العبرة:** التعاون يجعل الحياة أجمل للجميع.
    `
  },

  // Class 2 Stories (3 Arabic stories only)
  {
    id: 4,
    title: "الفتاة والزهرة السحرية",
    description: "قصة سحرية عن فتاة تكتشف زهرة تحقق الأمنيات",
    language: "عربي",
    class: "2",
    image: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=300&h=200&fit=crop",
    color: "#4ECDC4",
    fullStory: `
      في قرية صغيرة، عاشت فتاة اسمها ليلى. كانت ليلى تحب الطبيعة. في أحد الأيام، وجدت زهرة جميلة تتألق بألوان قوس قزح.

      عندما لمست الزهرة، سمعت صوتاً يقول: "أنا الزهرة السحرية، يمكنني تحقيق أمنية واحدة لك."

      فكرت ليلى وقالت: "أتمنى أن يكون جميع الأطفال في قريتنا سعداء وأصحاء."

      تحققت الأمنية! أصبح جميع الأطفال يلعبون ويضحكون معاً. كانت ليلى سعيدة لأنها فكرت في الآخرين.

      **العبرة:** مشاركة السعادة مع الآخرين تجعلنا أكثر سعادة.
    `
  },
  {
    id: 5,
    title: "الصديقان",
    description: "قصة عن صداقة قوية بين طفلين",
    language: "عربي",
    class: "2",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    color: "#BB8FCE",
    fullStory: `
      كان يوسف وعمر صديقين مقربين. في يوم من الأيام، تشاجرا على لعبة. توقفا عن الكلام لعدة أيام.

      شعر كل منهما بالوحدة والحزن. في اليوم الرابع، ذهب يوسف إلى عمر ومعاه اللعبة وقال: "الصداقة أهم من اللعبة."

      تصالحا وعادا أصدقاء مقربين أكثر من قبل.

      **العبرة:** الصداقة الحقيقية أقوى من أي خلاف.
    `
  },
  {
    id: 6,
    title: "الشجرة المثمرة",
    description: "قصة تعلم الأطفال أهمية العطاء والتعاون",
    language: "عربي",
    class: "2",
    image: "https://images.unsplash.com/photo-1462143338528-eca9936a4d09?w=300&h=200&fit=crop",
    color: "#82E0AA",
    fullStory: `
      في حديقة المدرسة، كانت هناك شجرة تفاح عظيمة. كانت تمنح الأطفال التفاح اللذيذ كل يوم.

      لكن الأطفال كانوا يأخذون التفاح دون شكر. حزنت الشجرة وتوقفت عن إعطاء التفاح.

      فهم الأطفال خطأهم واعتذروا للشجرة. من ذلك اليوم، أصبحوا يشكرون الشجرة ويساعدون في العناية بها.

      عادت الشجرة لإعطاء التفاح وكان الجميع سعداء.

      **العبرة:** الشكر والعناية يجلبان البركة.
    `
  },

  // Class 3 Stories (6 stories - 2 Arabic, 2 French, 2 English)
  {
    id: 7,
    title: "الصياد الصغير",
    description: "قصة عن صياد يتعلم الصبر والاحترام",
    language: "عربي",
    class: "3",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    color: "#45B7D1",
    fullStory: `
      كان يوسف صياداً صغيراً. في أول يوم له، رمى الشبكة وانتظر طويلاً لكنه لم يصطد شيئاً.

      شعر بالإحباط لكن جده قال له: "الصبر مفتاح الفرج يا يوسف."

      في اليوم التالي، حاول مرة أخرى وبالصبر اصطاد سمكة جميلة. تعلم يوسف أن الصبر والاستمرار يجلبان النجاح.

      **العبرة:** الصبر جميل والنتيجة تستحق الانتظار.
    `
  },
  {
    id: 8,
    title: "المخترع الصغير",
    description: "قصة عن طفل يخترع آلة بسيطة",
    language: "عربي",
    class: "3",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=300&h=200&fit=crop",
    color: "#F8C471",
    fullStory: `
      كان أحمد يحب التفكير في الاختراعات. لاحظ أن أمه تتعب في حمل المشتريات. فكر وصنع عربة صغيرة.

      ساعدته العربة في حمل الأشياء الثقيلة. فرحت أمه كثيراً واشتريت له كتباً عن العلوم.

      تعلم أحمد أن التفكير في مساعدة الآخرين leads إلى أفكار رائعة.

      **العبرة:** الابتكار يبدأ من ملاحظة احتياجات الآخرين.
    `
  },
  {
    id: 9,
    title: "Le Petit Jardinier",
    description: "Une histoire sur un enfant qui cultive un jardin",
    language: "Français",
    class: "3",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
    color: "#D7BDE2",
    fullStory: `
      Lucas aimait jardiner avec son grand-père. Il planta une petite graine et l'arrosa chaque jour.

      Après plusieurs semaines, une belle fleur poussa. Lucas était si fier ! Il apprit que les belles choses prennent du temps.

      Tous les voisins admirent sa belle fleur.

      **Leçon:** La patience et le travail constant donnent de bons résultats.
    `
  },
  {
    id: 10,
    title: "Le Petit Oiseau",
    description: "L'histoire d'un petit oiseau qui apprend à voler",
    language: "Français",
    class: "3",
    image: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?w=300&h=200&fit=crop",
    color: "#74B9FF",
    fullStory: `
      Pip était un petit oiseau qui avait peur de voler. Tous ses amis volaient déjà, mais lui restait au nid.

      Un jour, un vent fort poussa Pip hors du nid. Il battit des ailes et découvrit qu'il pouvait voler ! Il vola haut dans le ciel.

      Pip apprit que parfois, il faut être courageux pour découvrir ses talents.

      **Leçon:** La peur peut nous empêcher de découvrir nos capacités.
    `
  },
  {
    id: 11,
    title: "The Brave Mouse",
    description: "A small mouse shows great courage",
    language: "English",
    class: "3",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=300&h=200&fit=crop",
    color: "#E59866",
    fullStory: `
      Milo was the smallest mouse in the field. The other animals didn't notice him much. One day, a big cat came to the field.

      While everyone hid, Milo had an idea. He found a bell and tied it to the cat's collar. Now everyone could hear the cat coming!

      Milo proved that size doesn't matter when you have clever ideas.

      **Moral:** Intelligence and courage are more important than size.
    `
  },
  {
    id: 12,
    title: "The Kind Tree",
    description: "A story about a tree that helps everyone",
    language: "English",
    class: "3",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=300&h=200&fit=crop",
    color: "#A569BD",
    fullStory: `
      In the middle of the forest stood a giant oak tree. It gave shade to animals, branches to birds, and acorns to squirrels.

      One day, a storm broke many branches. The tree was sad, but all the animals helped to clean and care for it.

      The tree learned that kindness always comes back to you.

      **Moral:** Helping others creates a circle of kindness.
    `
  },

  // Class 4 Stories (6 stories - 2 Arabic, 2 French, 2 English)
  {
    id: 13,
    title: "مغامرات في الصحراء",
    description: "قصة مشوقة عن رحلة في الصحراء العربية",
    language: "عربي",
    class: "4",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    color: "#FFEAA7",
    fullStory: `
      انطلق أحمد وعائلته في رحلة إلى الصحراء. كانت الشمس ساطعة والرمال ذهبية. رأوا الجمال وسلاحف الصحراء.

      فجأة، ضلوا الطريق! لكن أحمد تذكر ما تعلمه في المدرسة عن النجوم. نظر إلى النجوم في السماء وتعرف على النجم القطبي.

      باتباع النجم القطبي، وجدوا طريقهم إلى المخيم. كان الجميع سعداء وفتحوا حفلة شاي حول النار.

      **العبرة:** المعرفة تنقذنا في الأوقات الصعبة.
    `
  },
  {
    id: 14,
    title: "الفارس الصغير",
    description: "قصة عن فارس يتعلم الشجاعة والأمانة",
    language: "عربي",
    class: "4",
    image: "https://images.unsplash.com/photo-1589674781759-c21c37960bb3?w=300&h=200&fit=crop",
    color: "#96CEB4",
    fullStory: `
      كان خالد يحلم بأن يصبح فارساً شجاعاً. في يوم من الأيام، وجد محفظة مليئة بالنقود على الطريق.

      رغم احتياجه للنقود، ذهب خالد إلى مركز الشرطة وسلم المحفظة. صاحب المحفظة كان ممتناً جداً وكافأ خالد.

      تعلم خالد أن الأمانة هي أولى خطوات الفروسية الحقيقية.

      **العبرة:** الشجاعة الحقيقية تكون في فعل الصواب.
    `
  },
  {
    id: 15,
    title: "Le Petit Chien Courageux",
    description: "L'histoire d'un petit chien qui surmonte ses peurs",
    language: "Français",
    class: "4",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop",
    color: "#F1948A",
    fullStory: `
      Il était une fois un petit chien nommé Max. Max avait peur de tout : du bruit, des grandes ombres, et même de son propre reflet.

      Un jour, il entendit un petit chat qui pleurait. Le chat était coincé dans un arbre. Max regarda l'arbre et eut très peur.

      Mais il prit une grande respiration et dit : "Je dois aider mon ami !"

      Il grimpa lentement et sauva le chat. Tous les animaux l'applaudirent. Max comprit qu'il était plus courageux qu'il ne le pensait.

      **Leçon:** Le courage, c'est agir même quand on a peur.
    `
  },
  {
    id: 16,
    title: "Le Jeux des Saisons",
    description: "Une histoire éducative sur les quatre saisons",
    language: "Français",
    class: "4",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=300&h=200&fit=crop",
    color: "#85C1E9",
    fullStory: `
      Les quatre saisons décidèrent de jouer un tour aux humains. Le printemps apporta des fleurs, l'été de la chaleur, l'automne des feuilles colorées, et l'hiver de la neige.

      Les enfants furent d'abord confus, puis ils commencèrent à apprécier chaque saison pour ses particularités.

      Ils apprirent que chaque saison a sa propre beauté et son utilité.

      **Leçon:** La diversité rend la vie plus intéressante.
    `
  },
  {
    id: 17,
    title: "The Helpful Giant",
    description: "A story about a giant who learns about friendship",
    language: "English",
    class: "4",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
    color: "#4ECDC4",
    fullStory: `
      In a faraway land, there lived a giant named Goli. He was very big and lived alone. The villagers were afraid of him.

      One day, a storm destroyed the village bridge. Goli saw the problem and used his strength to build a new, better bridge.

      The villagers were so grateful! They invited Goli to live with them. Goli learned that helping others is the way to make friends.

      **Moral:** True strength is in helping others.
    `
  },
  {
    id: 18,
    title: "The Weather Detective",
    description: "A story about learning weather patterns",
    language: "English",
    class: "4",
    image: "https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?w=300&h=200&fit=crop",
    color: "#FF6B6B",
    fullStory: `
      Emma loved watching the weather. She noticed that dark clouds meant rain, and red skies in the morning meant storms.

      One day, she warned her neighbors about a coming storm. They protected their gardens and animals.

      Everyone was safe thanks to Emma's observations. She became the village's weather detective.

      **Moral:** Observation and learning can help everyone.
    `
  },

  // Class 5 Stories (6 stories - 2 Arabic, 2 French, 2 English)
  {
    id: 19,
    title: "رحلة إلى الفضاء",
    description: "مغامرة علمية في عالم الفضاء والنجوم",
    language: "عربي",
    class: "5",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop",
    color: "#98D8C8",
    fullStory: `
      حلم خالد بأن يصبح رائد فضاء. في أحد الليالي، حلم أنه سافر إلى القمر. رأى الأرض من الفضاء وكيف تبدو جميلة وزرقاء.

      قابل نجوماً تتحدث وأخبرته: "العلم هو مفتاح المستقبل. ادرس جيداً واحلم كبيراً."

      عندما استيقظ، قرر خالد أن يدرس العلوم والرياضيات بجد. أصبح الأول على فصله وحقق حلمه بأن أصبح عالماً.

      **العبرة:** الأحلام الكبيرة تتحقق بالعمل الجاد والتعلم.
    `
  },
  {
    id: 20,
    title: "العالم الصغير",
    description: "قصة عن طفل يكتشف عالم الميكروبات",
    language: "عربي",
    class: "5",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop",
    color: "#BB8FCE",
    fullStory: `
      عبر الميكروسكوب، اكتشف سامي عالماً كاملاً من الكائنات الصغيرة. رأى البكتيريا والكائنات الدقيقة تتحرك.

      تعلم أن بعضها مفيد للجسم وبعضها ضار. أصبح مهتماً بالنظافة والعلم.

      قرر سامي أن يصبح طبيباً عندما يكبر لمساعدة الناس.

      **العبرة:** المعرفة تفتح أمامنا عوالم جديدة.
    `
  },
  {
    id: 21,
    title: "Le Petit Scientifique",
    description: "Une histoire sur un enfant qui fait des expériences",
    language: "Français",
    class: "5",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
    color: "#82E0AA",
    fullStory: `
      Pierre adorait les expériences scientifiques. Un jour, il mélangea du vinaigre et du bicarbonate de soude.

      La réaction chimique créa des bulles ! Pierre était fasciné. Il documenta son expérience dans son cahier.

      Son professeur fut impressionné et l'aida à faire plus d'expériences.

      **Leçon:** La curiosité scientifique mène à des découvertes passionnantes.
    `
  },
  {
    id: 22,
    title: "Les Planètes Dansantes",
    description: "Une histoire éducative sur le système solaire",
    language: "Français",
    class: "5",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=200&fit=crop",
    color: "#F8C471",
    fullStory: `
      Dans le système solaire, les planètes dansaient autour du Soleil. Mercure tournait vite, Vénus brillait, et la Terre avait la Lune comme partenaire.

      Les planètes apprirent aux enfants leurs caractéristiques : Jupiter est géante, Mars est rouge, et Saturne a des anneaux.

      Les enfants comprirent la beauté et l'ordre de l'univers.

      **Leçon:** L'univers est plein de merveilles à découvrir.
    `
  },
  {
    id: 23,
    title: "The Scientific Adventure",
    description: "A story about discovery and scientific method",
    language: "English",
    class: "5",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=300&h=200&fit=crop",
    color: "#D7BDE2",
    fullStory: `
      Lily loved science. One day, she noticed her plant wasn't growing well. She decided to investigate.

      She observed: "The plant gets water and sun, but the leaves are yellow."
      She hypothesized: "Maybe it needs different soil?"
      She experimented: "Let me try new soil with more nutrients."

      After one week, the plant became green and healthy! Lily documented her findings in her science journal.

      **Moral:** Observation and experimentation lead to discovery.
    `
  },
  {
    id: 24,
    title: "The Ocean Explorer",
    description: "Discovering the wonders of the deep sea",
    language: "English",
    class: "5",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
    color: "#74B9FF",
    fullStory: `
      During a beach vacation, Alex found a submarine toy that could really dive! He explored coral reefs, colorful fish, and even a sunken ship.

      He saw how pollution affected the marine life and started a beach cleanup project with his friends.

      Alex learned that we must protect our oceans and their creatures.

      **Moral:** Exploration leads to understanding and responsibility.
    `
  },

  // Class 6 Stories (6 stories - 2 Arabic, 2 French, 2 English)
  {
    id: 25,
    title: "أسرار المحيط",
    description: "مغامرة في أعماق البحار لاكتشاف الكائنات البحرية",
    language: "عربي",
    class: "6",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    color: "#45B7D1",
    fullStory: `
      في رحلة غوص، اكتشف علي عالماً سحرياً تحت الماء. رأى الشعاب المرجانية الملونة والأسماك الغريبة.

      شاهد سلحفاة بحرية عجوز تحمي بيضها. تعلم علي عن دورة الحياة في المحيط وأهمية الحفاظ على البيئة البحرية.

      قرر أن يصبح عالم أحياء بحرية لحماية المحيطات.

      **العبرة:** المعرفة تولد المسؤولية towards الطبيعة.
    `
  },
  {
    id: 26,
    title: "مخترع المستقبل",
    description: "قصة عن طفل يخترع تقنيات للمستقبل",
    language: "عربي",
    class: "6",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
    color: "#E59866",
    fullStory: `
      كان مازن يحب الروبوتات والبرمجة. صنع روبوتاً صغيراً可以帮助 في تنظيف المنزل.

      طور اختراعه ليصبح روبوتاً لمساعدة كبار السن. فاز بجائزة الابتكار العلمي.

      تعلم مازن أن التكنولوجيا يجب أن تخدم humanity وتجعل الحياة أفضل.

      **العبرة:** الابتكار الحقيقي هو الذي يخدم المجتمع.
    `
  },
  {
    id: 27,
    title: "Le Jeune Écrivain",
    description: "Une histoire sur un enfant qui découvre l'écriture",
    language: "Français",
    class: "6",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
    color: "#A569BD",
    fullStory: `
      Thomas aimait écrire des histoires depuis qu'il était petit. Un jour, il écrivit une histoire sur l'amitié entre un lion et une souris.

      Son enseignante l'encouragea à participer à un concours d'écriture. Thomas gagna le premier prix !

      Il comprit que les mots ont le pouvoir de créer des mondes magiques.

      **Leçon:** L'écriture est un superpouvoir qui permet de partager des idées.
    `
  },
  {
    id: 28,
    title: "Les Secrets de l'Univers",
    description: "Une exploration des mystères de l'astronomie",
    language: "Français",
    class: "6",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop",
    color: "#96CEB4",
    fullStory: `
      À travers son telescope, Sophie découvrit les merveilles du cosmos. Elle observa les anneaux de Saturne et les cratères de la Lune.

      Elle apprit sur les galaxies lointaines et les trous noirs. L'immensité de l'univers la fascina.

      Sophie décida de devenir astronome pour percer les secrets du cosmos.

      **Leçon:** L'univers est le plus grand livre de science qui existe.
    `
  },
  {
    id: 29,
    title: "The Magic Garden",
    description: "Discover the secrets of the enchanted garden",
    language: "English",
    class: "6",
    image: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=300&h=200&fit=crop",
    color: "#4ECDC4",
    fullStory: `
      Behind the old school, there was a hidden gate. Sarah discovered it one afternoon. She opened the gate and entered a magical garden.

      The flowers could talk! "Welcome, Sarah," said a rose. "This garden grows with kindness."

      Sarah spent days helping the garden grow. She watered plants and removed weeds. The garden became more beautiful each day.

      One day, the garden gave her a special seed. "Plant this wherever you see sadness," said the tulip.

      Sarah planted the seed in her neighborhood park. Overnight, the park transformed into a beautiful garden for everyone.

      **Moral:** Small acts of kindness can create big changes.
    `
  },
  {
    id: 30,
    title: "The Time Traveler",
    description: "A journey through history and civilizations",
    language: "English",
    class: "6",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    color: "#FF6B6B",
    fullStory: `
      Leo found an ancient book that could transport him through time. He visited ancient Egypt, medieval Europe, and the future.

      He saw how civilizations developed and learned from their achievements and mistakes.

      Leo understood that history teaches us valuable lessons for building a better future.

      **Moral:** Understanding the past helps us shape a better tomorrow.
    `
  }
];

  // Filter stories based on selected class
  const filteredStories = selectedClass === 'all' 
    ? allStories 
    : allStories.filter(story => story.class === selectedClass);

  return (
    <div className="story-classes-container">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 style={{color: '#2C3E50', fontFamily: 'Arial, sans-serif'}}>
            📚 مكتبة القصص التعليمية
          </h2>
          <p className="text-muted">اختر القصص المناسبة لسنك أو استكشف قصص أخرى</p>
        </div>

        {/* Class Selection Section */}
        <div className="class-selector-section mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h5 className="mb-3">🔍 تصفية القصص حسب الصف</h5>
                  <Form.Select 
                    value={selectedClass} 
                    onChange={handleClassChange}
                    className="class-selector"
                  >
                    {studentClass && (
                      <option value={studentClass}>صفك الحالي (الصف {studentClass})</option>
                    )}
                    <option value="all">جميع القصص (جميع الصفوف)</option>
                    <option value="1">الصف الأول</option>
                    <option value="2">الصف الثاني</option>
                    <option value="3">الصف الثالث</option>
                    <option value="4">الصف الرابع</option>
                    <option value="5">الصف الخامس</option>
                    <option value="6">الصف السادس</option>
                  </Form.Select>
                </div>
                <div className="col-md-6">
                  <div className="selection-info">
                    {selectedClass === 'all' ? (
                      <div className="text-success">
                        <strong>💫 وضع الاستكشاف:</strong> تشاهد جميع القصص المتاحة
                      </div>
                    ) : selectedClass === studentClass ? (
                      <div className="text-primary">
                        <strong>🎯 القصص الموصى بها:</strong> مناسبة لصفك الحالي
                      </div>
                    ) : (
                      <div className="text-info">
                        <strong>🔍 استكشاف:</strong> تشاهد قصص الصف {selectedClass}
                      </div>
                    )}
                    {studentClass && (
                      <div className="mt-2 text-muted">
                        <small>صفك الحالي: الصف {studentClass}</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Stories Counter */}
        <div className="stories-counter mb-3">
          <span className="badge bg-primary">
            📖 عدد القصص المعروضة: {filteredStories.length}
          </span>
        </div>

        {/* Stories Grid */}
        <div className="row">
          {filteredStories.map((story) => (
            <div key={story.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <Card 
                className="story-card h-100 shadow-sm"
                style={{ borderLeft: `5px solid ${story.color}` }}
              >
                <Card.Img 
                  variant="top" 
                  src={story.image} 
                  style={{ height: '200px', objectFit: 'cover' }}
                  alt={story.title}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="language-badge mb-2">
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: story.color,
                        color: 'white',
                        fontSize: '0.8rem'
                      }}
                    >
                      {story.language}
                    </span>
                    <span 
                      className="badge ms-2"
                      style={{ 
                        backgroundColor: '#34495E',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}
                    >
                      الصف {story.class}
                    </span>
                  </div>
                  <Card.Title style={{fontFamily: 'Arial, sans-serif', color: '#2C3E50'}}>
                    {story.title}
                  </Card.Title>
                  <Card.Text style={{flex: 1, color: '#566573'}}>
                    {story.description}
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    style={{ backgroundColor: story.color, borderColor: story.color }}
                    onClick={() => handleShowStory(story)}
                  >
                    اقرأ القصة 📖
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-5">
            <div className="empty-state">
              <h4>📭 لا توجد قصص</h4>
              <p className="text-muted">لم نتمكن من العثور على قصص للصف المحدد</p>
              <Button 
                variant="primary" 
                onClick={() => setSelectedClass('all')}
              >
                عرض جميع القصص
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Story Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg" 
        centered
        dir={selectedStory?.language === 'عربي' ? 'rtl' : 'ltr'}
      >
        <Modal.Header closeButton style={{ backgroundColor: selectedStory?.color, color: 'white' }}>
          <Modal.Title>
            {selectedStory?.title}
            <div className="d-flex mt-2">
              <span className="badge bg-light text-dark me-2">
                {selectedStory?.language}
              </span>
              <span className="badge bg-light text-dark">
                الصف {selectedStory?.class}
              </span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', lineHeight: '1.8' }}>
          {selectedStory?.fullStory?.split('\n').map((paragraph, index) => (
            <p key={index} className={paragraph.includes('**') ? 'fw-bold text-primary' : ''}>
              {paragraph.replace(/\*\*/g, '')}
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إغلاق
          </Button>
          <Button style={{ backgroundColor: selectedStory?.color, borderColor: selectedStory?.color }}>
            حفظ القصة 💾
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StoryClasses;