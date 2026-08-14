import json
import os
import urllib.parse
import urllib.request

import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}


def send_telegram(text: str) -> bool:
    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if not token or not chat_id:
        return False, 'missing token or chat_id'
    payload = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
        'disable_web_page_preview': 'true',
    }).encode()
    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=payload,
        headers={'Content-Type': 'application/x-www-form-urlencoded'},
    )
    try:
        with urllib.request.urlopen(req, timeout=2) as resp:
            return resp.status == 200, None
    except Exception as exc:
        return False, repr(exc)


def esc(value: str) -> str:
    return (
        str(value)
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
    )


def save_lead(name: str, contact: str, task: str, budget: str, source: str, quiz: dict, delivered: bool) -> None:
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return
    conn = psycopg2.connect(dsn, connect_timeout=3)
    try:
        with conn.cursor() as cur:
            quiz_json = json.dumps(quiz, ensure_ascii=False) if quiz else None
            name_e = name.replace("'", "''")
            contact_e = contact.replace("'", "''")
            task_e = task.replace("'", "''")
            budget_e = budget.replace("'", "''")
            source_e = source.replace("'", "''")
            quiz_e = quiz_json.replace("'", "''") if quiz_json else None
            quiz_sql = f"'{quiz_e}'" if quiz_e else 'NULL'
            cur.execute(
                f"""INSERT INTO leads (name, contact, task, budget, source, quiz, telegram_delivered)
                VALUES ('{name_e}', '{contact_e}', '{task_e}', '{budget_e}', '{source_e}', {quiz_sql}, {delivered})"""
            )
        conn.commit()
    finally:
        conn.close()


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта TechSearch, сохраняет её в базу и отправляет владельцу в Telegram."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**CORS, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    if method != 'POST':
        return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')

    name = str(body.get('name', '')).strip()
    contact = str(body.get('contact', '')).strip()
    task = str(body.get('task', '')).strip()
    budget = str(body.get('budget', '')).strip()
    source = str(body.get('source', 'Форма на сайте')).strip()
    quiz = body.get('quiz') or {}
    if not isinstance(quiz, dict):
        quiz = {}

    if len(name) < 2 or len(contact) < 4 or len(task) < 5:
        return {
            'statusCode': 400,
            'headers': CORS,
            'body': json.dumps({'success': False, 'error': 'Заполните имя, контакт и задачу'}, ensure_ascii=False),
        }

    lines = [
        '<b>Новая заявка — TechSearch</b>',
        '',
        f'<b>Имя:</b> {esc(name)}',
        f'<b>Контакт:</b> {esc(contact)}',
    ]
    if budget:
        lines.append(f'<b>Бюджет:</b> {esc(budget)}')
    lines.append(f'<b>Задача:</b> {esc(task)}')

    if quiz:
        lines.append('')
        lines.append('<b>Ответы калькулятора:</b>')
        for key, value in quiz.items():
            if value:
                lines.append(f'• {esc(key)}: {esc(value)}')

    lines.append('')
    lines.append(f'<i>Источник: {esc(source)}</i>')

    delivered = False
    tg_error = None
    try:
        delivered, tg_error = send_telegram('\n'.join(lines))
    except Exception as exc:
        delivered = False
        tg_error = repr(exc)

    db_error = None
    try:
        save_lead(name, contact, task, budget, source, quiz, delivered)
    except Exception as exc:
        db_error = repr(exc)

    result = {'success': True, 'delivered': delivered}
    if tg_error:
        result['tg_error'] = tg_error
    if db_error:
        result['db_error'] = db_error

    return {
        'statusCode': 200,
        'headers': CORS,
        'body': json.dumps(result, ensure_ascii=False),
    }