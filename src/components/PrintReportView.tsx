import React from 'react';
import { motion } from 'motion/react';
import { Indicator, DashboardSettings } from '../types';
import { Printer, CheckCircle2, Award, Calendar, FileText, ArrowRight } from 'lucide-react';

interface PrintReportViewProps {
  indicators: Indicator[];
  reports: Record<string, string>;
  settings: DashboardSettings;
  currentDateText: string;
  onBackToDashboard: () => void;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({
  indicators,
  reports,
  settings,
  currentDateText,
  onBackToDashboard,
}) => {
  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Print error', e);
    }
  };

  let totalPrograms = 0;
  let completedPrograms = 0;
  indicators.forEach(i => {
    i.programs.forEach(p => {
      totalPrograms++;
      if (reports[`${i.id}-${p.name}`]) completedPrograms++;
    });
  });

  const isAllReportsCompleted = totalPrograms > 0 && completedPrograms === totalPrograms;
  const displayOverall = totalPrograms > 0 ? Math.round((completedPrograms / totalPrograms) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-sm"
      >
        <motion.button
          onClick={onBackToDashboard}
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-white/70 hover:bg-white text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border border-white/80 shadow-xs cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى لوحة القيادة</span>
        </motion.button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            تقرير رسمي جاهز للطباعة والرفع للجهات الإشرافية
          </span>
          <motion.button
            onClick={handlePrint}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-teal-700/20 flex items-center gap-2 active:scale-95 cursor-pointer border border-white/20"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة أو حفظ بصيغة PDF</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Official Report Document */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-slate-900 font-sans print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
          <div className="text-right space-y-1">
            <h4 className="text-xs font-bold text-slate-500">المملكة العربية السعودية</h4>
            <h4 className="text-xs font-bold text-slate-500">وزارة التعليم</h4>
            <h4 className="text-xs font-bold text-slate-500">الإدارة العامة للتعليم بمحافظة الأحساء</h4>
            <h3 className="text-sm font-black text-slate-900">مدرسة الجشة المتوسطة</h3>
            <p className="text-xs font-bold text-teal-800">قسم التوجيه الطلابي</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 border-2 border-teal-800 rounded-full flex flex-col items-center justify-center p-2 mx-auto mb-1 text-teal-900">
              <Award className="w-7 h-7 text-teal-800" />
            </div>
            <span className="text-[11px] font-bold text-slate-600 block">التقويم والاعتماد المدرسي</span>
          </div>

          <div className="text-left space-y-1 text-xs">
            <p><span className="text-slate-500">التاريخ: </span><span className="font-bold">{currentDateText}</span></p>
            <p><span className="text-slate-500">العام الدراسي: </span><span className="font-bold">1447 - 1448 هـ</span></p>
            <p><span className="text-slate-500">الموجه الطلابي: </span><span className="font-bold">عبدالهادي المحسن</span></p>
          </div>
        </div>

        {/* Report Title */}
        <div className="my-8 text-center space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            تقرير استيفاء مؤشرات التوجيه الطلابي للتقويم المدرسي
          </h1>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            بيان تفصيلي ببرامج وخدمات التوجيه الطلابي المرتبطة بمعايير ومؤشرات هيئة تقويم التعليم والتدريب
          </p>
        </div>

        {/* High-level Summary Strip */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-8 text-center">
          <div>
            <span className="text-xs text-slate-500 block mb-1">المؤشرات المستهدفة</span>
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">{indicators.length}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block mb-1">البرامج الإرشادية</span>
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">{totalPrograms}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block mb-1">الشواهد المعتمدة</span>
            <span className="text-2xl font-black text-emerald-700 font-mono tabular-nums">{completedPrograms}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block mb-1">نسبة الإنجاز الكلية</span>
            <span className="text-2xl font-black text-teal-800 font-mono tabular-nums">{displayOverall}%</span>
          </div>
        </div>

        {/* Indicators Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-y border-slate-300">
                <th className="py-3 px-3 font-bold w-16">رقم المؤشر</th>
                <th className="py-3 px-3 font-bold w-32">المجال</th>
                <th className="py-3 px-3 font-bold">نص المؤشر والمعيار</th>
                <th className="py-3 px-3 font-bold w-20 text-center">نسبة الإنجاز</th>
                <th className="py-3 px-3 font-bold w-48">البرامج والشواهد المرتبطة</th>
                <th className="py-3 px-3 font-bold w-24 text-center">حالة الشاهد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {indicators.map((ind, idx) => {
                const totalIndProgs = ind.programs.length;
                const completedIndProgs = ind.programs.filter(p => !!reports[`${ind.id}-${p.name}`]).length;
                const indPercent = totalIndProgs > 0 ? Math.round((completedIndProgs / totalIndProgs) * 100) : 0;
                const isAllDone = totalIndProgs > 0 && completedIndProgs === totalIndProgs;

                return (
                  <tr key={ind.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{ind.id}</td>
                    <td className="py-3 px-3 font-bold text-teal-800">{ind.domain}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-800">{ind.indicator}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">المعيار: {ind.standard}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">
                      {indPercent}%
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                        {ind.programs.map((p, pIdx) => (
                          <li key={pIdx} className="truncate max-w-[200px]" title={p.name}>
                            {p.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {isAllDone ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>مكتمل</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold text-[11px]">قيد الاستكمال</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Signatures & Certification Stamp Footer */}
        <div className="pt-8 border-t-2 border-slate-900 grid grid-cols-3 gap-6 text-center text-xs">
          <div>
            <p className="font-bold text-slate-600 mb-10">إعداد الموجه الطلابي</p>
            <p className="font-black text-slate-900 text-sm">عبدالهادي بن محمد المحسن</p>
            <p className="text-[11px] text-slate-400">التوقيع: ............................</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 border-2 border-dashed border-slate-400 rounded-full flex flex-col items-center justify-center text-slate-400 text-[10px] font-bold">
              <span>ختم المدرسة</span>
              <span>الرسمي</span>
            </div>
          </div>

          <div>
            <p className="font-bold text-slate-600 mb-10">مدير مدرسة الجشة المتوسطة</p>
            <p className="font-black text-slate-900 text-sm">إدارة المدرسة</p>
            <p className="text-[11px] text-slate-400">التوقيع: ............................</p>
          </div>
        </div>

      </div>
    </div>
  );
};
