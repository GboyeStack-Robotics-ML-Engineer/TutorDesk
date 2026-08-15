import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Small in-browser mockups standing in for each capability.
 *
 * Kept as plain JSX rather than screenshots so they stay crisp at any size
 * and inherit the design tokens.
 */
const InvoiceMock = () => (
  <div className="space-y-3">
    {[
      { ref: 'INV-102', name: 'Adeola Okafor', amount: '15,000', state: 'Recorded', tone: 'success' },
      { ref: 'INV-103', name: 'Chidi Nwosu', amount: '22,500', state: 'Recorded', tone: 'success' },
      { ref: 'INV-104', name: 'Amina Bello', amount: '18,000', state: 'Reminder sent', tone: 'warning' },
    ].map((row) => (
      <div key={row.ref} className="flex items-center justify-between bg-white border border-paper-200 rounded-xl p-4">
        <div>
          <div className="text-xs text-ink-500 font-medium mb-1">{row.ref}</div>
          <div className="text-sm font-bold text-ink-900">{row.name}</div>
        </div>
        <div className="text-right">
          <div className="text-base font-bold text-[#095D51] mb-1">&#8358;{row.amount}</div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              row.tone === 'success' ? 'bg-success-tint text-success-solid' : 'bg-warning-tint text-warning-solid'
            }`}
          >
            {row.state}
          </span>
        </div>
      </div>
    ))}
  </div>
);

const StudentMock = () => (
  <div className="space-y-3">
    {[
      { initials: 'AO', name: 'Adeola Okafor', subject: 'Physics · SS3', mastery: 78 },
      { initials: 'CN', name: 'Chidi Nwosu', subject: 'Maths · SS2', mastery: 92 },
      { initials: 'AB', name: 'Amina Bello', subject: 'Chemistry · SS3', mastery: 41, flagged: true },
    ].map((student) => (
      <div key={student.initials} className="flex items-center gap-3 bg-white border border-paper-200 rounded-xl p-4">
        <div className="w-10 h-10 rounded-full bg-[#095D51] text-white flex items-center justify-center font-bold text-xs shrink-0">
          {student.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-ink-900 truncate">{student.name}</span>
            {student.flagged && (
              <span className="text-[10px] bg-danger-tint text-danger-solid px-2 py-0.5 rounded-full font-bold shrink-0">
                Needs review
              </span>
            )}
          </div>
          <div className="text-[11px] text-ink-500 mb-2">{student.subject}</div>
          <div className="w-full bg-paper-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${student.flagged ? 'bg-danger-solid' : 'bg-[#095D51]'}`}
              style={{ width: `${student.mastery}%` }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ScheduleMock = () => (
  <div className="space-y-3">
    {[
      { time: '09:00', title: 'Physics · Adeola', room: 'Live classroom', active: true },
      { time: '11:30', title: 'Maths · Chidi', room: 'Zoom', active: false },
      { time: '16:00', title: 'Chemistry · Amina', room: 'Live classroom', active: false },
    ].map((slot) => (
      <div
        key={slot.time}
        className={`flex items-center gap-4 rounded-xl p-4 border ${
          slot.active ? 'bg-[#095D51] border-[#095D51] text-white' : 'bg-white border-paper-200'
        }`}
      >
        <div className={`text-sm font-bold shrink-0 ${slot.active ? 'text-white' : 'text-[#095D51]'}`}>{slot.time}</div>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-bold truncate ${slot.active ? 'text-white' : 'text-ink-900'}`}>{slot.title}</div>
          <div className={`text-[11px] ${slot.active ? 'text-white/70' : 'text-ink-500'}`}>{slot.room}</div>
        </div>
        {slot.active && (
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full font-bold shrink-0">Starting now</span>
        )}
      </div>
    ))}
  </div>
);

const AiMock = () => (
  <div className="space-y-3">
    <div className="bg-white border border-paper-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-[18px] text-[#C48037]">auto_awesome</span>
        <span className="text-xs font-bold text-ink-900">Lesson plan · Quadratic equations</span>
      </div>
      <div className="space-y-2">
        {['Warm-up: factorising revision (5 min)', 'Concept: completing the square (15 min)', 'Guided practice: 4 worked examples'].map(
          (line) => (
            <div key={line} className="flex items-start gap-2 text-xs text-ink-600">
              <span className="material-symbols-outlined text-[14px] text-[#095D51] shrink-0">check_circle</span>
              {line}
            </div>
          )
        )}
      </div>
    </div>
    <div className="bg-white border border-paper-200 rounded-xl p-4">
      <div className="text-xs font-bold text-ink-900 mb-2">Auto-generated quiz</div>
      <div className="space-y-2">
        {['Solve x² − 5x + 6 = 0', 'Find the discriminant of 2x² + 3x − 1'].map((q) => (
          <div key={q} className="text-xs text-ink-600 bg-[#FAF9F5] rounded-lg p-2.5">{q}</div>
        ))}
      </div>
    </div>
  </div>
);

const capabilities = [
  {
    id: 'payments',
    eyebrow: 'Payments',
    title: 'Get paid, stop chasing',
    body: 'Bank transfers reconcile themselves against open invoices, and reminders go out on WhatsApp before you have to think about it. You teach; the ledger keeps itself.',
    points: ['Automatic transfer matching', 'WhatsApp payment reminders', 'Receipts issued on confirmation'],
    visual: <InvoiceMock />,
  },
  {
    id: 'students',
    eyebrow: 'Students',
    title: 'The student is the atom',
    body: 'Every session, score and note lands on one record. Mastery is tracked lesson by lesson, and learners who start slipping are flagged before the term report does it for you.',
    points: ['Attendance and progress history', 'Early-warning flags', 'Shareable parent portal'],
    visual: <StudentMock />,
  },
  {
    id: 'classes',
    eyebrow: 'Classes',
    title: 'Classes that run themselves',
    body: 'Scheduling, reschedules and the live classroom sit in one place. Parents get the reminder, you get the room, and post-class wrap-ups write most of themselves.',
    points: ['One timetable across all students', 'Automated class reminders', 'Post-class wrap-up in a tap'],
    visual: <ScheduleMock />,
  },
  {
    id: 'ai',
    eyebrow: 'AI lesson prep',
    title: 'Prep in minutes, not evenings',
    body: 'Generate lesson plans, worksheets and quizzes from your own templates and materials — tuned to the syllabus you actually teach.',
    points: ['Prompt library built for tutors', 'Quiz and worksheet generation', 'Reusable lesson templates'],
    visual: <AiMock />,
    gated: true,
  },
];

/**
 * Scroll-revealed capability rows, alternating side to side.
 *
 * The final row is softly gated: the visual fades out behind a signup card.
 * The overlay is deliberately pointer-events-none (except the button itself)
 * and nothing here touches scroll position — readers can always keep going.
 */
export const WhatWeOffer = () => (
  <section id="offer" className="bg-[#FAF9F5] py-20 md:py-28 border-t border-paper-200/60 overflow-hidden">
    <div className="max-w-3xl mx-auto px-6 text-center mb-16 md:mb-24">
      <motion.h2
        className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#095D51] mb-4 tracking-tight leading-[1.12]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Everything the scatter was hiding
      </motion.h2>
      <motion.p
        className="text-ink-600 text-base md:text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Four things TutorDesk does the moment your tools stop living in separate apps.
      </motion.p>
    </div>

    <div className="max-w-6xl mx-auto px-6 space-y-24 md:space-y-32">
      {capabilities.map((capability, index) => {
        const flipped = index % 2 === 1;

        return (
          <div
            key={capability.id}
            className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            {/* Visual */}
            <motion.div
              className={`relative ${flipped ? 'md:order-2' : ''}`}
              initial={{ opacity: 0, x: flipped ? 48 : -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-[#F0EFEA] rounded-3xl p-5 md:p-7 border border-paper-200">
                <div className={capability.gated ? 'max-h-[260px] overflow-hidden' : ''}>
                  {capability.visual}
                </div>
              </div>

              {capability.gated && (
                <>
                  {/* Fade the locked preview into the page */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 rounded-b-3xl bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/85 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2 pointer-events-none">
                    <motion.div
                      className="bg-white rounded-2xl shadow-elevated border border-paper-200 p-5 text-center max-w-[300px] pointer-events-auto"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="w-10 h-10 rounded-full bg-[#095D51]/10 text-[#095D51] flex items-center justify-center mx-auto mb-3">
                        <span className="material-symbols-outlined text-[20px]">lock_open</span>
                      </span>
                      <p className="text-sm font-bold text-ink-900 mb-1">There&rsquo;s more in here</p>
                      <p className="text-xs text-ink-600 mb-4 leading-relaxed">
                        Create a free account to explore the full AI prep suite.
                      </p>
                      <Link
                        to="/signup"
                        className="group bg-[#C48037] hover:bg-[#B3702B] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors shadow-sm inline-flex items-center gap-1.5"
                      >
                        Sign up free
                        <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Copy */}
            <motion.div
              className={flipped ? 'md:order-1' : ''}
              initial={{ opacity: 0, x: flipped ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#C48037] mb-4">
                {capability.eyebrow}
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold text-[#095D51] mb-4 tracking-tight leading-snug"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {capability.title}
              </h3>
              <p className="text-ink-600 leading-relaxed mb-6">{capability.body}</p>
              <ul className="space-y-3">
                {capability.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-ink-700">
                    <span className="material-symbols-outlined text-[#095D51] text-[18px] shrink-0">check_circle</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        );
      })}
    </div>
  </section>
);
