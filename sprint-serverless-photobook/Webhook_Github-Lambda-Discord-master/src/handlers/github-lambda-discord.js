'use strict'

const https = require('https')

exports.githubDiscordHandler = async (event) => {
  const githubEvent = JSON.parse(event.body)
  console.log(githubEvent)

    const msg = {
        "username": process.env.DISCORD_BOT_NAME,
        "avatar_url": process.env.DISCORD_BOT_AVATAR_URL,
        "embeds": [
            {
                "title": `ISSUE ${githubEvent.action.toUpperCase()} EVENT가 발생했어요!`,
                "color": (githubEvent.action === 'opened') ? 1127128 : 14177041
            },
            {
            "author": {
                "name": githubEvent.issue.user.login,
                "icon_url": githubEvent.issue.user.avatar_url
            },
            "title": githubEvent.issue.title,
            "description": githubEvent.issue.body,
            "url": githubEvent.issue.html_url
            }
        ]
    }

    try {
        const result = await postRequest(msg);
        console.log('result is: 👉️', result);

        return {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(result),
        };
    } catch (error) {
        console.log('Error is: 👉️', error);
        return {
        statusCode: 400,
        body: error.message,
        };
    }
}

function postRequest(body) {

    const options = {
      hostname: 'discord.com',
      path: process.env.DISCORD_WEBHOOK_PATH,
      method: 'POST',
      port: 443,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let rawData = '';
  
        res.on('data', chunk => {
          rawData += chunk;
        });
  
        res.on('end', () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (err) {
            reject(new Error(err));
          }
        });
      });
  
      req.on('error', err => {
        reject(new Error(err));
      });
  
      req.write(JSON.stringify(body));
      req.end();
    });
  }
  