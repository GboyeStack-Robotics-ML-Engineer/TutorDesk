import React from 'react';

export const NotificationsCenterDesktop = () => {
  return (
    <>
      
<div className="max-w-max-width mx-auto px-gutter-mobile md:px-gutter-desktop py-space-6 md:py-space-8">

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-4 mb-space-6">
<div>
<h1 className="font-display-md text-display-md text-ink-900 mb-1">Notifications</h1>
<p className="font-body text-body text-ink-500">You have 3 unread messages.</p>
</div>
<button className="font-label text-label text-primary font-medium hover:text-primary-container transition-colors flex items-center gap-1 border border-paper-300 rounded-full px-4 py-2 hover:bg-surface-container-low active:scale-[0.98]">
<span className="material-symbols-outlined text-sm" data-icon="done_all">done_all</span>
                    Mark all read
                </button>
</div>

<div className="flex overflow-x-auto gap-space-2 pb-2 mb-space-6 no-scrollbar -mx-gutter-mobile px-gutter-mobile md:mx-0 md:px-0">
<button className="font-label text-label px-4 py-1.5 rounded-full border border-primary bg-primary text-paper-0 whitespace-nowrap transition-colors active:scale-[0.98]">All</button>
<button className="font-label text-label px-4 py-1.5 rounded-full border border-paper-300 bg-paper-0 text-ink-700 hover:bg-surface-container-low whitespace-nowrap transition-colors active:scale-[0.98]">Unread</button>
<button className="font-label text-label px-4 py-1.5 rounded-full border border-paper-300 bg-paper-0 text-ink-700 hover:bg-surface-container-low whitespace-nowrap transition-colors active:scale-[0.98]">Payments</button>
<button className="font-label text-label px-4 py-1.5 rounded-full border border-paper-300 bg-paper-0 text-ink-700 hover:bg-surface-container-low whitespace-nowrap transition-colors active:scale-[0.98]">Classes</button>
<button className="font-label text-label px-4 py-1.5 rounded-full border border-paper-300 bg-paper-0 text-ink-700 hover:bg-surface-container-low whitespace-nowrap transition-colors active:scale-[0.98]">Messages</button>
</div>

<div className="space-y-space-6">

<section>
<h2 className="font-label text-label text-ink-500 uppercase tracking-wider mb-space-3 sticky top-16 bg-background/95 backdrop-blur-sm py-2 z-10 border-b border-paper-200">Today</h2>
<div className="space-y-space-2">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 hover:border-paper-300 hover:bg-surface-container-lowest transition-colors flex gap-space-4 group cursor-pointer relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-warning-solid"></div>
<div className="flex-shrink-0 relative">
<div className="w-10 h-10 rounded-full bg-success-tint flex items-center justify-center text-success-solid">
<span className="material-symbols-outlined" data-icon="credit_card">credit_card</span>
</div>
<div className="absolute -top-1 -right-1 w-3 h-3 bg-warning-solid rounded-full border-2 border-paper-0"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-sm text-title-sm text-ink-900 font-semibold truncate pr-4">Payment Received</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap flex-shrink-0">2h ago</span>
</div>
<p className="font-body text-body text-ink-700 mb-2">Oluwaseun Adebayo paid <span className="font-data-display text-data-display bg-surface-container px-1 py-0.5 rounded text-sm">Invoice #1024</span>.</p>
<div className="flex gap-space-2 mt-space-3">
<button className="font-label text-label bg-paper-0 border border-primary text-primary px-4 py-1.5 rounded hover:bg-surface-tint/5 transition-colors">View Invoice</button>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 hover:border-paper-300 hover:bg-surface-container-lowest transition-colors flex gap-space-4 group cursor-pointer relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-warning-solid"></div>
<div className="flex-shrink-0 relative">
<div className="w-10 h-10 rounded-full bg-warning-tint flex items-center justify-center text-warning-solid">
<span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
</div>
<div className="absolute -top-1 -right-1 w-3 h-3 bg-warning-solid rounded-full border-2 border-paper-0"></div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-sm text-title-sm text-ink-900 font-semibold truncate pr-4">Class Reminder</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap flex-shrink-0">4h ago</span>
</div>
<p className="font-body text-body text-ink-700">Upcoming Mathematics session with Chidi starts in 30 minutes.</p>
<div className="flex gap-space-2 mt-space-3">
<button className="font-label text-label bg-secondary-fixed border border-secondary-fixed text-on-secondary-fixed px-4 py-1.5 rounded hover:bg-secondary-fixed-dim transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-sm" data-icon="play_arrow">play_arrow</span>
                                        Join Room
                                    </button>
</div>
</div>
</div>
</div>
</section>

<section>
<h2 className="font-label text-label text-ink-500 uppercase tracking-wider mb-space-3 sticky top-16 bg-background/95 backdrop-blur-sm py-2 z-10 border-b border-paper-200 mt-space-6">Yesterday</h2>
<div className="space-y-space-2">

<div className="bg-paper-50 border border-paper-200 rounded-lg p-space-4 hover:border-paper-300 hover:bg-surface-container-lowest transition-colors flex gap-space-4 group cursor-pointer">
<div className="flex-shrink-0">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-ink-700">
<span className="material-symbols-outlined" data-icon="chat_bubble_outline">chat_bubble_outline</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-sm text-title-sm text-ink-900 truncate pr-4">New Message</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap flex-shrink-0">Yesterday, 4:30 PM</span>
</div>
<p className="font-body text-body text-ink-500 truncate">Mrs. Okafor: "Could we reschedule tomorrow's session to 5 PM?"</p>
</div>
</div>

<div className="bg-paper-50 border border-paper-200 rounded-lg p-space-4 hover:border-paper-300 hover:bg-surface-container-lowest transition-colors flex gap-space-4 group cursor-pointer">
<div className="flex-shrink-0">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-ink-700">
<span className="material-symbols-outlined" data-icon="update">update</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-sm text-title-sm text-ink-900 truncate pr-4">System Update</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap flex-shrink-0">Yesterday, 9:00 AM</span>
</div>
<p className="font-body text-body text-ink-500">TutorDesk was updated to version 2.4. Click to see what's new.</p>
</div>
</div>
</div>
</section>

<section>
<h2 className="font-label text-label text-ink-500 uppercase tracking-wider mb-space-3 sticky top-16 bg-background/95 backdrop-blur-sm py-2 z-10 border-b border-paper-200 mt-space-6">Earlier</h2>
<div className="space-y-space-2">

<div className="bg-danger-tint/20 border border-danger-tint rounded-lg p-space-4 hover:border-danger-tint/50 transition-colors flex gap-space-4 group cursor-pointer">
<div className="flex-shrink-0">
<div className="w-10 h-10 rounded-full bg-danger-tint flex items-center justify-center text-danger-solid">
<span className="material-symbols-outlined" data-icon="error_outline">error_outline</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-sm text-title-sm text-danger-solid truncate pr-4">Bank Transfer Failed</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap flex-shrink-0">Oct 12</span>
</div>
<p className="font-body text-body text-ink-700">We couldn't verify the manual bank transfer for <span className="font-data-display text-data-display bg-surface-container px-1 py-0.5 rounded text-sm">Invoice #1020</span>. Please upload a clearer receipt.</p>
<div className="flex gap-space-2 mt-space-3">
<button className="font-label text-label bg-danger-solid text-paper-0 px-4 py-1.5 rounded hover:bg-danger-solid/90 transition-colors">Upload Receipt</button>
</div>
</div>
</div>
</div>
</section>
<div className="text-center pt-space-4 pb-space-8">
<button className="font-label text-label text-ink-500 hover:text-primary transition-colors border border-transparent hover:border-paper-300 rounded-full px-6 py-2">Load more notifications</button>
</div>
</div>
</div>

    </>
  );
};
