import { Indicator, DomainMeta } from '../types';

export const DOMAINS_LIST: DomainMeta[] = [
  {
    name: 'الإدارة المدرسية',
    code: 'ADMIN',
    color: 'emerald',
    bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderLight: 'border-emerald-200',
    accent: '#059669',
    description: 'القيادة المدرسية، والمجتمع المدرسي، وتوفير بيئة تعليمية واجتماعية آمنة ومحفزة'
  },
  {
    name: 'نواتج التعلم',
    code: 'OUTCOMES',
    color: 'teal',
    bgLight: 'bg-teal-50 text-teal-800 border-teal-200',
    borderLight: 'border-teal-200',
    accent: '#0d9488',
    description: 'التطور الشخصي والصحي والاجتماعي، والاعتزاز بالقيم والهوية والانضباط'
  },
  {
    name: 'التعليم والتعلم',
    code: 'LEARNING',
    color: 'cyan',
    bgLight: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    borderLight: 'border-cyan-200',
    accent: '#0891b2',
    description: 'بناء خبرات التعلم، والمهارات العاطفية والرقمية، وتنمية الدافعية للتحصيل'
  }
];

export const PRE_SAVED_REPORTS: Record<string, string> = {
  "3-1-2-1-برنامج التهيئة النفسية": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQCmecS_emBiRrbix3OLF0AqASbti5UMiFm2NqGTtKS1N6I?e=ebXvPm",
  "3-1-2-1-برنامج خفض العنف (رفق)": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQCziLanuKgeQofkSDhPq1eQAWRK6FZUBT-zZMEO5dvZUZw?e=zJO17v",
  "3-1-2-1-برنامج الإرشاد وقت الأزمات": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQDN4S8AyYgOS65qCTtN2SqKAYeGxSK0sLEPi8Ex6gcfcXI?e=F6ikfr",
  "3-1-2-1-برنامج الوقاية النفسية الأولية في البيئة المدرسية": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQC8_pLw5LZ-SberP0hzmq7jAUULjDznmltfkdvYxzRVOoA?e=FRPt2K",
  "1-2-1-4-أداة قواعد السلوك والمواظبة": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQADFkg2zRHZSZf-IjS90joKAQk5cQP5dcQaGKpJX5A-bgA?e=mWvBPV",
  "1-2-1-4-خدمة رعاية الطلبة متكرري الغياب والتأخر الصباحي": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQDDTTO4ZnyiTZBjWRYDdY0sAfATDNa4qHEycg9V36hZcMA?e=GwZXgB",
  "1-2-1-4-مجالس أولياء الأمور": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQBORfhuomcYQr6GPo8fmi8yAWu5xd7VDa9zt0_yf698cYc?e=TFRl5x",
  "1-2-1-5-برنامج تعزيز السلوك الإيجابي": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQAiMTNDu0UwTZEtFt2mv7FOAfktCQfzWpE2YjgfALw4Jd0?e=UbUemU",
  "1-2-1-6-خدمة رعاية ودعم الحالات الخاصة (فئة الموهوبين)": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQB-QctELkxZRaOStnXpeqUxAZd_iys-tMzbX8lPA73sH1o?e=p6tc5K",
  "1-2-1-6-برنامج التوجيه المهني": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQDzuWS21kJIQ6r4KKUAdQnHAYsibSYUX_5UwJ2H13Nyiag?e=VtqqWj",
  "2-1-3-1-برنامج توثيق علاقة الأسرة مع المدرسة": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQA4mem_uzn7RosnC9mLXESJAa_dgl1QIw9Qp4CRm0wMm58?e=EsSBiD",
  "2-1-3-1-برنامج التوجيه المهني": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQA-6uO5EWYqRItwmUyaB5UOAcSA0fzp6E-gcK5WOt9XD2g?e=nkwqoS",
  "2-1-3-1-الاحتفاء بالطلبة الخريجين": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQDQ4LdC5SYnS6JWbKQmYIrjASo81bdzOYyKxsdBxy_b6aI?e=N3oQeA",
  "3-2-1-5-تعزيز قيمة الانضباط المدرسي والتميز السلوكي": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQA-ojG0Nap7Ta00LuJRVKb4AbBz04BNK28or_L9Qy8D71s?e=EMGa5u",
  "3-2-1-1-تعزيز السلوك الإيجابي (قيمة الانتماء للوطن)": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQD2uLawcFDISb5iR7VwzN17AfPDr-wWguB-P31jLOusn5Y?e=Jgba6j",
  "3-2-1-1-قواعد السلوك (المحافظة على ارتداء الزي الوطني)": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQAX2bSzJf3VRJ8-t-62RE7sASSkNCo_SRMxaSLWdW6olnE?e=AOSv3Q",
  "3-2-1-2-برنامج تعزيز المهارات النفسية للطلبة": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQA49rF5AWWkQLLqU2xCq9H4AdATkNQvlx3MnL6XcC34fzI?e=cWnvdZ",
  "3-2-1-2-ملف دراسة الحالة": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQCNfXIwdRfqSbR_QBAiChWuAYAtKP_dazXEBmI680HTNqQ?e=8wVBUY",
  "3-2-1-2-جلسات الإرشاد الفردية والجماعية": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQC-Y5uS8MPbR54l5PnJB8SWAcfuwotE88DBCEuc70tfgco?e=rJvg9x",
  "3-2-1-7-تعزيز السلوك الإيجابي (قيمة التسامح)": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQBrn_XLVYxJTYnGQPlVFGI0AXVOrI4hWFmIQ6pVkGjTtrY?e=iMfZJ2",
  "2-1-1-8-برنامج تعزيز المهارات النفسية للطلبة (الوعي الذاتي، الإدارة الذاتية، اتخاذ القرار..)": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQBwsMPsoWlzRYjHf5MMKJxKAZ8NpOC2MBQh4_NwJCXnFFg?e=22QpkG",
  "2-1-1-8-المجلس الطلابي": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQCDX0HdfCYtRakallifwZqqAUBTmYYkaxn8U9hTQHrTeBk?e=mtL0aM",
  "2-1-1-9-برنامج الاستخدام الآمن للإنترنت والألعاب الإلكترونية": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQB14TEysCzKRaZPoMns6YUnASp8oTc-Kjtq7zl1UaqU0Hg?e=b7Oi4a",
  "2-1-1-9-قواعد السلوك (آداب السلوك الرقمي)": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQC36qF_42u6S4mswKBLoKrpAQ7sMTKJoNsVy3Gso8ThIlY?e=lv3O7k",
  "2-1-1-10-برنامج تنمية الدافعية لرفع مستوى التحصيل الدراسي": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQDs4pBLTri0Q6AuX1cw3zkWAXpXAdCQ6UUfBcOFNVwc824?e=SR2CPz",
  "2-1-1-10-رعاية الطلبة المتأخرين دراسياً": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQCw_juCMOdvQbL4PcZiRjHtAXC1sLQfTQDhNlfl6rL-B9I?e=lcBVil",
  "2-1-1-10-برنامج تكريم الطلبة المتفوقين": "https://estboys-my.sharepoint.com/:b:/g/personal/sa9722317_estb_moe_gov_sa/IQBE2_AcX0hPSYEZR2I28g6jAZ2fsGy2Ky2PUiTWBYbQK0M?e=ISHFpN"
};

