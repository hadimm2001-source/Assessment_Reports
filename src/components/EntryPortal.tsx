import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ministryLogo from '../assets/logo.png';
import { 
  ShieldCheck, 
  Eye, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Sparkles, 
  GraduationCap, 
  FileText, 
  BarChart3, 
  ShieldAlert,
  ChevronLeft
} from 'lucide-react';

interface EntryPortalProps {
  onEnterAsVisitor: () => void;
  onEnterAsAdmin: () => void;
}

export const EntryPortal: React.FC<EntryPortalProps> = ({
  onEnterAsVisitor,
  onEnterAsAdmin,
}) => {
  const [selectedRole, setSelectedRole] = useState<'visitor' | 'admin' | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1122') {
      setIsLoading(true);
      setError(false);
      setTimeout(() => {
        setIsLoading(false);
        onEnterAsAdmin();
      }, 350);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-teal-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-32 -left-32 w-[700px] h-[700px] bg-emerald-500/18 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]"
        />
      </div>

      {/* Decorative Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Ministry & School Branding Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10">
        <div className="flex items-center">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/80 shadow-md flex items-center justify-center">
            <img 
              src={ministryLogo} 
              alt="شعار وزارة التعليم - المملكة العربية السعودية" 
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-xs"
              onError={(e) => {
                const target = e.currentTarget;
                const fallbackUrl = `${import.meta.env.BASE_URL}assets/aistudio/logo_c05be10b.png`;
                if (target.src !== fallbackUrl) {
                  target.src = fallbackUrl;
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <GraduationCap className="w-4 h-4 text-teal-400 shrink-0" />
          <span>قسم التوجيه الطلابي · أ. عبدالهادي المحسن</span>
        </div>
      </header>

      {/* Main Gate Content */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 flex flex-col justify-center items-center">
        
        {/* Hero Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-black mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>بوابة الدخول والوصول للنظام الرقمي</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight mb-4">
            نظام التقويم المدرسي ومتابعة شواهد التوجيه الطلابي
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            منظومة توثيق إلكترونية متطورة لرصد وتدقيق شواهد مؤشرات التوجيه الطلابي (12 مؤشراً و27 برنامجاً إرشادياً) وفق معايير هيئة تقويم التعليم والتدريب.
          </p>
          <p className="text-teal-400 font-bold text-xs sm:text-sm mt-3">
            يرجى تحديد صفة الدخول للمتابعة:
          </p>
        </motion.div>

        {/* The Two Portals: Visitor vs Counselor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          
          {/* Card 1: Visitor Role */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className={`rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl border ${
              selectedRole === 'visitor'
                ? 'bg-gradient-to-b from-white/15 to-white/5 border-teal-400/80 shadow-[0_16px_40px_rgba(20,184,166,0.2)]'
                : 'bg-white/5 hover:bg-white/10 border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-400/20 via-teal-400 to-emerald-400/20" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shadow-inner">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  متاح للجميع
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                دخول كـ زائر
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                مخصص لمدير المدرسة واعضاء لجان التقويم المدرسي
              </p>

              {/* Feature Highlights */}
              <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>استعراض المؤشرات والشواهد الرسمية (12 مؤشر)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>فتح وتدقيق ملفات وروابط الشواهد (27 برنامج)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>استعراض الرسوم البيانية ومخططات الإنجاز التفاعلية</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>طباعة واستخراج التقرير الشامل للاعتماد</span>
                </li>
              </ul>
            </div>

            <motion.button
              onClick={onEnterAsVisitor}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-sm transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>متابعة الدخول كزائر (بدون كلمة مرور)</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Card 2: Student Advisor (Admin Role) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: error ? [-8, 8, -6, 6, -3, 3, 0] : 0 
            }}
            transition={{ 
              duration: 0.5, 
              delay: 0.15,
              x: { duration: 0.4 } 
            }}
            whileHover={{ y: -4 }}
            className={`rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between relative overflow-hidden backdrop-blur-2xl border ${
              selectedRole === 'admin'
                ? 'bg-gradient-to-b from-white/15 to-white/5 border-emerald-400/80 shadow-[0_16px_40px_rgba(16,185,129,0.2)]'
                : 'bg-white/5 hover:bg-white/10 border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-400/20 via-emerald-400 to-teal-400/20" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  صلاحيات كاملة
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                دخول الموجه الطلابي
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                مخصص للموجه الطلابي <span className="text-emerald-300 font-bold">أ. عبدالهادي المحسن</span> لإدارة شواهد البرامج، تعديل روابط السحابة، والاعتماد.
              </p>

              {/* Feature Highlights */}
              <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>إرفاق وتعديل وحذف روابط الشواهد والملفات</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تحديث نسب مجالات التقويم المدرسي المعتمدة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>مزامنة وتصدير الشواهد لـ GitHub والتخزين السحابي</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>إدارة التنبيهات الفورية والمستشار التربوي</span>
                </li>
              </ul>
            </div>

            {/* Interactive Password Form */}
            <form onSubmit={handleAdminSubmit} className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                    setSelectedRole('admin');
                  }}
                  placeholder="أدخل كلمة المرور للموجه الطلابي..."
                  className={`w-full py-3.5 pr-11 pl-11 rounded-2xl bg-black/40 border text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none transition-all ${
                    error
                      ? 'border-red-500/80 ring-2 ring-red-500/30'
                      : 'border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
                  }`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label="إظهار أو إخفاء كلمة المرور"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Error feedback */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-500/30 px-3 py-1.5 rounded-xl font-bold"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>جارٍ التحقق...</span>
                  </span>
                ) : (
                  <>
                    <span>تسجيل الدخول كـ موجه طلابي</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

          </motion.div>

        </div>



      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-5 text-center text-xs text-slate-400 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <p>
          نظام التقويم المدرسي المطور · مدرسة الجشة المتوسطة · الأحساء · إشراف الموجه الطلابي: <span className="text-slate-200 font-bold">عبدالهادي بن محمد المحسن</span>
        </p>
      </footer>

    </div>
  );
};
