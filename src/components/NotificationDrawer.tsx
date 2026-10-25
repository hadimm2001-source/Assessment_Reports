import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, CheckCheck, Trash2, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSendQuickReminder?: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  notifications,
  onClose,
  onMarkAllAsRead,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-teal-600" />;
    }
  };

  const getNotificationBg = (type: NotificationItem['type'], read: boolean) => {
    if (!read) {
      return 'bg-teal-500/10 border-teal-500/30 shadow-xs';
    }
    return 'bg-white/60 border-white/80';
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[90] flex justify-end"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="glass-panel w-full max-w-md h-full shadow-[0_24px_64px_rgba(15,23,42,0.25)] flex flex-col justify-between border-r border-white/70"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/60 flex items-center justify-between bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-gradient-to-tr from-teal-500/20 to-emerald-500/10 text-teal-800 rounded-2xl border border-teal-500/20 shadow-xs">
              <Bell className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-800 text-base">مركز التنبيهات الفورية</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-mono text-[11px] font-bold rounded-full shadow-xs">
                    {unreadCount} جديد
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                متابعة فورية لكافة تحديثات الشواهد وإجراءات التقويم
              </p>
            </div>
          </div>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white/80 rounded-full transition-colors cursor-pointer"
            aria-label="إغلاق التنبيهات"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2.5 bg-white/40 border-b border-white/60 flex items-center justify-between text-xs font-semibold text-slate-600">
          <button
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0}
            className="hover:text-teal-800 disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>تعيين الكل كمقروء</span>
          </button>

          <button
            onClick={onClearAll}
            disabled={notifications.length === 0}
            className="hover:text-red-600 disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>مسح التنبيهات</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center mb-3 shadow-inner">
                <Bell className="w-6 h-6 text-slate-300" />
              </div>
              <p className="font-bold text-slate-600 text-sm mb-1">لا توجد تنبيهات حالياً</p>
              <p className="text-xs text-slate-400">
                ستظهر التنبيهات الفورية تلقائياً عند حفظ الشواهد أو تحديث نسب التقويم
              </p>
            </div>
          ) : (
            notifications.map(notif => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-2xl border backdrop-blur-xs transition-all ${getNotificationBg(
                  notif.type,
                  notif.read
                )}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-xl shadow-xs border border-white/80 shrink-0 mt-0.5">
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/60 bg-white/40 text-center">
          <p className="text-xs text-slate-500 font-medium">
            نظام التنبيهات الفوري · مدرسة الجشة المتوسطة
          </p>
        </div>
      </motion.div>
    </div>
  );
};
