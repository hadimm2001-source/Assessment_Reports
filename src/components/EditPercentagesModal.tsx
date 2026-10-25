import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sliders, CheckCircle2, RotateCcw } from 'lucide-react';
import { DashboardSettings } from '../types';

interface EditPercentagesModalProps {
  isOpen: boolean;
  settings: DashboardSettings;
  onClose: () => void;
  onSave: (newSettings: DashboardSettings) => void;
}

export const EditPercentagesModal: React.FC<EditPercentagesModalProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
}) => {
  const [overall, setOverall] = useState(settings.overall);
  const [admin, setAdmin] = useState(settings.domains['الإدارة المدرسية'] ?? 100);
  const [outcomes, setOutcomes] = useState(settings.domains['نواتج التعلم'] ?? 100);
  const [learning, setLearning] = useState(settings.domains['التعليم والتعلم'] ?? 100);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      overall: Math.min(100, Math.max(0, Number(overall))),
      domains: {
        'الإدارة المدرسية': Math.min(100, Math.max(0, Number(admin))),
        'نواتج التعلم': Math.min(100, Math.max(0, Number(outcomes))),
        'التعليم والتعلم': Math.min(100, Math.max(0, Number(learning))),
      },
    });
    onClose();
  };

  const handleReset = () => {
    setOverall(100);
    setAdmin(100);
    setOutcomes(100);
    setLearning(100);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="glass-panel rounded-3xl shadow-[0_24px_64px_rgba(15,23,42,0.2)] w-full max-w-md p-7 relative border border-white/80"
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

        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/60">
          <div className="p-3 bg-gradient-to-tr from-teal-500/20 to-emerald-500/10 text-teal-800 rounded-2xl border border-teal-500/20 shadow-xs">
            <Sliders className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              تخصيص نسب التقويم المدرسي
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              تنعكس التعديلات فوراً على الرسوم البيانية ولوحة القيادة
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              نسبة الإنجاز الكلية للاعتماد (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={overall}
              onChange={e => setOverall(Number(e.target.value))}
              className="glass-input w-full px-4 py-2 rounded-2xl text-sm font-bold font-mono text-teal-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              مجال الإدارة المدرسية (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={admin}
              onChange={e => setAdmin(Number(e.target.value))}
              className="glass-input w-full px-4 py-2 rounded-2xl text-sm font-bold font-mono text-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              مجال نواتج التعلم (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={outcomes}
              onChange={e => setOutcomes(Number(e.target.value))}
              className="glass-input w-full px-4 py-2 rounded-2xl text-sm font-bold font-mono text-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              مجال التعليم والتعلم (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={learning}
              onChange={e => setLearning(Number(e.target.value))}
              className="glass-input w-full px-4 py-2 rounded-2xl text-sm font-bold font-mono text-slate-700 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/60 gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl hover:bg-white/60 flex items-center gap-1 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة 100%</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-white/70 hover:bg-white text-slate-700 font-bold text-xs rounded-xl border border-white/80 cursor-pointer"
              >
                إلغاء
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-2 px-4 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm border border-white/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
