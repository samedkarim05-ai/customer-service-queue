CUSTOMER SERVICE QUEUE MANAGEMENT WEB APP

Files
- index.html: page structure
- style.css: responsive styling
- script.js: queue operations and browser storage

How to run locally
1. Extract the ZIP file.
2. Open the folder in Visual Studio Code.
3. Open index.html in a browser, or use the Live Server extension.
4. Add several customers and click "Serve next customer" to demonstrate FIFO.

Queue operations
- Enqueue: customers.push(...)
- Dequeue: customers.shift()
- The first customer in the array is the next customer to be served.
- localStorage saves the queue in the same browser on the same device.

How to deploy
This is a static website and does not require a server-side database.
1. Create/sign in to a hosting account that supports static sites (for example, Netlify).
2. Upload/deploy the extracted project folder using the host's current manual deployment workflow.
3. Make sure index.html, style.css, and script.js are at the root of the deployed site.
4. Open the generated public URL and test adding and serving customers.

Important limitation
The queue is stored in the visitor's browser, not in a shared online database. Different devices or browsers will have separate queues. A real multi-user service would need a backend and database.
