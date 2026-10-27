import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Indicator } from '../types';
import { X, ExternalLink, Link2, Trash2, Sparkles, CheckCircle2, FileText, RefreshCw } from 'lucide-react';

interface ProgramsModalProps {
  indicator: Indicator | null;
  reports: Record<string, string>;
  isAdmin: boolean;
  onClose: () => void;
  onOpenUpload: (indicatorId: string, programName: string) => void;
  onDeleteReport: (indicatorId: string, programName: string) => void;
  onOpenAdvisor: (programName: string, indicatorTitle: string) => void;
  onResetToDefaults?: () => void;
}

export const ProgramsModal: React.FC<ProgramsModalProps> = ({
  indicator,
  reports,
  isAdmin,
  onClose,
  onOpenUpload,
  onDeleteReport,
  onOpenAdvisor,
  onResetToDefaults,
}) => {
  if (!indicator) return null;

  const completedCount = indicator.programs.filter(p => !!reports[`${indicator.id}-${p.name}`]).length;
  const currentProgress = indicator.programs.length > 0 
    ? Math.round((completedCount / indicator.programs.length) * 100) 
    : 0;

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="glass-panel rounded-3xl shadow-[0_24px_64px_rgba(15,23,42,0.18)] w-full max-w-3xl overflow-hidden border border-white/70"
      >
        {/* Header */}
        <div className="p-6 bg-white/60 backdrop-blur-md border-b border-white/60 flex items-start justify-between gap-4">
          <div className="pr-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono tabular-nums text-xs font-bold px-2.5 py-0.5 bg-white/80 text-slate-800 rounded-lg border border-white/80 shadow-xs">
                مؤشر {indicator.id}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-teal-500/10 text-teal-900 border border-teal-500/20 rounded-lg">
                {indicator.domain}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                المعيار: {indicator.standard}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                currentProgress === 100 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : currentProgress > 0 
                  ? 'bg-amber-50 text-amber-800 border-amber-200' 
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                الإنجاز: {currentProgress}% ({completedCount} من {indicator.programs.length} شواهد)
              </span>

              {isAdmin && onResetToDefaults && (
                <motion.button
                  onClick={onResetToDefaults}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                  title="تحديث ومزامنة كافة الشواهد مع أحدث روابط SharePoint المعتمدة"
                >
                  <RefreshCw className="w-3 h-3 text-emerald-600" />
                  <span>تحديث للروابط المعتمدة</span>
                </motion.button>
              )}
            </div>
            <h2 className="text-xl font-black text-slate-900 leading-snug">
              {indicator.indicator}
            </h2>
          </div>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white/80 rounded-full transition-colors shrink-0 cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content list */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-200/40">
            <span>البرامج والخدمات الإرشادية المطلوبة للمؤشر ({indicator.programs.length})</span>
            <span>حالة الإرفاق والاعتماد</span>
          </div>

          {indicator.programs.map((prog, index) => {
            const reportLink = reports[`${indicator.id}-${prog.name}`];
            const isCompleted = !!reportLink;

            return (
              <motion.div
                key={prog.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-500/5 backdrop-blur-xs'
                    : 'glass-card'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Info */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-2xl shrink-0 mt-0.5 shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/20'
                          : 'bg-slate-200/50 text-slate-500 border border-white/60'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-800 leading-tight">
                        {prog.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        {isCompleted
                          ? 'الشاهد والتقرير الرقمي موثق ومتاح للاطلاع المباشر'
                          : 'بانتظار إرفاق ملف التقرير أو الشاهد الميداني'}
                      </p>

                      {/* Admin Pedagogical AI Advisor button */}
                      {isAdmin && (
                        <motion.button
                          onClick={() => onOpenAdvisor(prog.name, indicator.indicator)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 px-3 py-1 rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                          <span>استلهام مقترحات تربوية للبرنامج</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {isCompleted ? (
                      <>
                        <motion.a
                          href={reportLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm border border-white/10"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>فتح التقرير / الشاهد</span>
                        </motion.a>

                        {isAdmin && (
                          <div className="flex items-center gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onOpenUpload(indicator.id, prog.name)}
                              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white/80 rounded-xl transition-colors cursor-pointer"
                              title="تعديل الرابط"
                            >
                              <Link2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onDeleteReport(indicator.id, prog.name)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/80 rounded-xl transition-colors cursor-pointer"
                              title="حذف الرابط"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {isAdmin ? (
                          <motion.button
                            onClick={() => onOpenUpload(indicator.id, prog.name)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm border border-white/20 cursor-pointer"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                            <span>إرفاق رابط الشاهد</span>
                          </motion.button>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium px-3 py-1.5 bg-white/60 rounded-xl border border-white/80">
                            قيد الإعداد
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/60 backdrop-blur-md border-t border-white/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            مدرسة الجشة المتوسطة · التوجيه الطلابي
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/80 hover:bg-white text-slate-700 text-xs font-bold rounded-xl transition-colors border border-white/80 shadow-xs cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </motion.div>
    </div>
  );
};
