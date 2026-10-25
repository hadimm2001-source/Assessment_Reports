import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Lightbulb, CheckCircle2, Copy, BookOpen } from 'lucide-react';

interface PedagogicalAdvisorModalProps {
  isOpen: boolean;
  programName: string;
  indicatorTitle: string;
  onClose: () => void;
}

// Rich domain-grounded pedagogical recommendations for school counseling
const CURATED_ADVICE: Record<string, { summary: string; ideas: string[]; targetAudience: string }> = {
  'برنامج التهيئة النفسية': {
    summary: 'تهيئة مناخ مدرسي إيجابي يساعد طلبة المرحلة المتوسطة على التكيف مع البيئة المدرسية وبناء علاقات سوية.',
    ideas: [
      'تنظيم أسبوع استقبال تفاعلي يتضمن جولات تعريفية بالمرافق المدرسية وورشة كسر الجليد لتعزيز الانتماء.',
      'عقد لقاء توعوي مشترك مع أولياء الأمور لتوضيح خصائص النمو في مرحلة المراهقة المبكرة وأساليب التعامل الإيجابي.',
      'تفعيل "صندوق الملاحظات الودية" وتوزيع حقيبة إرشادية رقمية مصورة حول أسرار التفوق وإدارة الوقت.'
    ],
    targetAudience: 'طلبة الصف الأول متوسط والمستجدين'
  },
  'برنامج خفض العنف (رفق)': {
    summary: 'غرس ثقافة التسامح والحوار والرفق، والحد من مظاهر التنمر الإلكتروني واللفظي داخل وخارج الصف.',
    ideas: [
      'إطلاق مبادرة "سفراء الرفق" لتدريب نخبة من الطلبة على مهارات الوساطة وحل النزاعات بطرق ودية.',
      'ورشة تفاعلية بعنوان "الكلمة الطيبة أثر وبناء" تناقش الأثر النفسي للتنمر وآليات الإبلاغ الآمن.',
      'معرض فني ومسرح مدرسي يجسد قيم الرحمة والتعاطف والتآخي في الميدان المدرسي.'
    ],
    targetAudience: 'جميع طلاب المدرسة والهيئة التعليمية'
  },
  'برنامج الإرشاد وقت الأزمات': {
    summary: 'خطط التدخل الإرشادي السريع للتعامل مع الصدمات والحالات الطارئة وتقديم الدعم النفسي المتخصص.',
    ideas: [
      'تكوين فريق الأزمات المدرسي وتحديث خطة الطوارئ الإرشادية ووسائل الاتصال المباشر.',
      'جلسات تفريغ انفعالي فردية وجماعية للطلبة الذين يتعرضون لظروف أسرية أو صحية مفاجئة.',
      'إصدار دليل إرشادي سريع للمعلمين حول "مؤشرات الإنذار المبكر للأزمات النفسية وكيفية الإحالة".'
    ],
    targetAudience: 'الطلبة المعرضون لظروف ضاغطة وأسرهم'
  },
  'أداة قواعد السلوك والمواظبة': {
    summary: 'تطبيق الإجراءات التربوية لتعديل السلوك وبناء الانضباط الذاتي والشراكة الفاعلة مع الأسرة.',
    ideas: [
      'نشر قواعد السلوك عبر منصات رقمية ورسوم إنفوجرافيك تفاعلية واضحة ومبسطة للطلبة وأولياء الأمور.',
      'تطبيق ميثاق الشرف الصفي الموقع من الطلاب لتعزيز الالتزام الذاتي والمحافظة على ممتلكات المدرسة.',
      'نظام حوافز إيجابي أسبوعي يكرم الفصول الأكثر التزاماً وانضباطاً سلوكياً.'
    ],
    targetAudience: 'المجتمع المدرسي وأولياء الأمور'
  },
  'خدمة رعاية الطلبة متكرري الغياب والتأخر الصباحي': {
    summary: 'تشخيص أسباب الغياب والتأخر الصباحي ووضع خطط علاجية تحفيزية بالشراكة مع المنزل.',
    ideas: [
      'برنامج "انضباطي سر نجاحي" الذي يمنح نقاط تميز للطلبة الذين يظهرون تحسناً ملموساً في الحضور.',
      'جلسات إرشادية جماعية لأولياء أمور الطلبة متكرري الغياب للوقوف على التحديات الأسرية ومعالجتها.',
      'استقبال الصباح بمسابقات خفيفة وأنشطة رياضية تجذب الطلبة وتحفز على الحضور المبكر.'
    ],
    targetAudience: 'الطلبة متكررو الغياب والتأخر'
  },
  'برنامج تعزيز السلوك الإيجابي': {
    summary: 'ترسيخ القيم الإسلامية والوطنية والاجتماعية من خلال منظومة التحفيز والتقدير التربوي.',
    ideas: [
      'مسابقة "نجم الشهر الإيجابي" لترشيح الطلاب أصحاب المبادرات التطوعية والخلق الرفيع.',
      'بطاقات الشكر الفورية من المعلمين والموجه الطلابي ترسل مباشرة لهواتف أولياء الأمور.',
      'تخصيص ركن السلوك الإيجابي في الإذاعة المدرسية لعرض قصص نجاح طلابية ملهمة.'
    ],
    targetAudience: 'جميع طلاب مدرسة الجشة المتوسطة'
  },
  'خدمة رعاية ودعم الحالات الخاصة (فئة الموهوبين)': {
    summary: 'اكتشاف وتنمية المواهب الاستثنائية للطلبة وصقل مهارات التفكير العليا لديهم.',
    ideas: [
      'إنشاء نادي الابتكار المدرسي وربط الطلبة الموهوبين بمسابقات موهبة والأولمبيادات الوطنية.',
      'توفير برامج توجيه إثرائية تتضمن مهارات البحث العلمي والتصميم والتفكير الإبداعي.',
      'معرض سنوي للموهوبين لعرض ابتكاراتهم وإنتاجاتهم أمام قيادات التعليم والمجتمع المحلي.'
    ],
    targetAudience: 'الطلبة الموهوبون وأصحاب المواهب الإبداعية'
  },
  'برنامج التوجيه المهني': {
    summary: 'مساعدة الطلبة على استكشاف ميولهم وقدراتهم والتخطيط لمساراتهم الأكاديمية والمهنية المستقبلية.',
    ideas: [
      'تطبيق مقياس الميول المهنية المبسط لطلبة الصف الثالث متوسط لتحديد المسارات المناسبة.',
      'استضافة نماذج مهنية متميزة من خريجي المدرسة والمجتمع المحلي للحديث عن مساراتهم المهنية.',
      'تنظيم زيارات ميدانية للجامعات والكليات والمعاهد التقنية لفتح آفاق التفكير المستقبلي.'
    ],
    targetAudience: 'طلبة الصفين الثاني والثالث متوسط'
  },
  'برنامج توثيق علاقة الأسرة مع المدرسة': {
    summary: 'تفعيل الشراكة الاستراتيجية بين البيت والمدرسة لدعم نمو المتعلم ورفع تحصيله الدراسي.',
    ideas: [
      'تطوير مجالس الآباء لتكون ملتقيات حوارية وورش عمل تدريبية بدلاً من الاقتصار على سرد الملاحظات.',
      'تفعيل منصة الرسائل التفاعلية السريعة لاطلاع الأسرة أسبوعياً على إنجازات الطالب الإيجابية.',
      'إشراك أولياء الأمور ذوي الخبرة في تقديم ندوات مهنية وتثقيفية لطلاب المدرسة.'
    ],
    targetAudience: 'أولياء الأمور والموجهون والمعلمون'
  },
  'برنامج الاستخدام الآمن للإنترنت والألعاب الإلكترونية': {
    summary: 'توعية الطلاب بالمواطنة الرقمية وحماية البيانات الشخصية ومخاطر الإدمان الرقمي.',
    ideas: [
      'ورشة تدريبية تطبيقية حول "الأمن السيبراني للألعاب الإلكترونية وكيفية تجنب الاحتيال والتنمر الرقمي".',
      'تحدي "الديتوكس الرقمي" (Digital Detox) لتشجيع الطلاب على تخصيص أوقات محددة يومياً بعيداً عن الشاشات.',
      'إنتاج مقاطع فيديو توعوية قصيرة يصممها الطلاب بأنفسهم وتُعرض في الإذاعة ومنصات المدرسة.'
    ],
    targetAudience: 'جميع طلاب المدرسة'
  },
  'برنامج تنمية الدافعية لرفع مستوى التحصيل الدراسي': {
    summary: 'إكساب الطلبة مهارات الاستذكار الفعال وإدارة القلق الامتحاني وتعزيز الدافعية الذاتية للإنجاز.',
    ideas: [
      'دورة تدريبية عملية في "الخرائط الذهنية واستراتيجيات المذاكرة الذكية".',
      'برنامج الأقران (طالب يعلم طالباً) لتقديم المساعدة في المواد التي تواجه بعض الطلاب صعوبة فيها.',
      'تحديد الأهداف الشخصية الذكية (SMART) لكل طالب ومتابعة تقدمه في اختبارات الفترات.'
    ],
    targetAudience: 'الطلبة منخفضو الدافعية والمتأخرون دراسياً'
  }
};

