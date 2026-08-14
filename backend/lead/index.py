import json
import os
import urllib.parse
import urllib.request

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
        return False
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
    with urllib.request.urlopen(req, timeout=8) as resp:
        return resp.status == 200


def esc(value: str) -> str:
    return (
        str(value)
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
    )


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта TechSearch и отправляет её владельцу в Telegram."""
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

    if isinstance(quiz, dict) and quiz:
        lines.append('')
        lines.append('<b>Ответы калькулятора:</b>')
        for key, value in quiz.items():
            if value:
                lines.append(f'• {esc(key)}: {esc(value)}')

    lines.append('')
    lines.append(f'<i>Источник: {esc(source)}</i>')

    delivered = send_telegram('\n'.join(lines))

    return {
        'statusCode': 200,
        'headers': CORS,
        'body': json.dumps({'success': True, 'delivered': delivered}, ensure_ascii=False),
    }
