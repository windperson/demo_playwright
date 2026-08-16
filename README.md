# Use Playwright to do web page automation

## Start Google Chrome browser remote debug mode

To control chromw browser with manually logined session, Open Google Chrome as:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir=$(Resolve-Path .\chrome_debug_profile)
```

Then goto the URL : `chrome://inspect/#remote-debugging`, turn on "Allow remote debugging for this browser instance"

Then open the <http://127.0.0.1:9222/json/version>, copy the json value of `"webSocketDebuggerUrl"` key


## Playwright CLI to control browser

Install [Plwywright-CLI](https://playwright.dev/agent-cli/installation), and then run `playwright-cli install --skills agents` to make sure current project folder can use Playwright-CLI.

1. Attach the Google Chrome browser with remote debug mode:
   ```powershell
   playwright-cli attach --cdp=http://localhost:9222
   ```
2. Open new tab:
   ```powershell
   playwright-cli tab-new  https://demo.playwright.dev/todomvc
   ```
