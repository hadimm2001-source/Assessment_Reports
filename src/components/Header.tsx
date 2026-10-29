import React from 'react';
import { motion } from 'motion/react';
import { Bell, Printer, LogOut, GitBranch, ArrowLeftRight } from 'lucide-react';
// استيراد مسار الصورة مباشرة عبر Vite
import logoUrl from '/moe_logo.png';

interface HeaderProps {
  isAdmin: boolean;
  unreadCount: number;
  currentDateText: string;
  activeNav: 'dashboard' | 'indicators' | 'analytics' | 'report';
  onNavChange: (nav: 'dashboard' | 'indicators' | 'analytics' | 'report') => void;
  onOpenNotifications: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  onPrint: () => void;
  onOpenDataSync: () => void;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  unreadCount,
  currentDateText,
  activeNav,
  onNavChange,
  onOpenNotifications,
  onOpenLogin,
  onLogout,
  onPrint,
  onOpenDataSync,
  onOpenPortal,
}) => {
  const navItems = [
    { id: 'dashboard' as const, label: 'لوحة التحكم' },
    { id: 'analytics' as const, label: 'الرسوم البيانية' },
    { id: 'indicators' as const, label: 'المؤشرات والشواهد (12)' },
    { id: 'report' as const, label: 'تقرير الاعتماد' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_24px_rgba(15,23,42,0.04)] no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Zone */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="h-11 px-2.5 bg-white rounded-2xl flex items-center justify-center shadow-xs border border-slate-200/80 shrink-0">
              {/* استخدام المتغير المستورد للصورة */}
              <img
                src={logoUrl}
                alt="وزارة التعليم"
                className="h-8 w-auto object-contain"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900 tracking-tight whitespace-nowrap">
                  نظام التقويم المدرسي
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                  التوجيه الطلابي
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">
                مدرسة الجشة المتوسطة · الأحساء
              </p>
            </div>
          </motion.div>

          {/* Zone 2: Navigation Links (Glass Segmented) */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner text-xs font-bold text-slate-600">
            {navItems.map(item => {
              const isActive = activeNav === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavChange(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-teal-950 font-black shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Role */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 shrink-0"
          >
            {/* Date Pill (Desktop) */}
            <span className="hidden xl:inline-block text-xs font-medium text-slate-500 pl-2">
              {currentDateText}
            </span>

            {/* Quick Print Button */}
            <motion.button
              onClick={onPrint}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                activeNav === 'report'
                  ? 'px-3.5 py-1.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white shadow-md shadow-teal-700/20 rounded-xl border border-white/20'
                  : 'px-3 py-1.5 text-slate-700 hover:text-teal-900 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-xl border border-white/70 shadow-xs'
              }`}
              title="طباعة تقرير التقويم المدرسي"
              aria-label="طباعة التقرير"
            >
              <Printer className="w-4 h-4 text-current" />
              <span>طباعة التقرير</span>
            </motion.button>

            {/* GitHub Sync & Backup Hub Button - Only for Student Counselor (admin) */}
            {isAdmin && (
              <motion.button
                onClick={onOpenDataSync}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-slate-700 hover:text-teal-900 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-xl border border-white/70 shadow-xs transition-all text-xs font-bold cursor-pointer"
                title="مركز مزامنة البيانات وتحديث مستودع GitHub"
                aria-label="مزامنة GitHub والنسخ الاحتياطي"
              >
                <GitBranch className="w-4 h-4 text-teal-600" />
                <span className="hidden lg:inline">مزامنة GitHub</span>
              </motion.button>
            )}

            {/* Notification Bell */}
            <motion.button
              onClick={onOpenNotifications}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-xl border border-white/70 shadow-xs transition-colors cursor-pointer"
              title="مركز التنبيهات الفورية"
              aria-label="مركز التنبيهات"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 bg-teal-500 rounded-full ring-2 ring-white animate-pulse"></span>
              )}
            </motion.button>

            {/* Portal Switcher Button */}
            <motion.button
              onClick={onOpenPortal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all text-xs font-bold cursor-pointer"
              title="العودة لبوابة الدخول الرئيسية (اختيار زائر / موجه طلابي)"
              aria-label="بوابة الدخول"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">بوابة الدخول</span>
            </motion.button>

            {/* User Role Badge / Switch - Only for Counselor View */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 backdrop-blur-md border border-teal-500/20 rounded-xl shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-teal-900 leading-tight">
                      عبدالهادي المحسن
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium leading-none">
                      الموجه الطلابي (مسؤول)
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={onLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-colors cursor-pointer"
                  title="تسجيل الخروج والعودة لبوابة الدخول"
                  aria-label="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between gap-1 py-2 border-t
