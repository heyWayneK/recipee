/\* INFO: **********************\*\*\***********************
Integer Types:\_\_\_
Int: Standard integer (4 bytes, -2,147,483,648 to 2,147,483,647)
BigInt: For larger integers

Decimal Types:\_\_\_\_
Float: Floating-point number
Decimal: Fixed-point decimal (when you need exact decimal precision)

String Types:\_\_\_\_
String: Standard string type
String @db.VarChar(n): String with specific length (e.g., @db.VarChar(255))
String @db.Text: For longer text content

JSON Types:\_\_\_\_
Json: Standard JSON type (mapped to JSONB in PostgreSQL, JSON in MySQL)

In PostgreSQL, use Json @db.JsonB to explicitly use JSONB

Other Scalar Types:\_\_\_\_
Boolean: True or false
DateTime: Date and time
Bytes: Binary data
Unsupported: For database-specific types

Modifiers:\_\_\_\_
Make any field optional by adding ? (e.g., String?)
Set default values with @default(value)
Set field attributes with @ notation

---

\*/
