import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Link2, CheckCircle2, AlertCircle } from 'lucide-react';

interface UploadLinkModalProps {
  isOpen: boolean;
  indicatorId: string;
  programName: string;
  existingLink?: string;
  onClose: () => void;
  onSave: (indicatorId: string, programName: string, link: string) => void;
}

export const UploadLinkModal: React.FC<UploadLinkModalProps> = ({
  isOpen,
  indicatorId,
  programName,
  existingLink = '',
  onClose,
  onSave,
}) => {
  const [url, setUrl] = useState(existingLink);
  const [error, setError] = useState('');

  useEffect(() => {
    setUrl(existingLink);
    setError('');
  }, [existingLink, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError('يرجى إدخال رابط التقرير أو الشاهد.');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setError('يرجى إدخال رابط ويب يبدأ بـ https:// أو http://');
      return;
    }

    onSave(indicatorId, programName, trimmed);
    onClose();
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
        className="glass-panel rounded-3xl shadow-[0_24px_64px_rgba(15,23,42,0.2)] w-full max-w-lg p-7 relative border border-white/80"
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
            <Link2 className="w-6 h-6 text-teal-700" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              إرفاق واعتماد رابط التقرير / الشاهد
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              مؤشر: <span className="font-mono text-teal-900 font-bold">{indicatorId}</span>
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/60 backdrop-blur-xs rounded-2xl border border-white/80 shadow-xs mb-5">
          <span className="text-[11px] font-bold text-slate-400 block mb-1">
            البرنامج أو الخدمة المستهدفة:
          </span>
          <span className="text-sm font-bold text-slate-800 block">
            {programName}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              رابط الملف أو المجلد السحابي (SharePoint / OneDrive / Google Drive)
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={e => {
                  setUrl(e.target.value);
                  if (error) setError('');
                }}
                placeholder="https://estboys-my.sharepoint.com/... أو https://drive.google.com/..."
                className="glass-input w-full px-4 py-2.5 rounded-2xl text-xs text-left dir-ltr font-mono focus:outline-none transition-all"
                autoFocus
              />
            </div>
            {error ? (
              <p className="text-xs font-bold text-red-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1.5">
                تأكد من أن إعدادات مشاركة الملف تسمح بالاطلاع للمسؤولين والزوار
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer border border-white/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>اعتماد وحفظ الرابط</span>
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-white/70 hover:bg-white text-slate-700 font-bold text-xs rounded-xl transition-colors border border-white/80 cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
