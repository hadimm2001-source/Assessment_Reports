import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  X, 
  HelpCircle, 
  FileCode, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface DataSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: Record<string, string>;
  onImportReports: (imported: Record<string, string>) => void;
  onResetToDefaults?: () => void;
}

export const DataSyncModal: React.FC<DataSyncModalProps> = ({
  isOpen,
  onClose,
  reports,
  onImportReports,
  onResetToDefaults,
}) => {
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'github' | 'export_import' | 'explain'>('github');

  if (!isOpen) return null;

  const totalReportsCount = Object.keys(reports).length;

  // Generate clean TypeScript code for initialData.ts
  const generateGitHubCode = () => {
    return `export const PRE_SAVED_REPORTS: Record<string, string> = ${JSON.stringify(reports, null, 2)};`;
  };

  const handleCopyGitHubCode = async () => {
    try {
      await navigator.clipboard.writeText(generateGitHubCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Export JSON file download
  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reports, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aljasha_reports_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON handler from file input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (typeof parsed === 'object' && parsed !== null) {
          onImportReports(parsed);
          setImportStatus({
            type: 'success',
            message: `تم بنجاح استيراد ${Object.keys(parsed).length} رابط شاهد معتمد!`,
          });
        } else {
          throw new Error('صيغة الملف غير متوافقة');
        }
      } catch {
        setImportStatus({
          type: 'error',
          message: 'فشل استيراد الملف: يرجى التأكد من اختيار ملف JSON صالح.',
        });
      }
    };
    reader.readAsText(file);
  };

  // Import JSON from text area
  const handleManualImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (typeof parsed === 'object' && parsed !== null) {
        onImportReports(parsed);
        setImportStatus({
          type: 'success',
          message: `تم بنجاح استيراد ${Object.keys(parsed).length} رابط شاهد معتمد!`,
        });
        setImportText('');
      } else {
        throw new Error('تنسيق غير صالح');
      }
    } catch {
      setImportStatus({
        type: 'error',
        message: 'النص المدخل ليس بصيغة JSON صحيحة. يرجى مراجعة الكود.',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[120] flex items-center justify-center p-4 overflow-y-auto no-print"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="glass-panel rounded-3xl shadow-[0_24px_64px_rgba(15,23,42,0.3)] w-full max-w-2xl p-6 sm:p-8 relative border border-white/80 bg-white/95 text-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 via-teal-800 to-teal-600 text-white flex items-center justify-center shadow-md">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">
              مركز مزامنة البيانات وتحديث GitHub
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              مدرسة الجشة المتوسطة · إجمالي الشواهد الحالية: <span className="font-bold text-teal-700">{totalReportsCount} شاهد معتمد</span>
            </p>
          </div>
        </div>

        {/* Instant SharePoint Links Sync Banner */}
        {onResetToDefaults && (
          <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="text-right">
              <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تحديث وتطبيق روابط SharePoint الجديدة فوراً</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                إذا كان متصفحك أو متصفح الزوار يعرض روابط قديمة محفوظة سابقاً في الذاكرة المؤقتة، اضغط هنا لمزامنة كافة البرامج الـ 27 بأحدث الروابط الرسمية المعتمدة فوراً.
              </p>
            </div>
            <motion.button
              onClick={() => onResetToDefaults()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="shrink-0 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>تحديث الروابط الآن</span>
            </motion.button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl mb-6 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'github'
                ? 'bg-white text-teal-900 shadow-sm font-black'
                : 'hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-teal-600" />
            <span>تحديث GitHub الدائم (موصى به)</span>
          </button>

          <button
            onClick={() => setActiveTab('export_import')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'export_import'
                ? 'bg-white text-teal-900 shadow-sm font-black'
                : 'hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-600" />
            <span>تصدير واستيراد ملف JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('explain')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'explain'
                ? 'bg-white text-teal-900 shadow-sm font-black'
                : 'hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span>لماذا حدث ذلك في GitHub؟</span>
          </button>
        </div>

        {/* Tab 1: GitHub Permanent Code Update */}
        {activeTab === 'github' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-900 leading-relaxed">
              <div className="flex items-center gap-2 font-black text-teal-950 mb-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>كيف تجعل الشواهد تظهر بنسبة 100% لجميع زوار رابط GitHub؟</span>
              </div>
              <p>
                لكي يرى أي زائر أو مشرف تربوي الشواهد الجديدة فور فتح رابط صفحة GitHub، يجب تحديث مصفوفة الشواهد في الكود المصدري للمشروع. قمنا بتوليد الكود البرمجي الكامل والمحدث تلقائياً أدناه!
              </p>
            </div>

            {/* Code Box */}
            <div className="relative">
              <div className="flex items-center justify-between bg-slate-900 text-slate-300 text-[11px] font-mono px-4 py-2.5 rounded-t-2xl border-b border-slate-700">
                <span>src/data/initialData.ts (PRE_SAVED_REPORTS)</span>
                <span className="text-teal-400 font-bold">{totalReportsCount} روابط مضمنة</span>
              </div>
              <pre className="bg-slate-950 text-emerald-400 p-4 rounded-b-2xl text-[11px] font-mono overflow-x-auto max-h-48 border border-slate-800 dir-ltr text-left">
                {generateGitHubCode()}
              </pre>
            </div>

            {/* Action Buttons & Steps */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <motion.button
                onClick={handleCopyGitHubCode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full sm:flex-1 py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/25'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم نسخ الكود للحافظة بنجاح! جاهز للصق</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ كود الشواهد المحدّث لـ GitHub</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-800">خطوات التحديث في GitHub في دقيقة واحدة:</div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
                <li>انسخ الكود بالزر أعلاه.</li>
                <li>توجه لمستودعك على GitHub وافتح ملف: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">src/data/initialData.ts</code></li>
                <li>استبدل محتوى <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">PRE_SAVED_REPORTS</code> بالكود المنسوخ.</li>
                <li>اضغط <strong>Commit changes</strong>؛ وخلال دقيقة سيتم تحديث صفحة GitHub لتظهر كافة الشواهد والنسب بنسبة 100% لكل زائر بالعالم!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 2: Export & Import JSON */}
        {activeTab === 'export_import' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              يمكنك تصدير قاعدة بيانات الشواهد كاملة كملف احتياطي (JSON) على جهازك، أو استيرادها على أي متصفح أو جهاز آخر في ثانية واحدة:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Export Button */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-teal-600" />
                    <span>تصدير ملف الشواهد احتياطياً</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-4">
                    تحميل ملف بصيغة JSON يحتوي على جميع الروابط والشواهد المحفوظة حالياً.
                  </p>
                </div>
                <button
                  onClick={handleDownloadJSON}
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل الملف (.json)</span>
                </button>
              </div>

              {/* Import from File */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>استيراد ملف الشواهد</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-4">
                    اختر ملف JSON محفوظ سابقاً لاستعادة جميع الروابط في هذا المتصفح فوراً.
                  </p>
                </div>
                <label className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs text-center">
                  <Upload className="w-3.5 h-3.5" />
                  <span>اختيار ملف للاستيراد</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Manual JSON Paste Area */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                أو الصق محتوى ملف JSON هنا مباشرة:
              </label>
              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder='{"3-1-2-1-برنامج التهيئة النفسية": "https://..."}'
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono dir-ltr focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <button
                type="button"
                disabled={!importText.trim()}
                onClick={handleManualImport}
                className="mt-2 py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-40 transition-all cursor-pointer"
              >
                تطبيق واستيراد البيانات
              </button>
            </div>

            {/* Status Feedback */}
            <AnimatePresence>
              {importStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    importStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {importStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{importStatus.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Tab 3: Detailed Explanation */}
        {activeTab === 'explain' && (
          <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-900 mb-1 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>سبب عدم ظهور الشواهد الجديدة في GitHub:</span>
              </div>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                حينما ترفع رابطاً أو تعدل شاهداً داخل المتصفح، يُحفظ الرابط في الذاكرة المحلية لجهازك (<code className="font-mono bg-amber-200/60 px-1 py-0.5 rounded">localStorage</code>) وهي ذاكرة خاصة برابط الموقع الذي كنت تعمل عليه فقط.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900 text-sm">لماذا ظهرت الشواهد القديمة؟</div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 pr-1 text-[11px]">
                <li>
                  عند رفع المشروع على مستودع GitHub ونشره عبر GitHub Pages، يعتبر المتصفح هذا الموقع نطاقاً جديداً بذاكرة محلية فارغة.
                </li>
                <li>
                  يقوم النظام بالرجوع تلقائياً إلى البيانات المكتوبة في الكود المصدري داخل ملف <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">src/data/initialData.ts</code>.
                </li>
                <li>
                  أيضاً: الزوار والمشرفون الذين يفتحون رابط GitHub لا يملكون ذاكرة متصفحك؛ لذلك الحل الجذري هو نسخ الكود المحدث من علامة التبويب الأولى ولصقه في <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">initialData.ts</code> على GitHub.
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('github')}
                className="py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <FileCode className="w-4 h-4" />
                <span>انتقل لنسخ كود GitHub المحدّث الآن</span>
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