export const PedagogicalAdvisorModal: React.FC<PedagogicalAdvisorModalProps> = ({
  isOpen,
  programName,
  indicatorTitle,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Retrieve curated advice or fallback template
  const advice = CURATED_ADVICE[programName] || {
    summary: `استراتيجية إرشادية مقترحة لتنفيذ وتفعيل برنامج "${programName}" لتعزيز بيئة التعلم وتحقيق معايير الاعتماد المدرسي.`,
    ideas: [
      `عقد جلسات حوارية توعوية للطلبة حول أهداف "${programName}" وأثره الإيجابي على سلوكهم وتحصيلهم.`,
      `إشراك المعلمين ورواد الفصول في متابعة مؤشرات أداء البرنامج وتوثيق الشواهد الأسبوعية.`,
      `توثيق الأثر التربوي للبرنامج في تقرير مصور يتضمن استطلاعات رأي الطلبة وأولياء الأمور.`
    ],
    targetAudience: 'طلبة مدرسة الجشة المتوسطة والمجتمع المدرسي'
  };

  const handleCopy = () => {
    const textToCopy = `مقترحات تنفيذ: ${programName}\n\nالهدف: ${advice.summary}\n\nالأفكار والأنشطة:\n${advice.ideas
      .map((item, i) => `${i + 1}. ${item}`)
      .join('\n')}\n\nالفئة المستهدفة: ${advice.targetAudience}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[110] flex items-center justify-center p-4 overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="glass-panel rounded-3xl shadow-[0_24px_64px_rgba(15,23,42,0.2)] w-full max-w-2xl p-7 relative border border-white/80"
      >
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-white/80 rounded-full transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/60">
          <div className="p-3 bg-gradient-to-tr from-teal-500/20 to-emerald-500/10 text-teal-800 rounded-2xl border border-teal-500/20 shadow-xs">
            <Sparkles className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              المستشار التربوي الذكي للتوجيه الطلابي
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              مقترحات وأفكار ميدانية مخصصة لبرنامج: <span className="text-teal-900 font-bold">{programName}</span>
            </p>
          </div>
        </div>

        {/* Indicator context banner */}
        <div className="p-3.5 bg-white/60 backdrop-blur-xs rounded-2xl border border-white/80 shadow-xs mb-5 text-xs text-slate-700 font-medium">
          <span className="font-bold text-slate-900 ml-1">المؤشر المستهدف:</span>
          {indicatorTitle}
        </div>

        {/* Content */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Summary Box */}
          <div className="p-4 bg-teal-500/10 backdrop-blur-xs rounded-2xl border border-teal-500/20">
            <h4 className="text-xs font-bold text-teal-950 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-teal-700" />
              <span>الرؤية التربوية للبرنامج:</span>
            </h4>
            <p className="text-xs text-teal-950 font-medium leading-relaxed">
              {advice.summary}
            </p>
          </div>

          {/* Ideas List */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>أنشطة وممارسات تنفيذية مقترحة (3 أفكار مبتكرة):</span>
            </h4>
            <div className="space-y-2.5">
              {advice.ideas.map((idea, index) => (
                <div
                  key={index}
                  className="p-3.5 glass-card rounded-2xl flex items-start gap-3"
                >
                  <span className="w-6 h-6 bg-white/80 text-teal-900 font-mono text-xs font-bold rounded-xl flex items-center justify-center shrink-0 mt-0.5 border border-white/80 shadow-xs">
                    {index + 1}
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {idea}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="text-xs text-slate-500 bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-white/80">
            <span className="font-bold text-slate-700 ml-1">الفئة المستهدفة:</span>
            {advice.targetAudience}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-white/60 flex items-center justify-between gap-3">
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-white/80 hover:bg-white text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border border-white/80 shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>تم نسخ المقترحات بنجاح</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>نسخ المقترحات للاستخدام</span>
              </>
            )}
          </motion.button>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm border border-white/20 cursor-pointer"
          >
            تم الاطلاع
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
