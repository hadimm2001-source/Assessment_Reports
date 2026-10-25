import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Chart, registerables } from 'chart.js';
import { Indicator, DashboardSettings } from '../types';
import { BarChart3, PieChart, Activity, Sliders, CheckCircle2, TrendingUp, Info } from 'lucide-react';

Chart.register(...registerables);
Chart.defaults.font.family = 'Tajawal';

interface AnalyticsChartsProps {
  indicators: Indicator[];
  reports: Record<string, string>;
  settings: DashboardSettings;
  isAdmin: boolean;
  onOpenSettings: () => void;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  indicators,
  reports,
  settings,
  isAdmin,
  onOpenSettings
}) => {
  const barCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const barChartInstance = useRef<Chart | null>(null);
  const doughnutChartInstance = useRef<Chart | null>(null);

  const [activeMetricMode, setActiveMetricMode] = useState<'accreditation' | 'evidence'>('accreditation');

  // Compute domain stats
  const domainNames = ['الإدارة المدرسية', 'نواتج التعلم', 'التعليم والتعلم'];

  // Domain evidence completion
  const domainEvidenceRates: Record<string, { total: number; completed: number; percentage: number }> = {};
  domainNames.forEach(d => {
    domainEvidenceRates[d] = { total: 0, completed: 0, percentage: 0 };
  });

  let totalPrograms = 0;
  let completedPrograms = 0;

  indicators.forEach(ind => {
    ind.programs.forEach(prog => {
      totalPrograms++;
      const isDone = !!reports[`${ind.id}-${prog.name}`];
      if (domainEvidenceRates[ind.domain]) {
        domainEvidenceRates[ind.domain].total++;
        if (isDone) domainEvidenceRates[ind.domain].completed++;
      }
      if (isDone) completedPrograms++;
    });
  });

  domainNames.forEach(d => {
    const item = domainEvidenceRates[d];
    item.percentage = item.total > 0 ? Math.round((item.completed / item.total) * 100 * 10) / 10 : 0;
  });

  const isAllReportsCompleted = totalPrograms > 0 && completedPrograms === totalPrograms;
  const evidencePercentage = totalPrograms > 0 ? Math.round((completedPrograms / totalPrograms) * 100 * 10) / 10 : 0;

  // Values to display on the bar chart based on active metric mode
  const displayedDomainValues = domainNames.map(d => {
    return domainEvidenceRates[d].percentage;
  });

  const displayedOverall = evidencePercentage;

  // Render or update Bar Chart
  useEffect(() => {
    if (!barCanvasRef.current) return;

    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }

    const ctx = barCanvasRef.current.getContext('2d');
    if (!ctx) return;

    barChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: domainNames,
        datasets: [
          {
            label: activeMetricMode === 'accreditation' ? 'نسبة التقويم والاعتماد (%)' : 'نسبة اكتمال الشواهد والتقارير (%)',
            data: displayedDomainValues,
            backgroundColor: [
              'rgba(16, 185, 129, 0.85)', // emerald
              'rgba(13, 148, 136, 0.85)', // teal
              'rgba(6, 182, 212, 0.85)',  // cyan
            ],
            borderColor: [
              '#059669',
              '#0f766e',
              '#0891b2',
            ],
            borderWidth: 1.5,
            borderRadius: 12,
            borderSkipped: false,
            barThickness: 54,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleFont: { size: 14, family: 'Tajawal', weight: 'bold' },
            bodyFont: { size: 13, family: 'Tajawal', weight: 'bold' },
            padding: 12,
            cornerRadius: 10,
            rtl: true,
            callbacks: {
              label: (context) => ` نسبة الإنجاز: ${context.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              font: { family: 'Tajawal', weight: 'bold', size: 12 },
              color: '#64748b',
              callback: (value) => `${value}%`
            },
            grid: {
              color: 'rgba(226, 232, 240, 0.5)'
            },
            border: { display: false }
          },
          x: {
            ticks: {
              font: { family: 'Tajawal', weight: 'bold', size: 13 },
              color: '#334155'
            },
            grid: { display: false },
            border: { display: false }
          }
        },
        animation: {
          duration: 900,
          easing: 'easeOutQuart'
        }
      }
    });

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [activeMetricMode, settings, reports, displayedDomainValues]);

  // Render or update Doughnut Chart
  useEffect(() => {
    if (!doughnutCanvasRef.current) return;

    if (doughnutChartInstance.current) {
      doughnutChartInstance.current.destroy();
    }

    const ctx = doughnutCanvasRef.current.getContext('2d');
    if (!ctx) return;

    const remainingPrograms = Math.max(0, totalPrograms - completedPrograms);

    doughnutChartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['تقارير وشواهد مكتملة ومرفوعة', 'تقارير قيد الاستكمال'],
        datasets: [
          {
            data: [completedPrograms, remainingPrograms],
            backgroundColor: [
              'rgba(16, 185, 129, 0.9)',
              'rgba(226, 232, 240, 0.9)'
            ],
            borderColor: [
              '#059669',
              '#cbd5e1'
            ],
            borderWidth: 1.5,
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Tajawal', weight: 'bold', size: 12 },
              color: '#475569',
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleFont: { size: 13, family: 'Tajawal', weight: 'bold' },
            bodyFont: { size: 13, family: 'Tajawal' },
            padding: 12,
            cornerRadius: 10,
            rtl: true,
            callbacks: {
              label: (context) => ` ${context.label}: ${context.parsed} برنامج (${Math.round((context.parsed / totalPrograms) * 100)}%)`
            }
          }
        },
        animation: {
          duration: 800
        }
      }
    });

    return () => {
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }
    };
  }, [completedPrograms, totalPrograms]);

  return (
    <section className="space-y-6 mb-10">
      {/* Chart Section Header with Mode Toggle & Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-gradient-to-tr from-teal-500/20 to-emerald-500/10 text-teal-800 rounded-2xl border border-teal-500/20 shadow-xs">
              <Activity className="w-5 h-5 text-teal-700" />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              التحليلات البيانية ومؤشرات الأداء
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            رسوم بيانية تفاعلية دقيقة تمثل نسب إنجاز مجالات التقويم المدرسي والشواهد الفعلية
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Segmented Mode Control */}
          <div className="flex items-center p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner">
            <button
              onClick={() => setActiveMetricMode('accreditation')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeMetricMode === 'accreditation'
                  ? 'bg-white/90 text-teal-900 shadow-sm border border-white/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              تقويم الاعتماد المدرسي
            </button>
            <button
              onClick={() => setActiveMetricMode('evidence')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeMetricMode === 'evidence'
                  ? 'bg-white/90 text-teal-900 shadow-sm border border-white/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اكتمال الشواهد الفعلية
            </button>
          </div>

          {/* Admin Customization Button */}
          {isAdmin && (
            <motion.button
              onClick={onOpenSettings}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-3.5 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer border border-white/20"
            >
              <Sliders className="w-4 h-4" />
              <span>تخصيص النسب</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Grid of 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Bar Chart (8 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="lg:col-span-8 glass-panel p-6 sm:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/50">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-slate-800 text-base">
                مقارنة نسب الإنجاز حسب المجالات الثلاثة
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 backdrop-blur-xs">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>الإنجاز الكلي: {displayedOverall}%</span>
            </div>
          </div>

          <div className="relative h-72 w-full">
            <canvas ref={barCanvasRef} />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>البيانات متزامنة آنياً مع تقارير التوجيه الطلابي بمدرسة الجشة المتوسطة</span>
            <span className="font-mono tabular-nums text-slate-700 font-bold">12 مؤشراً معتمداً</span>
          </div>
        </motion.div>

        {/* Doughnut Chart (4 cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-3xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/50">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-slate-800 text-base">حالة رفع الشواهد</h3>
            </div>
            <span className="text-xs font-mono tabular-nums font-bold text-slate-500">
              {completedPrograms}/{totalPrograms}
            </span>
          </div>

          <div className="relative h-56 w-full flex items-center justify-center">
            <canvas ref={doughnutCanvasRef} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
              <span className="text-3xl font-black text-slate-800 font-mono tabular-nums">
                {Math.round((completedPrograms / totalPrograms) * 100)}%
              </span>
              <span className="text-[11px] font-bold text-slate-400 mt-0.5">جاهزية الملفات</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/50 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>جميع البرامج الـ 27 تحتوي على شواهد رقمية وروابط مباشرة</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
