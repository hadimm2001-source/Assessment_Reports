import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { IndicatorsGrid } from './components/IndicatorsGrid';
import { ProgramsModal } from './components/ProgramsModal';
import { UploadLinkModal } from './components/UploadLinkModal';
import { EditPercentagesModal } from './components/EditPercentagesModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { PedagogicalAdvisorModal } from './components/PedagogicalAdvisorModal';
import { PrintReportView } from './components/PrintReportView';

import {
  INITIAL_INDICATORS_DATA,
  PRE_SAVED_REPORTS,
  INITIAL_NOTIFICATIONS,
} from './data/initialData';
import { Indicator, DashboardSettings, NotificationItem } from './types';
import { LoginModal } from './components/LoginModal';
import { EntryPortal } from './components/EntryPortal';
import { DataSyncModal } from './components/DataSyncModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function App() {
  // --- Persistent State ---
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('school_eval_is_admin') === 'true';
    } catch {
      return false;
    }
  });

  const CURRENT_REPORTS_VERSION = 'v2_sharepoint_official';

  const [reports, setReports] = useState<Record<string, string>>(() => {
    try {
      const storedVersion = localStorage.getItem('reports_version');
      const savedV2 = localStorage.getItem('reports_v2');

      // If version is already current and we have saved reports
      if (storedVersion === CURRENT_REPORTS_VERSION && savedV2) {
        const parsed = JSON.parse(savedV2);
        // Merge with PRE_SAVED_REPORTS to guarantee all updated SharePoint links are always loaded
        const merged: Record<string, string> = { ...PRE_SAVED_REPORTS };
        // Retain any user-entered custom link if it's not a legacy mock link
        Object.keys(parsed).forEach(key => {
          if (parsed[key] && !parsed[key].includes('example.com') && !parsed[key].includes('moe.gov.sa/reports')) {
            merged[key] = parsed[key];
          }
        });
        return merged;
      }

      // Legacy migration: clear outdated reports_v1 and immediately initialize with official SharePoint links
      localStorage.removeItem('reports_v1');
      localStorage.setItem('reports_version', CURRENT_REPORTS_VERSION);
      localStorage.setItem('reports_v2', JSON.stringify(PRE_SAVED_REPORTS));
      return PRE_SAVED_REPORTS;
    } catch (e) {
      console.warn('Error reading reports from localStorage', e);
      return PRE_SAVED_REPORTS;
    }
  });

  const [settings, setSettings] = useState<DashboardSettings>(() => {
    try {
      const saved = localStorage.getItem('dashboard_settings_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.overall === 96 || !parsed.overall) {
          parsed.overall = 100;
          parsed.domains = {
            'الإدارة المدرسية': 100,
            'نواتج التعلم': 100,
            'التعليم والتعلم': 100,
          };
          try {
            localStorage.setItem('dashboard_settings_v1', JSON.stringify(parsed));
          } catch {}
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Error reading dashboard settings', e);
    }
    return {
      overall: 100,
      domains: {
        'الإدارة المدرسية': 100,
        'نواتج التعلم': 100,
        'التعليم والتعلم': 100,
      },
    };
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('notifications_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return INITIAL_NOTIFICATIONS;
  });

  const [indicators] = useState<Indicator[]>(INITIAL_INDICATORS_DATA);

  // Dynamic calculation strictly linked to uploaded reports
  const totalProgramsCount = indicators.reduce((acc, ind) => acc + ind.programs.length, 0);
  const completedProgramsCount = indicators.reduce((acc, ind) => {
    return acc + ind.programs.filter(prog => !!reports[`${ind.id}-${prog.name}`]).length;
  }, 0);
  const overallPercentage = totalProgramsCount > 0 
    ? Math.round((completedProgramsCount / totalProgramsCount) * 100) 
    : 0;

  // --- Navigation & UI State ---
  const [activeNav, setActiveNav] = useState<'dashboard' | 'indicators' | 'analytics' | 'report'>('dashboard');
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isDataSyncOpen, setIsDataSyncOpen] = useState(false);
  const [hasEnteredPortal, setHasEnteredPortal] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('entered_portal') === 'true';
    } catch {
      return false;
    }
  });
  const [uploadModalContext, setUploadModalContext] = useState<{
    indicatorId: string;
    programName: string;
    link?: string;
  } | null>(null);

  const [advisorModalContext, setAdvisorModalContext] = useState<{
    programName: string;
    indicatorTitle: string;
  } | null>(null);

  // Instant Toast State
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // Save reports to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('reports_version', CURRENT_REPORTS_VERSION);
      localStorage.setItem('reports_v2', JSON.stringify(reports));
    } catch {}
  }, [reports]);

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dashboard_settings_v1', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Save notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('notifications_v1', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  // Trigger Toast Notification & Add to Notification Center
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success', addToCenter = false, title?: string) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);

    if (addToCenter) {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: title || (type === 'success' ? 'تحديث ناجح' : 'إشعار من النظام'),
        message,
        timestamp: 'الآن',
        type: type === 'error' ? 'alert' : type,
        read: false,
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  // Date formatted in Arabic
  const currentDateText = (() => {
    const today = new Date();
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    return `${days[today.getDay()]}، ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()} م`;
  })();

  // Handlers for Authentication & Entry Portal
  const handleEnterAsVisitor = () => {
    setIsAdmin(false);
    localStorage.setItem('school_eval_is_admin', 'false');
    sessionStorage.setItem('entered_portal', 'true');
    setHasEnteredPortal(true);
    showToast('أهلاً بك! تم الدخول في "وضع الزائر" للاطلاع على شواهد ومؤشرات التقويم المدرسي', 'info');
  };

  const handleEnterAsAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem('school_eval_is_admin', 'true');
    sessionStorage.setItem('entered_portal', 'true');
    setHasEnteredPortal(true);
    showToast('مرحباً بك يا أ. عبدالهادي المحسن (الموجه الطلابي)، تم تفعيل صلاحيات الإدارة الكاملة', 'success', true, 'دخول الموجه الطلابي');
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#0d9488', '#14b8a6', '#059669', '#38bdf8'],
    });
  };

  const handleLoginAsAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem('school_eval_is_admin', 'true');
    sessionStorage.setItem('entered_portal', 'true');
    setIsLoginModalOpen(false);
    showToast('مرحباً بك يا أ. عبدالهادي المحسن (الموجه الطلابي)، تم تفعيل صلاحيات الإدارة الكاملة', 'success', true, 'دخول الموجه الطلابي');
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#0d9488', '#14b8a6', '#059669', '#38bdf8'],
    });
  };

  const handleLoginAsVisitor = () => {
    setIsAdmin(false);
    localStorage.setItem('school_eval_is_admin', 'false');
    sessionStorage.setItem('entered_portal', 'true');
    setIsLoginModalOpen(false);
    showToast('أنت الآن تتصفح النظام في "وضع الزائر" للاطلاع على المؤشرات والشواهد', 'info');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.setItem('school_eval_is_admin', 'false');
    sessionStorage.removeItem('entered_portal');
    setHasEnteredPortal(false);
    showToast('تم تسجيل الخروج والعودة لبوابة الدخول', 'info');
  };

  // Handlers for Reports management
  const handleSaveReportLink = (indicatorId: string, programName: string, link: string) => {
    const key = `${indicatorId}-${programName}`;
    setReports(prev => ({
      ...prev,
      [key]: link,
    }));
    showToast(
      `تم اعتماد وإرفاق رابط الشاهد لبرنامج: ${programName}`,
      'success',
      true,
      'اعتماد شاهد تقرير جديد'
    );
  };

  const handleDeleteReport = (indicatorId: string, programName: string) => {
    const key = `${indicatorId}-${programName}`;
    setReports(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    showToast(`تم حذف رابط الشاهد لبرنامج: ${programName}`, 'info', true, 'حذف رابط الشاهد');
  };

  const handleResetToDefaultReports = () => {
    setReports(PRE_SAVED_REPORTS);
    try {
      localStorage.setItem('reports_version', CURRENT_REPORTS_VERSION);
      localStorage.setItem('reports_v2', JSON.stringify(PRE_SAVED_REPORTS));
    } catch {}
    showToast(
      'تم تحديث كافة روابط الشواهد والتقارير (27 برنامجاً) إلى روابط SharePoint الجديدة بنجاح!',
      'success',
      true,
      'تحديث ومزامنة الروابط المعتمدة'
    );
  };

  const handleSaveSettings = (newSettings: DashboardSettings) => {
    setSettings(newSettings);
    showToast('تم تحديث نسب الإنجاز ولوحة القيادة بنجاح', 'success', true, 'تحديث نسب التقويم والاعتماد');
  };

  // Notification actions
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('تم تعيين جميع التنبيهات كمقروءة', 'info');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    showToast('تم مسح سجل التنبيهات', 'info');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Print report handler
  const handlePrintReport = () => {
    if (activeNav !== 'report') {
      setActiveNav('report');
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.warn('Print error', e);
        }
      }, 250);
    } else {
      try {
        window.print();
      } catch (e) {
        console.warn('Print error', e);
      }
    }
  };

  if (!hasEnteredPortal) {
    return (
      <>
        <EntryPortal
          onEnterAsVisitor={handleEnterAsVisitor}
          onEnterAsAdmin={handleEnterAsAdmin}
        />
        {/* Floating Instant Toast for portal */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold text-white bg-slate-900/90 backdrop-blur-xl border border-white/20"
            >
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-teal-400 shrink-0" />}
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-900 relative overflow-x-hidden">
      
      {/* Dynamic Ambient Background Glow Orbs with Gentle Floating Motion */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 no-print">
        <motion.div
          animate={{
            x: [0, 45, -35, 0],
            y: [0, -40, 25, 0],
            scale: [1, 1.12, 0.94, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-28 -right-28 w-[580px] h-[580px] bg-teal-400/20 rounded-full blur-[95px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 35, -25, 0],
            scale: [1, 0.92, 1.08, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-28 -left-28 w-[650px] h-[650px] bg-emerald-400/18 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, 30, -20, 0],
            scale: [0.95, 1.08, 0.92, 0.95],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-cyan-400/15 rounded-full blur-[105px]"
        />
        <motion.div
          animate={{
            x: [0, -25, 20, 0],
            y: [0, -35, 25, 0],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-sky-400/12 rounded-full blur-[90px]"
        />
      </div>

      {/* Top Header */}
      <Header
        isAdmin={isAdmin}
        unreadCount={unreadNotificationsCount}
        currentDateText={currentDateText}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onPrint={handlePrintReport}
        onOpenDataSync={() => setIsDataSyncOpen(true)}
        onOpenPortal={() => setHasEnteredPortal(false)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        
        {/* Render Printable Report View when active */}
        {activeNav === 'report' ? (
          <motion.div
            key="report-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PrintReportView
              indicators={indicators}
              reports={reports}
              settings={settings}
              currentDateText={currentDateText}
              onBackToDashboard={() => setActiveNav('dashboard')}
            />
          </motion.div>
        ) : (
          <motion.div
            key={activeNav}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dashboard Hero Banner (for Dashboard view) */}
            {activeNav === 'dashboard' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-8 glass-panel text-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-white/80 relative overflow-hidden no-print"
              >
                {/* Subtle glass reflection highlight */}
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-4xl font-black tracking-normal leading-snug">
                      نظام التقويم المدرسي ومتابعة شواهد التوجيه الطلابي
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <span className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 shadow-xs">
                      {overallPercentage}% نسبة الاكتمال
                    </span>
                  </div>
                </div>

                {/* Subtle Geometric Background Motif */}
                <div className="absolute left-[-5%] top-[-20%] w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute right-[-10%] bottom-[-30%] w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              </motion.div>
            )}

            {/* KPI Cards (Always visible on Dashboard and Analytics) */}
            {(activeNav === 'dashboard' || activeNav === 'analytics') && (
              <DashboardStats
                indicators={indicators}
                reports={reports}
                settings={settings}
              />
            )}

            {/* Interactive Analytics Charts */}
            {(activeNav === 'dashboard' || activeNav === 'analytics') && (
              <AnalyticsCharts
                indicators={indicators}
                reports={reports}
                settings={settings}
                isAdmin={isAdmin}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
              />
            )}

            {/* Indicators Grid (Visible on Dashboard and Indicators views) */}
            {(activeNav === 'dashboard' || activeNav === 'indicators') && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                      مؤشرات وبرامج التوجيه الطلابي
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      استعراض تفصيلي لـ 12 مؤشراً و27 برنامجاً إرشادياً مع الشواهد والروابط الرسمية
                    </p>
                  </div>
                </div>

                <IndicatorsGrid
                  indicators={indicators}
                  reports={reports}
                  onSelectIndicator={ind => setSelectedIndicator(ind)}
                />
              </div>
            )}
          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/60 py-6 text-center text-xs text-slate-500 font-medium no-print mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            نظام التقويم المدرسي · التوجيه الطلابي · مدرسة الجشة المتوسطة · الأحساء
          </p>
          <p className="text-slate-400">
            إعداد وإشراف الموجه الطلابي: <span className="font-bold text-slate-700">عبدالهادي بن محمد المحسن</span> © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* --- Modals & Drawers --- */}

      {/* Indicator Programs Modal */}
      <ProgramsModal
        indicator={selectedIndicator}
        reports={reports}
        isAdmin={isAdmin}
        onClose={() => setSelectedIndicator(null)}
        onOpenUpload={(indId, progName) => {
          setUploadModalContext({
            indicatorId: indId,
            programName: progName,
            link: reports[`${indId}-${progName}`] || '',
          });
        }}
        onDeleteReport={handleDeleteReport}
        onResetToDefaults={handleResetToDefaultReports}
        onOpenAdvisor={(progName, indTitle) => {
          setAdvisorModalContext({
            programName: progName,
            indicatorTitle: indTitle,
          });
        }}
      />

      {/* Upload/Edit Link Modal */}
      {uploadModalContext && (
        <UploadLinkModal
          isOpen={true}
          indicatorId={uploadModalContext.indicatorId}
          programName={uploadModalContext.programName}
          existingLink={uploadModalContext.link}
          onClose={() => setUploadModalContext(null)}
          onSave={handleSaveReportLink}
        />
      )}

      {/* Edit Percentages Modal (Admin Only) */}
      <EditPercentagesModal
        isOpen={isSettingsModalOpen}
        settings={settings}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={handleSaveSettings}
      />

      {/* Instant Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        notifications={notifications}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onClearAll={handleClearNotifications}
      />

      {/* Pedagogical AI Advisor Modal */}
      {advisorModalContext && (
        <PedagogicalAdvisorModal
          isOpen={true}
          programName={advisorModalContext.programName}
          indicatorTitle={advisorModalContext.indicatorTitle}
          onClose={() => setAdvisorModalContext(null)}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginAsAdmin={handleLoginAsAdmin}
        onLoginAsVisitor={handleLoginAsVisitor}
      />

      {/* GitHub Sync & Backup Hub Modal */}
      <DataSyncModal
        isOpen={isDataSyncOpen}
        onClose={() => setIsDataSyncOpen(false)}
        reports={reports}
        onImportReports={(imported) => {
          setReports(imported);
          showToast('تم استيراد وحفظ كافة الشواهد والبرامج بنجاح!', 'success', true, 'مزامنة البيانات وتحديث الشواهد');
        }}
        onResetToDefaults={handleResetToDefaultReports}
      />

      {/* Floating Instant Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold text-white bg-slate-900/90 backdrop-blur-xl border border-white/20"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-teal-400 shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
