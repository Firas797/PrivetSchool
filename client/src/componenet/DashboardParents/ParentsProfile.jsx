import React from 'react';
import './Parents.css';
import Navbar from '../../LandingPage/Navbar/Navbar';

const ParentsProfile = () => {
  const adviceCategories = [
    {
      id: 1,
      title: "نصائح للتأثير الإيجابي على الأبناء",
      icon: "👨‍👩‍👧‍👦",
      tips: [
        "كن قدوة حسنة في التصرفات والأخلاق، فأطفالك يراقبونك دائمًا",
        "استمع لأبنائك بانتباه دون مقاطعة لتعزيز ثقتهم بأنفسهم",
        "شجع مواهبهم وهواياتهم ولا تفرض عليهم اهتماماتك الشخصية",
        "ابتعد عن المقارنة مع الآخرين، فكل طفل فريد بقدراته",
        "احتفل بإنجازاتهم الصغيرة والكبيرة لتعزيز دافعيتهم"
      ]
    },
    {
      id: 2,
      title: "إعداد الأبناء لمستقبل ناجح",
      icon: "🎓",
      tips: [
        "علمهم مهارات حل المشكلات واتخاذ القرارات منذ الصغر",
        "شجع حب التعلم والفضول المعرفي وليس فقط الدرجات الدراسية",
        "علمهم المهارات المالية الأساسية كالادخار والتخطيط المالي",
        "نمّي قدرتهم على التكيف مع التغيير والتطور التكنولوجي",
        "علمهم اللغات الأجنبية والمهارات الرقمية الضرورية لعصرنا"
      ]
    },
    {
      id: 3,
      title: "نصائح حياتية قيمة",
      icon: "💡",
      tips: [
        "علمهم القيم الأخلاقية كالصدق والأمانة واحترام الآخرين",
        "شجع روح المبادرة والعمل التطوعي لخدمة المجتمع",
        "ساعدهم على تطوير ذكائهم العاطفي وإدارة مشاعرهم",
        "علمهم أهمية التوازن بين الدراسة والترفيه والراحة",
        "ركز على بناء شخصيتهم أكثر من التركيز على الكمال الأكاديمي"
      ]
    },
    {
      id: 4,
      title: "دعم التعلم والتفوق الدراسي",
      icon: "📚",
      tips: [
        "وفر بيئة منزلية هادئة ومناسبة للمذاكرة والتركيز",
        "تابع تقدمهم الدراسي بانتظام دون ضغط مفرط",
        "شجع القراءة اليومية والعادات الدراسية المنتظمة",
        "تعاون مع المدرسة والمعلمين لمتابعة أداء أبنائك",
        "ساعدهم على تنظيم وقتهم بين الواجبات والأنشطة المختلفة"
      ]
    }
  ];

  const dailyHabits = [
    { habit: "التواصل اليومي الإيجابي", benefit: "يقوي الروابط العائلية" },
    { habit: "قراءة مشتركة أو مناقشة كتاب", benefit: "ينمي التفكير النقدي" },
    { habit: "ممارسة نشاط بدني معًا", benefit: "يعزز الصحة والعادات السليمة" },
    { habit: "تعليم مهارة عملية جديدة", benefit: "يبني الثقة والاستقلالية" },
    { habit: "تحديد أهداف أسبوعية صغيرة", benefit: "يعلم التخطيط والمثابرة" }
  ];

  return (
    <>
      {/* Navbar ثابت في الأعلى */}
      <Navbar />
      
      <div className="parents-container">
        {/* إضافة padding أعلى للتعويض عن Navbar الثابت */}
        <div className="content-with-navbar">
          <header className="parents-header">
            <h1><span className="header-icon">👨‍👩‍👧‍👦</span> دليل أولياء الأمور للتأثير الإيجابي</h1>
            <p className="header-subtitle">نصائح عملية لتربية أبناء ناجحين ومستعدين للمستقبل</p>
          </header>

          <div className="intro-section">
            <div className="intro-card">
              <h2>📋 مقدمة</h2>
              <p>الأبوة والأمومة الفعالة هي رحلة مستمرة من التعلم والنمو. هذا الدليل يقدم نصائح عملية مستوحاة من أحدث الأبحاث التربوية لمساعدة أولياء الأمور على توجيه أبنائهم نحو النجاح الدراسي والحياتي.</p>
            </div>
          </div>

          <div className="advice-grid">
            {adviceCategories.map(category => (
              <div className="advice-card" key={category.id}>
                <div className="card-header">
                  <span className="card-icon">{category.icon}</span>
                  <h3>{category.title}</h3>
                </div>
                <ul className="tips-list">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="tip-item">
                      <span className="tip-bullet">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="habits-section">
            <h2><span className="section-icon">✨</span> عادات يومية لتطوير شخصية الأبناء</h2>
            <div className="habits-table">
              <table>
                <thead>
                  <tr>
                    <th>العادة</th>
                    <th>الفائدة</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyHabits.map((item, index) => (
                    <tr key={index}>
                      <td>{item.habit}</td>
                      <td>{item.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="final-advice">
            <div className="final-card">
              <h2><span className="heart-icon">❤️</span> نصيحة أخيرة</h2>
              <p>تذكر أن كل طفل هو عالم مستقل بذاته. الاستماع الجيد والتعاطف والتشجيع المستمر هم أفضل الاستثمارات التي يمكنك تقديمها لأبنائك. النجاح الحقيقي لا يُقاس بالدرجات فقط، بل بشخصية متوازنة وقادرة على مواجهة تحديات الحياة.</p>
              <div className="quote">
                "أفضل ميراث نتركه لأبنائنا هو الذكريات الجميلة والقيم الراسخة"
              </div>
            </div>
          </div>

          <footer className="parents-footer">
            <p>مدرسة المستقبل الخاصة - قسم دعم أولياء الأمور</p>
            <p>© {new Date().getFullYear()} - جميع الحقوق محفوظة</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ParentsProfile;