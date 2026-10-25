import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, ShieldCheck, AlertCircle, X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsAdmin: () => void;
  onLoginAsVisitor: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginAsAdmin,
  onLoginAsVisitor,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1122') {
      setError(false);
      setPassword('');
      onLoginAsAdmin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
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
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          x: error ? [-10, 10, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 350, 
          damping: 25,
          x: { duration: 0.4 } 
        }}
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

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-teal-600 to-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-teal-600/25 border border-white/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            بوابة نظام التقويم المدرسي
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            مدرسة الجشة المتوسطة · التوجيه الطلابي
          </p>
        </div>

        {/* Visitor Access */}
        <div className="space-y-3 mb-6">
          <motion.button
            onClick={() => {
              onLoginAsVisitor();
              onClose();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-white/70 hover:bg-white/95 border border-white/80 text-slate-700 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Eye className="w-4 h-4 text-teal-600" />
            <span>الدخول السريع بوضع الزائر (للاطلاع فقط)</span>
          </motion.button>
          <p className="text-[11px] text-slate-400 text-center font-medium">
            يتيح وضع الزائر استعراض كافة المؤشرات والنسب والشواهد المعتمدة دون الحاجة لكلمة مرور
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-2 mb-4">
          <div className="flex-grow border-t border-slate-200/60"></div>
          <span className="flex-shrink-0 mx-3 text-slate-400 text-xs font-bold">
            أو تسجيل دخول الموجه الطلابي
          </span>
          <div className="flex-grow border-t border-slate-200/60"></div>
        </div>

        {/* Admin Form */}
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              كلمة مرور المسؤول (الموجه الطلابي)
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="أدخل كلمة المرور..."
                className={`glass-input w-full px-4 py-2.5 rounded-2xl text-sm transition-all focus:outline-none dir-ltr text-left font-mono ${
                  error
                    ? 'border-red-400 ring-2 ring-red-400/20 bg-red-50/50 text-red-700'
                    : 'border-slate-200/80 focus:border-teal-500'
                }`}
                autoFocus
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 mt-1.5"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>كلمة المرور غير صحيحة، يرجى التحقق وإعادة المحاولة</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 active:scale-95 cursor-pointer border border-white/20"
          >
            <Lock className="w-4 h-4" />
            <span>تسجيل الدخول كمسؤول</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
