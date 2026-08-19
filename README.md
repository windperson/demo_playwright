# Use Playwright to do web page automation

## Start Google Chrome browser remote debug mode

To control chromw browser with manually logined session, Open Google Chrome as:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir=$(Resolve-Path .\chrome_debug_profile)
```

Then goto the URL : [`chrome://inspect/#remote-debugging`](chrome://inspect/#remote-debugging), turn on "Allow remote debugging for this browser instance"


## Playwright CLI to control browser

Install [Plwywright-CLI](https://playwright.dev/agent-cli/installation),

(Besure use global install: `npm install -g @playwright/cli@latest` )

 and then run `playwright-cli install --skills agents` to make sure current project folder can use Playwright-CLI.

1. Attach the Google Chrome browser with remote debug mode:
   ```powershell
   playwright-cli attach --cdp=http://localhost:9222
   ```
2. Open new tab:
   ```powershell
   playwright-cli tab-new  https://demo.playwright.dev/todomvc
   ```
3. Use [`tracing-start` & `tracing-stop` sub commands](https://playwright.dev/agent-cli/commands/tracing) to record tracing of human interaction in web page using Playwright CLI.

## True Remote Google Chrome CDP attach for Playwright-CLI

In order to attach the Google Chrome browser running on the other remote machine, you can use the `cdn_proxy.ts` script to initiate the CDP proxy server (listen on PORT:**9223** to prevent TCP port conflict):

```sh
npm run start:cdp_proxy
```

Once the CDP proxy server is running, and make sure the remote machine has enable _**In bound**_ **TCP port 9223** in its firewall setting, you can attach to the browser on remote machine via:

```sh
 playwright-cli attach --cdp=http://<ip address of remote machine>:9223   
```
