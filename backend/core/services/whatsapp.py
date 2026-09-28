"""
The seam between this backend and the WhatsApp/bot service
(tutordesk_twilio_whatsapp/ — a separate FastAPI service, see
docs/PRD.md).

That service today only exposes inbound webhooks (POST /twilio,
POST /webhook) — nothing for the backend to call outbound to kick off a
new parent's onboarding. Rather than invent a fake success here, this
function does the one real thing it can: POST to WHATSAPP_SERVICE_URL if
it's configured, and log clearly if it isn't, so the seam is visible and
testable instead of silently pretending onboarding was triggered.

Whoever owns the WhatsApp track needs to add a matching
`POST /onboarding/start` endpoint on that service accepting the payload
below.
"""
import logging
import os

import httpx

logger = logging.getLogger(__name__)

WHATSAPP_SERVICE_URL = os.getenv('WHATSAPP_SERVICE_URL', '').rstrip('/')


def trigger_onboarding(student):
    assignment = student.assignments.select_related('tutor').first()
    tutor_name = assignment.tutor.get_full_name() if assignment else ''

    payload = {
        'studentId': str(student.id),
        'studentName': student.name,
        'parentName': student.guardian_name,
        'parentWhatsapp': student.guardian_whatsapp,
        'reminderChannel': student.reminder_channel,
        'tutorName': tutor_name,
    }

    if not WHATSAPP_SERVICE_URL:
        logger.info(
            'WHATSAPP_SERVICE_URL not set — skipping onboarding trigger for student %s (%s)',
            student.id, student.guardian_whatsapp,
        )
        return

    try:
        response = httpx.post(f'{WHATSAPP_SERVICE_URL}/onboarding/start', json=payload, timeout=5)
        response.raise_for_status()
    except httpx.HTTPError:
        logger.exception('Failed to trigger WhatsApp onboarding for student %s', student.id)