export const INITIAL_INDICATORS_DATA: Indicator[] = [
  {
    id: '3-1-2-1',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'توفر المدرسة مناخاً آمناً للتعلم والنمو نفسياً واجتماعياً',
    progress: 100,
    programs: [
      { id: 'prog-1', name: 'برنامج التهيئة النفسية', status: 'completed' },
      { id: 'prog-2', name: 'برنامج خفض العنف (رفق)', status: 'completed' },
      { id: 'prog-3', name: 'برنامج الإرشاد وقت الأزمات', status: 'completed' },
      { id: 'prog-4', name: 'برنامج الوقاية النفسية الأولية في البيئة المدرسية', status: 'completed' }
    ]
  },
  {
    id: '1-2-1-4',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'تنشر المدرسة قواعد السلوك والمواظبة وتتابع تطبيقها',
    progress: 100,
    programs: [
      { id: 'prog-5', name: 'أداة قواعد السلوك والمواظبة', status: 'completed' },
      { id: 'prog-6', name: 'خدمة رعاية الطلبة متكرري الغياب والتأخر الصباحي', status: 'completed' },
      { id: 'prog-7', name: 'مجالس أولياء الأمور', status: 'completed' }
    ]
  },
  {
    id: '3-2-1-5',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يلتزم المتعلمون بقواعد السلوك والانضباط المدرسي',
    progress: 100,
    programs: [
      { id: 'prog-8', name: 'تعزيز قيمة الانضباط المدرسي والتميز السلوكي', status: 'completed' }
    ]
  },
  {
    id: '1-2-1-5',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'توفر المدرسة برامج وأنشطة تربوية داعمه للسلوك الإيجابي',
    progress: 100,
    programs: [
      { id: 'prog-9', name: 'برنامج تعزيز السلوك الإيجابي', status: 'completed' }
    ]
  },
  {
    id: '1-2-1-6',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'توفر المدرسة برامج وأنشطة إثرائية غير صفية لتطوير مواهب المتعلمين وتهيئتهم للمستقبل',
    progress: 100,
    programs: [
      { id: 'prog-10', name: 'خدمة رعاية ودعم الحالات الخاصة (فئة الموهوبين)', status: 'completed' },
      { id: 'prog-11', name: 'برنامج التوجيه المهني', status: 'completed' }
    ]
  },
  {
    id: '2-1-3-1',
    domain: 'الإدارة المدرسية',
    standard: 'المجتمع المدرسي',
    indicator: 'تعزز المدرسة مشاركة الأسرة في تعلم ابنائها والتحضير لمستقبلهم',
    progress: 100,
    programs: [
      { id: 'prog-12', name: 'برنامج توثيق علاقة الأسرة مع المدرسة', status: 'completed' },
      { id: 'prog-13', name: 'برنامج التوجيه المهني', status: 'completed' },
      { id: 'prog-14', name: 'الاحتفاء بالطلبة الخريجين', status: 'completed' }
    ]
  },
  {
    id: '2-1-1-8',
    domain: 'التعليم والتعلم',
    standard: 'بناء خبرات العلم',
    indicator: 'تنمي المدرسة المهارات العاطفية والاجتماعية لدى المتعلمين',
    progress: 100,
    programs: [
      { id: 'prog-15', name: 'برنامج تعزيز المهارات النفسية للطلبة (الوعي الذاتي، الإدارة الذاتية، اتخاذ القرار..)', status: 'completed' },
      { id: 'prog-16', name: 'المجلس الطلابي', status: 'completed' }
    ]
  },
  {
    id: '2-1-1-9',
    domain: 'التعليم والتعلم',
    standard: 'بناء خبرات العلم',
    indicator: 'تنمي المدرسة المهارات الرقمية لدى المتعلمين',
    progress: 100,
    programs: [
      { id: 'prog-17', name: 'برنامج الاستخدام الآمن للإنترنت والألعاب الإلكترونية', status: 'completed' },
      { id: 'prog-18', name: 'قواعد السلوك (آداب السلوك الرقمي)', status: 'completed' }
    ]
  },
  {
    id: '2-1-1-10',
    domain: 'التعليم والتعلم',
    standard: 'بناء خبرات العلم',
    indicator: 'تعزز المدرسة دافعية المتعلمين للتعلم والاستمتاع به',
    progress: 100,
    programs: [
      { id: 'prog-19', name: 'برنامج تنمية الدافعية لرفع مستوى التحصيل الدراسي', status: 'completed' },
      { id: 'prog-20', name: 'رعاية الطلبة المتأخرين دراسياً', status: 'completed' },
      { id: 'prog-21', name: 'برنامج تكريم الطلبة المتفوقين', status: 'completed' }
    ]
  },
  {
    id: '3-2-1-1',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يظهر المتعلمون الاعتزاز بالقيم والهوية الوطنية',
    progress: 100,
    programs: [
      { id: 'prog-22', name: 'تعزيز السلوك الإيجابي (قيمة الانتماء للوطن)', status: 'completed' },
      { id: 'prog-23', name: 'قواعد السلوك (المحافظة على ارتداء الزي الوطني)', status: 'completed' }
    ]
  },
  {
    id: '3-2-1-2',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يُظهر المتعلمون اتجاهات ايجابية نحو ذواتهم',
    progress: 100,
    programs: [
      { id: 'prog-24', name: 'برنامج تعزيز المهارات النفسية للطلبة', status: 'completed' },
      { id: 'prog-25', name: 'ملف دراسة الحالة', status: 'completed' },
      { id: 'prog-26', name: 'جلسات الإرشاد الفردية والجماعية', status: 'completed' }
    ]
  },
  {
    id: '3-2-1-7',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يظهر المتعلمون اعتزازاً بثقافتهم واحتراماً للتنوع الثقافي في المجتمع',
    progress: 100,
    programs: [
      { id: 'prog-27', name: 'تعزيز السلوك الإيجابي (قيمة التسامح)', status: 'completed' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'اكتمال شواهد ومؤشرات التوجيه الطلابي',
    message: 'تم استيفاء جميع تقارير وشواهد مؤشرات التوجيه الطلابي الـ 12 بنسبة إنجاز 100%.',
    timestamp: 'الآن',
    type: 'success' as const,
    read: false
  },
  {
    id: 'notif-2',
    title: 'تحديث قواعد السلوك والمواظبة',
    message: 'تم ربط مستندات مجالس أولياء الأمور ورعاية متكرري الغياب.',
    timestamp: 'اليوم، 10:30 ص',
    type: 'info' as const,
    read: false
  },
  {
    id: 'notif-3',
    title: 'جاهزية ملف الاعتماد المدرسي',
    message: 'تم التحقق من اكتمال 27 برنامجاً للتوجيه الطلابي بمدرسة الجشة المتوسطة بنجاح.',
    timestamp: 'أمس',
    type: 'success' as const,
    read: true
  }
];
