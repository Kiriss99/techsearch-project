import json
import os
import smtplib
import urllib.parse
import urllib.request
from email.mime.text import MIMEText

import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}


def send_telegram(text: str):
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


def send_email(subject: str, text: str):
    host = os.environ.get('SMTP_HOST')
    port = os.environ.get('SMTP_PORT')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    to_addr = 'shevchenko18k@gmail.com'
    if not host or not port or not user or not password:
        return False, 'missing smtp settings'
    try:
        msg = MIMEText(text, 'plain', 'utf-8')
        msg['Subject'] = subject
        msg['From'] = user
        msg['To'] = to_addr
        with smtplib.SMTP_SSL(host, int(port), timeout=5) as server:
            server.login(user, password)
            server.sendmail(user, [to_addr], msg.as_string())
        return True, None
    except Exception as exc:
        return False, repr(exc)


def esc(value: str) -> str:
    return (
        str(value)
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
    )


def save_lead(
    name: str,
    contact: str,
    task: str,
    budget: str,
    source: str,
    quiz: dict,
    delivered: bool,
    email_delivered: bool,
    callback_time: str,
) -> None:
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
            callback_e = callback_time.replace("'", "''") if callback_time else None
            quiz_e = quiz_json.replace("'", "''") if quiz_json else None
            quiz_sql = f"'{quiz_e}'" if quiz_e else 'NULL'
            callback_sql = f"'{callback_e}'" if callback_e else 'NULL'
            cur.execute(
                f"""INSERT INTO leads
                (name, contact, task, budget, source, quiz, telegram_delivered, email_delivered, callback_time)
                VALUES ('{name_e}', '{contact_e}', '{task_e}', '{budget_e}', '{source_e}',
                {quiz_sql}, {delivered}, {email_delivered}, {callback_sql})"""
            )
        conn.commit()
    finally:
        conn.close()


def handler(event: dict, context) -> dict:
    """Принимает заявку или заказ обратного звонка с сайта TechSearch, сохраняет в базу и отправляет владельцу в Telegram и на почту."""
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
    callback_time = str(body.get('callback_time', '')).strip()
    quiz = body.get('quiz') or {}
    if not isinstance(quiz, dict):
        quiz = {}

    is_callback = source == 'Обратный звонок'
    min_task_len = 3 if is_callback else 5

    if len(name) < 2 or len(contact) < 4 or len(task) < min_task_len:
        return {
            'statusCode': 400,
            'headers': CORS,
            'body': json.dumps({'success': False, 'error': 'Заполните имя, контакт и задачу'}, ensure_ascii=False),
        }

    subject = 'Заказ обратного звонка — TechSearch' if is_callback else 'Новая заявка — TechSearch'

    lines = [
        f'<b>{esc(subject)}</b>',
        '',
        f'<b>Имя:</b> {esc(name)}',
        f'<b>Контакт:</b> {esc(contact)}',
    ]
    if callback_time:
        lines.append(f'<b>Удобное время:</b> {esc(callback_time)}')
    if budget:
        lines.append(f'<b>Бюджет:</b> {esc(budget)}')
    lines.append(f'<b>{"Комментарий" if is_callback else "Задача"}:</b> {esc(task)}')

    if quiz:
        lines.append('')
        lines.append('<b>Ответы калькулятора:</b>')
        for key, value in quiz.items():
            if value:
                lines.append(f'• {esc(key)}: {esc(value)}')

    lines.append('')
    lines.append(f'<i>Источник: {esc(source)}</i>')

    text_plain_lines = [
        subject,
        '',
        f'Имя: {name}',
        f'Контакт: {contact}',
    ]
    if callback_time:
        text_plain_lines.append(f'Удобное время: {callback_time}')
    if budget:
        text_plain_lines.append(f'Бюджет: {budget}')
    text_plain_lines.append(f'{"Комментарий" if is_callback else "Задача"}: {task}')
    if quiz:
        text_plain_lines.append('')
        text_plain_lines.append('Ответы калькулятора:')
        for key, value in quiz.items():
            if value:
                text_plain_lines.append(f'- {key}: {value}')
    text_plain_lines.append('')
    text_plain_lines.append(f'Источник: {source}')

    delivered = False
    tg_error = None
    try:
        delivered, tg_error = send_telegram('\n'.join(lines))
    except Exception as exc:
        delivered = False
        tg_error = repr(exc)

    email_delivered = False
    email_error = None
    try:
        email_delivered, email_error = send_email(subject, '\n'.join(text_plain_lines))
    except Exception as exc:
        email_delivered = False
        email_error = repr(exc)

    db_error = None
    try:
        save_lead(name, contact, task, budget, source, quiz, delivered, email_delivered, callback_time)
    except Exception as exc:
        db_error = repr(exc)

    result = {'success': True, 'delivered': delivered, 'email_delivered': email_delivered}
    if tg_error:
        result['tg_error'] = tg_error
    if email_error:
        result['email_error'] = email_error
    if db_error:
        result['db_error'] = db_error

    return {
        'statusCode': 200,
        'headers': CORS,
        'body': json.dumps(result, ensure_ascii=False),
    }
