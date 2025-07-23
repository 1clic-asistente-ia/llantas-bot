import fetch from 'node-fetch';

const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

export interface FacebookMessage {
  text: string;
  quick_replies?: Array<{
    content_type: 'text';
    title: string;
    payload: string;
  }>;
}

export async function sendMessage(recipientId: string, message: FacebookMessage) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${FACEBOOK_PAGE_ACCESS_TOKEN}`;
  
  const payload = {
    recipient: { id: recipientId },
    message: message,
    messaging_type: 'RESPONSE'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error enviando mensaje a Facebook:', error);
      throw new Error(`Facebook API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en sendMessage:', error);
    throw error;
  }
}

export async function markSeen(recipientId: string) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${FACEBOOK_PAGE_ACCESS_TOKEN}`;
  
  const payload = {
    recipient: { id: recipientId },
    sender_action: 'mark_seen'
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error marcando como visto:', error);
  }
}

export async function typingOn(recipientId: string) {
  const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${FACEBOOK_PAGE_ACCESS_TOKEN}`;
  
  const payload = {
    recipient: { id: recipientId },
    sender_action: 'typing_on'
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error activando typing:', error);
  }
}