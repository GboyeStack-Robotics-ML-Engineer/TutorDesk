"""
SQLite storage for onboarding conversations. Deliberately small — this
service doesn't own tutor/student/class data (Django does); it only needs
to remember where each parent's onboarding conversation is up to.
"""
import json
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone

from .config import settings


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


@contextmanager
def get_conn():
    conn = sqlite3.connect(settings.DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db():
    with get_conn() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS onboarding_sessions (
                wa_id TEXT PRIMARY KEY,
                student_id TEXT NOT NULL,
                student_name TEXT,
                tutor_name TEXT,
                subjects TEXT,          -- JSON list; pre-filled by the tutor if known
                goals TEXT,
                availability TEXT,      -- JSON list
                -- The tutor's suggested default vs. what the parent actually
                -- confirmed — kept separate so "already has a value" can't
                -- be satisfied by a default nobody chose. reminder_channel
                -- starts empty on purpose; see conversation.py.
                reminder_channel_suggested TEXT DEFAULT 'whatsapp',
                reminder_channel TEXT NOT NULL DEFAULT '',
                state TEXT NOT NULL DEFAULT 'AWAITING_REPLY',
                completed INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS messages_out (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                to_wa_id TEXT NOT NULL,
                body TEXT NOT NULL,
                dry_run INTEGER NOT NULL,
                created_at TEXT NOT NULL
            )
        """)


def create_session(wa_id: str, student_id: str, student_name: str, tutor_name: str,
                    subjects=None, goals: str = '', suggested_reminder_channel: str = 'whatsapp'):
    now = _now()
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO onboarding_sessions
               (wa_id, student_id, student_name, tutor_name, subjects, goals,
                availability, reminder_channel_suggested, reminder_channel,
                state, completed, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, '', 'AWAITING_REPLY', 0, ?, ?)
               ON CONFLICT(wa_id) DO UPDATE SET
                 student_id=excluded.student_id, student_name=excluded.student_name,
                 tutor_name=excluded.tutor_name, subjects=excluded.subjects,
                 goals=excluded.goals, reminder_channel_suggested=excluded.reminder_channel_suggested,
                 reminder_channel='', state='AWAITING_REPLY', completed=0, updated_at=excluded.updated_at""",
            (wa_id, student_id, student_name, tutor_name, json.dumps(subjects or []),
             goals, json.dumps([]), suggested_reminder_channel, now, now),
        )


def get_session(wa_id: str):
    with get_conn() as conn:
        row = conn.execute("SELECT * FROM onboarding_sessions WHERE wa_id = ?", (wa_id,)).fetchone()
        return dict(row) if row else None


def update_session(wa_id: str, **fields):
    if not fields:
        return
    fields['updated_at'] = _now()
    columns = ', '.join(f'{k} = ?' for k in fields)
    with get_conn() as conn:
        conn.execute(f"UPDATE onboarding_sessions SET {columns} WHERE wa_id = ?", (*fields.values(), wa_id))


def log_message(to_wa_id: str, body: str, dry_run: bool):
    with get_conn() as conn:
        conn.execute(
            "INSERT INTO messages_out (to_wa_id, body, dry_run, created_at) VALUES (?, ?, ?, ?)",
            (to_wa_id, body, int(dry_run), _now()),
        )
