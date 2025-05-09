# dell_bhoomi_poc_v1

To **access a REST API from Dell Boomi**, and then **expose the result as another REST API**, you're basically building an **integration flow** (a.k.a. process) that:

1. **Consumes data** from an external REST API (HTTP Client connector).
2. **Processes/transforms** the response as needed.
3. **Exposes** the final result as a new REST API endpoint (using Boomi's API component).

Here’s a step-by-step breakdown:

---

## 🔧 Step-by-Step: Access REST API & Expose as REST API in Dell Boomi

### 🔁 1. **Create a New Integration Process**

- Open your Boomi AtomSphere platform.
- Go to **Process → Create New**.

### 🌐 2. **Use HTTP Client Connector to Call External API**

- Add a **Connector Shape**.
  - Connector: **HTTP Client**
  - Action: **GET**, **POST**, etc., depending on the API you're calling.
- Configure:
  - **Connection**: Set Base URL, authentication (Bearer token, Basic Auth, etc.).
  - **Operation**: Set HTTP method, endpoint path, request/response profile.

### 🔧 3. **Add Mapping or Business Logic (Optional)**

- You can use **Map** shapes to transform the API response to the desired output.
- You can also add logic shapes (Decision, Branch, Business Rules, etc.) if needed.

### 🚀 4. **Expose the Process as a REST API**

- From the **Start Shape**, select **Web Services Server** connector.
- Action: **Listen** (usually for POST, GET, etc.).
- This means Boomi will listen for incoming HTTP requests.
- Set up a **Web Services Server connection and operation**, defining:
  - HTTP method (GET/POST)
  - Input and output profiles
  - Path (e.g., `/myapi/getdata`)

### 📤 5. **Return the Response**

- At the end of the process, the final **return document** is sent back to the calling client as the REST API response.

---

## 📘 Example Use Case:

You're calling an external weather API, like `https://api.weatherapi.com`, and want to expose that via your own Boomi API as `/get-weather`.

1. Start Shape: Web Services Server (GET `/get-weather`)
2. Connector Shape: HTTP Client (call external weather API)
3. Map Shape: Transform external API response if needed.
4. Return Shape: Send transformed data back to client.

---

## 🧪 Testing Your Boomi REST API

- After deploying the process to an Atom/Molecule:
  - Use Postman or curl to test:
    ```
    GET http://yourboomiatom.domain.com:9090/ws/rest/MyAPIProcess/get-weather
    ```

---

## 🛡️ Security Considerations

- Use Boomi API Management to:
  - Secure your API with OAuth2, API Key, etc.
  - Set quotas and logging.

---

Want a sample Boomi process design or JSON/XML structure to go with it? Just let me know your use case or what external API you're calling!

Absolutely! Let me break it down **step-by-step with detailed explanation** for you. We'll create a Boomi process that:

1. **Listens for a REST API request** (like from a browser or Postman).
2. **Calls an external REST API** (like a weather service or CRM).
3. **Processes the response** (optionally transforms it).
4. **Returns the result to the original caller** as your own REST API.

---

### ✅ Step-by-Step Detailed Walkthrough

---

## 🔹 Step 1: Create a New Boomi Process

1. **Login to Dell Boomi AtomSphere.**
2. Go to **Manage → Process Library**.
3. Click on **Create → New Process**.
4. Give your process a name like `ExposeExternalAPI`.

---

## 🔹 Step 2: Configure the Listener (Expose as REST API)

This is where Boomi will **receive** the REST call.

### 🛠 Start Shape

- Drag the **Start Shape** onto the canvas.
- In the **Connector Type**, choose `Web Services Server`.
- **Action**: `Listen`

### 🛠 Set Up the Web Services Server Connector

1. Click the pencil icon to **create a new connection**.
   - **Protocol**: HTTP
   - **Port**: Choose a port, e.g., `9090` (make sure it's open on your Atom).
2. Create a new **Operation**.
   - Set the **HTTP Method** you want to support, like `GET` or `POST`.
   - Assign a **Profile** for incoming request (optional if not sending body in request).

---

## 🔹 Step 3: Add the HTTP Client Connector (Call External API)

This will let Boomi **fetch data** from any external REST API.

### 🛠 Connector Shape (HTTP Client)

- Drag a **Connector Shape** to the canvas.
- Connector Type: `HTTP Client`
- Action: `GET`, `POST`, etc. (depending on the external API)

### 🔗 Create the HTTP Client Connection

- **Connection:**
  - Base URL: e.g., `https://api.example.com`
  - Authentication: Basic, OAuth2, or API key
- **Operation:**
  - Set Endpoint Path: e.g., `/v1/users` or `/weather`
  - HTTP Method: GET/POST
  - Attach request and response profiles (usually JSON)

✅ **Boomi will now call the external API** when someone hits your API.

---

## 🔹 Step 4: (Optional) Transform the Data

If you want to **change the response structure**:

### 🛠 Map Shape

- Drag a **Map Shape** between the HTTP Client and Return path.
- Set **Source Profile** to the external API's response.
- Set **Destination Profile** to the format you want your API to return.

---

## 🔹 Step 5: Return the Result

### 🛠 Set the Return Document

- Drag the line to an **End Shape**.
- Before that, add a **Message Shape** if you want to set a custom response.
- The document reaching the end of the process will be returned as the REST API response to the client (like Postman, browser, etc.).

---

## 🔹 Step 6: Deploy the Process

1. Click **Deploy → Deploy Process**.
2. Select your Atom (cloud or local).
3. Finish deployment.

---

## 🔹 Step 7: Test Your REST API

Let’s say you set your path as `/get-data`, and you're running on port `9090`.

Now call your Boomi REST API like this (from Postman or browser):

```http
GET http://localhost:9090/ws/rest/ExposeExternalAPI/get-data
```

💡 If you set authentication or query parameters, make sure you include those!

---

## 🎯 Example Use Case

Imagine you want to call this public API:

```
https://jsonplaceholder.typicode.com/users
```

You can set:

- **HTTP Client Connector**:
  - Base URL: `https://jsonplaceholder.typicode.com`
  - Path: `/users`
  - Method: `GET`

Then expose that data via your own Boomi REST API at:

```
GET http://localhost:9090/ws/rest/get-users
```

---

## 🔒 Optional: Secure the API

- Use **Boomi API Management** to:
  - Add API key or OAuth2 security
  - Rate-limit access
  - Monitor usage

---

Would you like me to create a sample JSON request/response structure or help you with mapping the response? Or maybe build the exact flow for a real API like weather or user data?

Awesome! Let's talk about how to use the **Message Shape** in Dell Boomi — it's super useful when you want to **modify or set the contents of a document**, especially before returning it in a REST API response.

---

## 🎯 What is the Message Shape?

The **Message Shape** is used to:

- Set or update the content of the current document (XML, JSON, or plain text).
- Use dynamic values (like variables or profile fields) inside a template.
- Return static responses for testing or errors.
- Customize your API response body.

---

## ✅ Step-by-Step: How to Add and Use the Message Shape

---

### 🔹 Step 1: Drag the Message Shape into Your Process

- In the **Process Canvas**, look for the shape called **Message** (it's in the "Data Process" category).
- Drag it between two shapes (for example, after the HTTP Client call or after the Map Shape).

---

### 🔹 Step 2: Configure the Message Shape

1. **Double-click** the Message Shape to open it.
2. In the **Message Type**, select the format:
   - `Plain Text` (for simple responses)
   - `XML`
   - `JSON` ✅ (most common for REST APIs)
3. Enter your response content. For example:

```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "timestamp": "[Current DateTime]"
}
```

You can also insert **dynamic values**:

- Click the `+` icon (Insert Dynamic Document Property or Process Property)
- Example with dynamic fields:

```json
{
  "status": "success",
  "username": "[username]",
  "email": "[email]"
}
```

---

### 🔹 Step 3: Save and Connect It

- After configuring your message, click **Save and Close**.
- Connect the Message Shape to the next shape (like the End Shape or a Return).

---

## 🔄 Example Use Case in a REST API Process

Let’s say you want to **return a simple success response** from your custom API:

### 🧩 Process Flow:

```
Start (Web Services Server)
    ↓
HTTP Client (Call external API)
    ↓
Map Shape (Transform data)
    ↓
Message Shape (Format response)
    ↓
End (Return to client)
```

Your **Message Shape** could return something like this:

```json
{
  "status": "ok",
  "data": "[Mapped Profile Output Here]"
}
```

---

## 💡 Pro Tips

- Use the Message Shape to **mock data** if the external API is not ready.
- It’s also perfect for returning **error messages** if something fails (just connect it after a Decision Shape).

---

Would you like a real example with dynamic fields or inserting mapped values into a JSON structure? If you give me your current profile or desired output, I’ll build one with you! 💬

![alt text](image.png)

Certainly! Using the **JSON Validator** within a **REST Connector** in Dell Boomi involves ensuring that the incoming or outgoing JSON data is validated against a set schema or structure. Dell Boomi's **REST Connector** can handle JSON data natively, and you can incorporate validation either before or after sending/receiving data through the connector.

Here's a more detailed guide on how to validate JSON using the **REST Connector**:

### **Overview of Process:**

- **Step 1**: Set up a **REST Connector** to receive or send JSON data.
- **Step 2**: Use a **Data Process Shape** or **Custom Script** to validate the incoming/outgoing JSON.
- **Step 3**: Optionally, use a **Decision Shape** or **Error Handling** to catch invalid data and respond accordingly.

---

### **Step 1: Set up REST Connector (Receiving JSON)**

If you're using a **REST Connector** to receive data in JSON format, the connector itself doesn't directly validate the JSON schema. However, it ensures that the data is in **valid JSON format**.

#### 1. **Create/Configure REST Connector in Boomi**

1. In Boomi, go to your **Process** and drag the **REST Connector** onto the canvas.
2. Open the **Connector Configuration** for the **REST Connector**.
3. Set the **Operation** to the appropriate HTTP method (e.g., **GET**, **POST**, **PUT**, etc.).
4. In the **Request Profile**, configure the request to expect JSON.

   - For example, when setting the **Request Profile**, choose **JSON** as the format.
   - This ensures Boomi knows how to handle the data you're sending or receiving.

5. In the **Response Profile**, also set the format to **JSON**.
   - If the response from the REST service will be in JSON format, configure the **Response Profile** accordingly.

#### 2. **Receive and Process JSON**

Once the REST connector receives JSON data, it will be in an XML structure if you map it to Boomi's **XML profiles**. You will need to use the **Data Process Shape** to convert the XML back into JSON if needed.

---

### **Step 2: Add JSON Validation Logic (Custom Script or Data Process Shape)**

Since Boomi doesn't have a direct **JSON Schema Validator** in the REST Connector, you can validate the JSON data using **Custom Scripts (JavaScript)** or by adding checks within a **Data Process Shape**.

#### Option 1: Using a **Custom Script** Shape to Validate JSON

1. **Drag a Custom Script Shape** onto the canvas after the REST Connector.
2. In the **Custom Script Shape**, choose **JavaScript** as the scripting language.

3. In the **Script** editor, use JavaScript to parse and validate the JSON.

Here's an example of how you can validate JSON in the script shape:

```javascript
try {
  // Parse the incoming JSON
  var inputJson = JSON.parse(data)

  // Example validation: Check if the required fields 'name' and 'age' exist
  if (!inputJson.name || !inputJson.age) {
    throw new Error('Invalid JSON: Missing required fields "name" or "age"')
  }

  // Example: Check if the types are correct
  if (typeof inputJson.name !== 'string') {
    throw new Error('Invalid JSON: "name" should be a string')
  }

  if (typeof inputJson.age !== 'number') {
    throw new Error('Invalid JSON: "age" should be a number')
  }

  // Return the valid data
  return data // Proceed with the process if valid JSON
} catch (error) {
  // Throw an error if JSON is invalid
  throw new Error('JSON Validation failed: ' + error.message)
}
```

In this script:

- `JSON.parse(data)` parses the incoming data to ensure it’s valid JSON.
- It checks whether certain fields (`name`, `age`) exist and whether they have the correct data types.
- If the JSON is valid, it returns the data for further processing; otherwise, it throws an error.

#### Option 2: Using a **Data Process Shape** (Transform to JSON & Validate)

1. **Add a Data Process Shape** to your process flow.
2. Inside the **Data Process Shape**, you can:

   - **Transform** the data (if it’s XML) back to JSON.
   - Use **Groovy or JavaScript** to validate the structure.

3. The **Validate** logic can be added in the form of **custom functions** or scripting, as explained in the Custom Script option above.

---

### **Step 3: Error Handling with Decision Shape**

Once the data is validated (either via the **Custom Script** shape or in the **Data Process Shape**), you can use a **Decision Shape** to route the flow based on the validation result.

1. **Add a Decision Shape** after the validation logic.
2. In the **Decision Shape**, check if the validation was successful. You can create a custom property in Boomi to hold the validation result and check if it’s true or false.

Example:

- If validation passes, proceed with normal flow.
- If validation fails (e.g., the data is invalid), you can either stop the process or trigger an error message to an external system.

---

### **Step 4: Optional (Optional JSON Schema Validation using External Tools)**

For more complex or detailed JSON validation (i.e., validating against a **JSON Schema**), you can:

1. Use a third-party service or library (outside Boomi) to validate the schema.
2. Call that service from Boomi using an **HTTP Client** or an **External API**.

For example, you can invoke a **JSON Schema Validation API** to check if your incoming JSON matches a defined schema.

---

### **Example of Complete Flow:**

1. **REST Connector** receives a **POST request** with JSON data.
2. **Custom Script Shape** validates the JSON (check for required fields, correct types, etc.).
3. If valid, the process continues to transform or map the data.
4. If invalid, an error is thrown, and the flow can be redirected based on a **Decision Shape**.

---

### **Conclusion:**

In **Dell Boomi**, you cannot directly validate a **JSON Schema** with the **REST Connector**, but you can use **Custom Scripts (JavaScript)** to validate the incoming JSON data. This approach ensures that you can check the integrity and structure of the data before proceeding with further transformations or API calls.

Let me know if you need additional details or run into any issues while setting this up!

Absolutely! Let's go step by step and explain in **full detail** how you can **validate JSON data** using a **REST Connector** in Dell Boomi, especially when Boomi doesn't provide a direct built-in JSON Schema Validator. We'll work around this by using Boomi features like **Scripting**, **Profiles**, and **Process Shapes**.

---

### ✅ **Goal:**

To validate incoming JSON data (e.g., from a POST request) in a Dell Boomi process using a **REST connector** and ensure required fields are present and correctly formatted.

---

## 🔁 STEP-BY-STEP GUIDE

---

### 🔹 **Step 1: Setup REST Listener (Connector)**

You'll first need to create a process that listens to incoming REST API calls.

#### ➤ A. Create a new **Process**

1. In Boomi, go to **Build** → **New Process**
2. Give it a name like `ValidateJSONProcess`

#### ➤ B. Add **Start Shape**

1. Drag a **Start Shape** to the canvas.
2. Set **Connector Type**: _Web Services Server (Listener)_
3. **Operation Type**: Choose `POST` (usually used for JSON data)
4. Create a **JSON Profile**:
   - Example JSON:
     ```json
     {
       "name": "John",
       "age": 30
     }
     ```
   - Use this to auto-generate a profile.
   - This profile tells Boomi what fields to expect.

#### ➤ C. Save and proceed to next shape.

---

### 🔹 **Step 2: Add Custom Script for Validation**

We'll validate the incoming JSON using **JavaScript** in a **Scripting Shape**.

#### ➤ A. Add a **Data Process Shape**

1. Drag a **Data Process** shape onto the canvas.
2. Choose **Custom Scripting**.
3. Select **JavaScript** as the language.

#### ➤ B. Add this script:

```javascript
try {
  var input = JSON.parse(data) // parse the incoming JSON text

  // Validate fields
  if (!input.name || typeof input.name !== 'string') {
    throw new Error("Missing or invalid 'name'")
  }

  if (!input.age || typeof input.age !== 'number') {
    throw new Error("Missing or invalid 'age'")
  }

  // If validation passes, return the original data
  return data
} catch (e) {
  // Throw error to Boomi
  throw new Error('JSON Validation Failed: ' + e.message)
}
```

#### ➤ C. Why this works:

- `JSON.parse(data)` turns incoming text into a JSON object.
- Checks if `name` and `age` exist and have correct types.
- If not, throws an error that Boomi will catch.

---

### 🔹 **Step 3: Add Try-Catch Using Branching (Optional)**

You can use **Try/Catch** in Boomi using paths:

- If validation passes → proceed.
- If validation fails → send error message.

#### ➤ A. Use a **Process Route Shape**

1. Drag a **Process Route** after the script.
2. Add two paths:
   - Path 1: On success
   - Path 2: On failure

#### ➤ B. Configure Error Route

1. Under **Extensions**, enable error handling.
2. Send a meaningful error response or log the error to an API or database.

---

### 🔹 **Step 4: Response Back to API Caller**

#### ➤ A. Add a **Return Document Shape**

This sends a response back to the API caller.

1. Drag a **Return Document** shape at the end of the successful flow.
2. Enter a message like:

```json
{
  "status": "success",
  "message": "JSON is valid!"
}
```

#### ➤ B. Add one for the error path as well:

```json
{
  "status": "error",
  "message": "JSON validation failed"
}
```

---

## 🧪 Example Flow Structure:

```plaintext
Start (REST Listener)
   ↓
Custom Script (Validate JSON)
   ↓
Process Route (Success / Error)
   → If valid → Return "Success JSON"
   → If invalid → Return "Error JSON"
```

---

### 🧠 Notes:

- You cannot validate against a full **JSON Schema** in Boomi natively, but you _can_ replicate similar validation using custom scripting.
- You can optionally integrate with 3rd-party JSON Schema Validators via an **HTTP Connector** call.

---

Would you like me to walk you through this live in a shared environment or help set up a sample process in your Boomi account (if you're logged in)? Or I can help you write the REST listener operation if needed!

Great! Let's build a **sample Boomi process** that listens to a REST API request and **validates JSON data**. I’ll guide you step-by-step to create this process inside your Dell Boomi AtomSphere platform. Here's what we’ll build:

---

## ✅ What We’ll Build

A process that:

1. Accepts a REST `POST` request with JSON data.
2. Validates required fields (`name` as string and `age` as number).
3. Returns a success message if valid, or error message if invalid.

---

## 🛠 STEP-BY-STEP: Build Sample JSON Validation Process in Boomi

---

### 🔹 Step 1: Create a New Process

1. Go to **Build** tab.
2. Click **Create Component** → **Process**
3. Name it: `JSON_Validation_REST_Process`

---

### 🔹 Step 2: Configure the Start Shape

1. Drag the **Start Shape** onto the canvas.
2. Set Type: **Web Services Server**
3. Connector: **Shared Web Server Listener (POST)**
4. Click **+** to create an Operation.

#### ➤ Create JSON Profile

1. In Operation settings, click **+** for Request Profile.
2. Choose **JSON** → Create New JSON Profile
3. Use sample JSON like:
   ```json
   {
     "name": "John Doe",
     "age": 30
   }
   ```
4. Save the Profile and Operation.

---

### 🔹 Step 3: Add Scripting for Validation

1. Drag a **Data Process Shape** right after Start.
2. Choose Action: **Custom Scripting**
3. Language: **JavaScript**

#### ➤ Add Script:

```javascript
try {
  var jsonData = JSON.parse(data)

  if (!jsonData.name || typeof jsonData.name !== 'string') {
    throw new Error("Invalid or missing 'name'")
  }

  if (jsonData.age === undefined || typeof jsonData.age !== 'number') {
    throw new Error("Invalid or missing 'age'")
  }

  return data // Valid JSON
} catch (e) {
  throw new Error('Validation Error: ' + e.message)
}
```

---

### 🔹 Step 4: Add Try/Catch Branch (Error Handling)

1. Drag a **Try/Catch Shape** around the script.
   - Right-click → Insert Shape → **Try/Catch**
2. Move the Script inside the **Try block**.
3. Create two paths:
   - **Try path** → success
   - **Catch path** → error handling

---

### 🔹 Step 5: Add Return Document (Success & Error)

#### For Success Path:

1. Drag a **Message Shape** → add message like:
   ```json
   {
     "status": "success",
     "message": "JSON is valid"
   }
   ```
2. Connect it to a **Return Document** shape.

#### For Error Path:

1. Drag a **Message Shape** → add:
   ```json
   {
     "status": "error",
     "message": "JSON validation failed"
   }
   ```
2. Connect it to another **Return Document**.

---

### 🔹 Step 6: Deploy to Atom & Enable API Gateway

1. Go to **Deploy** tab → Deploy the process.
2. In **Manage** tab:
   - Go to **API Management** → Publish API
   - Select your deployed process and environment.
   - Enable Gateway access (external).
   - Define endpoint path like: `/validate-json`

---

### 📌 Final Process Flow

```plaintext
Start (REST Listener)
   ↓
Try
  ↓ (success)
    Script → Message (success) → Return Document
  ↓ (catch)
    Message (error) → Return Document
```

---

Would you like me to help create the actual **JSON Profile and Operation**, or walk you through **API Management** side next? Also, are you using **Test Atom Cloud** or a **Local Atom**?

Absolutely! Let’s walk through **each step together**, and I’ll help you build the entire Boomi JSON validation process from scratch. I’ll break it into clear chunks, and you can tell me where you are stuck or want me to go slower or faster.

---

## ✅ Step 1: Create a New Process

1. Go to the **Boomi Build tab**.
2. Click the **+** (Create Component) → Select **Process**.
3. Give it a name like: `JSON_Validation_REST_Process`
4. Click **Create**.

---

## ✅ Step 2: Set Up Start Shape (REST Listener)

1. On the canvas, click the **Start Shape**.
2. In **Type**, select: `Web Services Server`.
3. Click **+** next to Connector → Create a new **Web Services Server Connector**.
   - You can name it `JSON_Listener`.
4. Click **+** to create a new **Operation**:
   - Name it `JSON_Listener_Operation`.
   - Click **+** to create a **Request Profile** → Select **JSON**.

---

## ✅ Step 3: Create JSON Profile

1. In the JSON Profile window, paste this sample:

```json
{
  "name": "John Doe",
  "age": 30
}
```

2. Save and close the JSON Profile.
3. Save and close the Operation.
4. Now your **Start shape** is ready and expecting JSON.

---

## ✅ Step 4: Add Try/Catch Shape

1. On the canvas, right-click → Insert Shape → Choose **Try/Catch**.
2. Drag the **Start Shape** inside the Try/Catch **Try block**.
3. Your canvas now has:
   ```
   Try
     └── Start Shape (JSON Listener)
   Catch
     └── (we’ll handle error response here)
   ```

---

## ✅ Step 5: Add Data Process Shape (Validation Script)

1. Inside the Try block, drag a **Data Process Shape** after the Start Shape.
2. Set **Action** to `Custom Scripting`.
3. Language: JavaScript

### Paste this code:

```javascript
try {
  var jsonData = JSON.parse(data)

  if (!jsonData.name || typeof jsonData.name !== 'string') {
    throw new Error("Invalid or missing 'name'")
  }

  if (jsonData.age === undefined || typeof jsonData.age !== 'number') {
    throw new Error("Invalid or missing 'age'")
  }

  return data
} catch (e) {
  throw new Error('Validation Error: ' + e.message)
}
```

4. Save and close the Data Process Shape.

---

## ✅ Step 6: Add Success Response Message

1. After the Data Process shape, drag a **Message Shape**.
2. Enter this message:

```json
{
  "status": "success",
  "message": "JSON is valid"
}
```

3. After this, drag a **Return Document** shape to send the success back to the API caller.

---

## ✅ Step 7: Add Catch Block Response

1. In the Catch block (on the right side of Try/Catch), drag a **Message Shape**.
2. Add this message:

```json
{
  "status": "error",
  "message": "JSON validation failed"
}
```

3. Connect that to another **Return Document** shape.

---

### 📌 Your Canvas Layout Should Look Like:

```
Start (REST Listener)
   ↓
Try
  ↓
    Data Process (JavaScript validation)
    ↓
    Message (Success)
    ↓
    Return Document

Catch
  ↓
    Message (Error)
    ↓
    Return Document
```

---

## ✅ Step 8: Deploy and API Gateway Setup

Let me ask you a few things before we proceed to deployment:

1. Are you using a **Local Atom** or **Test Atom Cloud**?
2. Have you already **enabled API Management** in your Boomi account?
3. When you deployed earlier, were you able to **see your process listed under APIs** in the **Manage > API Management** tab?

Once I know these, I can help you deploy and connect your process to the **API Gateway**, expose it, and test it using Postman or any REST client.

Let me know where you're currently stuck, and I’ll walk you through it step by step!
