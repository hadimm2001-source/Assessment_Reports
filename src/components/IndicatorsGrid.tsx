import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Indicator } from '../types';
import { Search, Filter, BookOpen, ExternalLink, CheckCircle, ChevronLeft, Sparkles } from 'lucide-react';

interface IndicatorsGridProps {
  indicators: Indicator[];
  reports: Record<string, string>;
  onSelectIndicator: (indicator: Indicator) => void;
}

export const IndicatorsGrid: React.FC<IndicatorsGridProps> = ({
  indicators,
  reports,
  onSelectIndicator,
}) => {
  const [activeDomain, setActiveDomain] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'complete' | 'in_progress'>('all');

  const domains = ['الكل', 'الإدارة المدرسية', 'نواتج التعلم', 'التعليم والتعلم'];

  // Filter indicators
  const filteredIndicators = useMemo(() => {
    return indicators.filter(item => {
      const matchDomain = activeDomain === 'الكل' || item.domain === activeDomain;
      const matchSearch =
        item.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.programs.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchStatus = true;
      const allProgramsDone = item.programs.every(p => !!reports[`${item.id}-${p.name}`]);
      if (statusFilter === 'complete') matchStatus = allProgramsDone;
      if (statusFilter === 'in_progress') matchStatus = !allProgramsDone;

      return matchDomain && matchSearch && matchStatus;
    });
  }, [indicators, activeDomain, searchQuery, statusFilter, reports]);

  // Color helper for progress bar
  const getProgressGradient = (progress: number) => {
    if (progress === 100) return 'from-emerald-500 via-teal-500 to-cyan-500';
    if (progress >= 75) return 'from-teal-500 to-emerald-500';
    if (progress >= 50) return 'from-cyan-500 to-teal-500';
    if (progress >= 25) return 'from-amber-500 to-teal-500';
    return 'from-slate-400 to-slate-500';
  };

  const getDomainBadge = (domain: string) => {
    switch (domain) {
      case 'الإدارة المدرسية':
        return 'text-emerald-900 bg-emerald-500/10 border-emerald-500/20';
      case 'نواتج التعلم':
        return 'text-teal-900 bg-teal-500/10 border-teal-500/20';
      case 'التعليم والتعلم':
        return 'text-cyan-900 bg-cyan-500/10 border-cyan-500/20';
      default:
        return 'text-slate-800 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <section className="space-y-6">
      {/* Search & Domain Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-4 sm:p-5 rounded-3xl space-y-4"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Domain Segmented Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none p-1 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60">
            <span className="text-xs font-bold text-slate-500 px-2 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-teal-600" />
              المجال:
            </span>
            {domains.map(dom => (
              <motion.button
                key={dom}
                onClick={() => setActiveDomain(dom)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeDomain === dom
                    ? 'text-teal-950 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                {activeDomain === dom && (
                  <motion.div
                    layoutId="activeDomainIndicator"
                    className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-xl border border-white/80 shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{dom}</span>
              </motion.button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] md:w-80">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم المؤشر أو اسم البرنامج..."
              className="glass-input w-full pr-10 pl-4 py-2 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Secondary Status Filter & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">حالة الشواهد:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-xl transition-all font-semibold cursor-pointer ${
                statusFilter === 'all' 
                  ? 'bg-slate-900 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              الكل ({indicators.length})
            </button>
            <button
              onClick={() => setStatusFilter('complete')}
              className={`px-3 py-1 rounded-xl transition-all font-semibold cursor-pointer ${
                statusFilter === 'complete' 
                  ? 'bg-emerald-600 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              المكتملة (100%)
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3 py-1 rounded-xl transition-all font-semibold cursor-pointer ${
                statusFilter === 'in_progress' 
                  ? 'bg-amber-600 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:bg-white/60'
              }`}
            >
              قيد الاستكمال
            </button>
          </div>

          <div className="text-slate-400 font-medium">
            يتم عرض <span className="font-bold text-slate-700 font-mono tabular-nums">{filteredIndicators.length}</span> من أصل <span className="font-mono tabular-nums">{indicators.length}</span> مؤشراً
          </div>
        </div>
      </motion.div>

      {/* Indicators Grid */}
      {filteredIndicators.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-3xl p-12 text-center"
        >
          <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 shadow-inner">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">لا توجد نتائج مطابقة لبحثك</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            تأكد من كتابة الكلمات بشكل صحيح، أو اختر تصنيف "الكل" لإعادة عرض كافة مؤشرات التوجيه الطلابي.
          </p>
          <button
            onClick={() => {
              setActiveDomain('الكل');
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-white/80 hover:bg-white text-slate-700 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            إعادة تعيين المرشحات
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence>
            {filteredIndicators.map((item, index) => {
              // Strict dynamic mathematical link between uploaded reports and indicator percentage
              const totalProgs = item.programs.length;
              const completedCount = item.programs.filter(p => !!reports[`${item.id}-${p.name}`]).length;
              const currentProgress = totalProgs > 0 ? Math.round((completedCount / totalProgs) * 100) : 0;
              const isFull = totalProgs > 0 && completedCount === totalProgs;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle glass shimmer reflection */}
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Card Header: Meta + Score */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono tabular-nums text-xs font-bold px-2.5 py-1 bg-white/70 backdrop-blur-xs text-slate-700 rounded-xl border border-white/80 shadow-xs">
                          مؤشر {item.id}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border backdrop-blur-xs ${getDomainBadge(item.domain)}`}>
                          {item.domain}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl px-3.5 py-1.5 min-w-[72px] shadow-xs group-hover:shadow-sm transition-all">
                        <span className="text-xl font-black text-slate-900 font-mono tabular-nums tracking-tight">
                          {currentProgress}%
                        </span>
                        <span className={`text-[10px] font-bold ${isFull ? 'text-emerald-700' : currentProgress > 0 ? 'text-teal-700' : 'text-slate-400'}`}>
                          {isFull ? 'تقييم معتمد' : currentProgress > 0 ? 'قيد الاستكمال' : 'بانتظار الشواهد'}
                        </span>
                      </div>
                    </div>

                    {/* Indicator Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-950 transition-colors leading-snug mb-2">
                      {item.indicator}
                    </h3>

                    {/* Standard subtitle */}
                    <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      <span>المعيار: {item.standard}</span>
                    </p>

                    {/* Progress Bar with glass glow */}
                    <div className="space-y-1.5 mb-5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-400">معدل الإنجاز في الاعتماد</span>
                        <span className="font-mono tabular-nums font-bold text-slate-700">{currentProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200/50 backdrop-blur-xs rounded-full h-2.5 overflow-hidden p-0.5 border border-white/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentProgress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${getProgressGradient(currentProgress)} shadow-xs`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Programs and Action */}
                  <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      <span>
                        {completedCount} من {totalProgs} شواهد متوفرة
                      </span>
                      {isFull && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 inline ml-1" />
                      )}
                    </div>

                    <motion.button
                      onClick={() => onSelectIndicator(item)}
                      whileHover={{ scale: 1.03, x: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 hover:from-teal-600 hover:to-emerald-600 text-teal-800 hover:text-white border border-teal-500/20 hover:border-teal-600 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
                    >
                      <span>استعراض البرامج والشواهد</span>
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};
