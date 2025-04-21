// Step 1: Read the document content from Boomi dataContext
var inputStream = dataContext.getStream(0);
var reader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
var jsonString = "";
var line;
while ((line = reader.readLine()) != null) {
  jsonString += line;
}

var errors = [];

try {
    var json = JSON.parse(jsonString);

    // Step 2: Validate top-level required fields
    if (!json.hasOwnProperty("orderId") || typeof json.orderId !== "string") {
        errors.push("Missing or invalid 'orderId'. Must be a string.");
    }

    if (!json.hasOwnProperty("customerName") || typeof json.customerName !== "string") {
        errors.push("Missing or invalid 'customerName'. Must be a string.");
    }

    if (!json.hasOwnProperty("totalAmount") || typeof json.totalAmount !== "number" || json.totalAmount < 0) {
        errors.push("Missing or invalid 'totalAmount'. Must be a number >= 0.");
    }

    // Step 3: Validate "items" array
    if (!json.hasOwnProperty("items") || !Array.isArray(json.items)) {
        errors.push("Missing or invalid 'items'. Must be an array.");
    } else {
        for (var i = 0; i < json.items.length; i++) {
            var item = json.items[i];

            if (typeof item !== "object") {
                errors.push("Item at index " + i + " must be an object.");
                continue;
            }

            if (!item.hasOwnProperty("productId") || typeof item.productId !== "string") {
                errors.push("Item[" + i + "]: Missing or invalid 'productId'. Must be a string.");
            }

            if (!item.hasOwnProperty("quantity") || typeof item.quantity !== "number" || item.quantity < 1) {
                errors.push("Item[" + i + "]: Missing or invalid 'quantity'. Must be an integer >= 1.");
            }
        }
    }

} catch (e) {
    errors.push("Invalid JSON format: " + e.message);
}

// Step 4: Throw error if validation fails
if (errors.length > 0) {
    throw new Error("JSON Schema Validation Failed:\n" + errors.join("\n"));
}

// Optional: put the valid JSON back in the document stream
var output = new java.lang.String(jsonString);
dataContext.storeStream(new java.io.ByteArrayInputStream(output.getBytes("UTF-8")), {});
