import React from 'react';
import { motion } from 'motion/react';
import { Indicator, DashboardSettings } from '../types';
import { Target, BookOpen, CheckCircle, Percent } from 'lucide-react';

interface DashboardStatsProps {
  indicators: Indicator[];
  reports: Record<string, string>;
  settings: DashboardSettings;
}

interface StatCardItem {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  accentGlow: string;
  iconBg: string;
  description: string;
  isHero?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  indicators,
  reports,
  settings,
}) => {
  const totalIndicators = indicators.length;
  let totalPrograms = 0;
  let completedPrograms = 0;

  indicators.forEach(item => {
    item.programs.forEach(prog => {
      totalPrograms++;
      if (reports[`${item.id}-${prog.name}`]) {
        completedPrograms++;
      }
    });
  });

  const isAllReportsCompleted = totalPrograms > 0 && completedPrograms === totalPrograms;
  const computedOverall = totalPrograms > 0 ? Math.round((completedPrograms / totalPrograms) * 100) : 0;

  const cards: StatCardItem[] = [
    {
      title: 'المؤشرات المستهدفة',
      value: totalIndicators,
      unit: 'مؤشر أداء',
      icon: Target,
      accentGlow: 'from-emerald-500/20 to-teal-500/0',
      iconBg: 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20',
      description: 'موزعة على مجالات التقويم الثلاثة',
    },
    {
      title: 'البرامج والخدمات الإرشادية',
      value: totalPrograms,
      unit: 'برنامج تربوي',
      icon: BookOpen,
      accentGlow: 'from-teal-500/20 to-cyan-500/0',
      iconBg: 'bg-teal-500/10 text-teal-700 border border-teal-500/20',
      description: 'تشمل الوقاية والتهيئة ورعاية الموهبة',
    },
    {
      title: 'التقارير والشواهد المكتملة',
      value: completedPrograms,
      unit: `من أصل ${totalPrograms}`,
      icon: CheckCircle,
      accentGlow: 'from-cyan-500/20 to-blue-500/0',
      iconBg: 'bg-cyan-500/10 text-cyan-700 border border-cyan-500/20',
      description: 'روابط رسمية موثقة ومعتمدة سحابياً',
    },
    {
      title: 'نسبة الإنجاز الكلية للشواهد والاعتماد',
      value: `${computedOverall}%`,
      unit: isAllReportsCompleted ? 'اكتمال تام' : `${completedPrograms} من ${totalPrograms}`,
      icon: Percent,
      accentGlow: 'from-emerald-500/25 to-teal-600/10',
      iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20 border border-white/30',
      description: isAllReportsCompleted
        ? 'تم رفع واعتماد 27 من أصل 27 تقريراً وشاهداً بنسبة 100%'
        : `تم توثيق وإرفاق ${completedPrograms} من أصل ${totalPrograms} تقريراً وشاهداً`,
      isHero: true,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8"
    >
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`glass-card rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between group cursor-default ${
              card.isHero ? 'ring-1 ring-emerald-500/30' : ''
            }`}
          >
            {/* Top glass reflection accent */}
            <div
              className={`absolute top-0 right-0 left-0 h-24 bg-gradient-to-b ${card.accentGlow} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-2xl ${card.iconBg} backdrop-blur-xs transition-transform group-hover:scale-110 duration-200`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 my-4">
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl sm:text-4xl font-black font-mono tabular-nums tracking-tight ${
                  card.isHero ? 'text-teal-950 bg-clip-text' : 'text-slate-800'
                }`}>
                  {card.value}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {card.unit}
                </span>
              </div>
            </div>

            <div className="relative z-10 text-xs text-slate-500 font-medium border-t border-slate-200/50 pt-3">
              {card.description}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
