# NOML Specification

**Version 1.0.0**

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Document Structure](#2-document-structure)
3. [Schema Objects](#3-schema-objects)
4. [Enum Definitions](#4-enum-definitions)
5. [Keys & Constraints](#5-keys--constraints)
6. [Field Validation](#6-field-validation)
7. [Index Definitions](#7-index-definitions)
8. [Advanced Features](#8-advanced-features)
9. [Data Types](#9-data-types)
10. [Extensions](#10-extensions)
11. [Security Considerations](#11-security-considerations)
12. [Complete Examples](#12-complete-examples)
- [Appendix A: JSON Schema](#appendix-a-json-schema)
- [Appendix B: MIME Type](#appendix-b-mime-type)
- [Appendix C: Changelog](#appendix-c-changelog)

---

## 1. Introduction

### 1.1 Purpose

**NOML (NoSQL Modeling Language)** is a specification for describing NoSQL database schemas in a human-readable and machine-parseable format. NOML aims to be for NoSQL databases what OpenAPI is for REST APIs.

### 1.2 Format

NOML documents are written in **YAML** (or JSON) format. The relationship between NOML and YAML is analogous to OpenAPI and YAML/JSON:

- **YAML/JSON**: The serialization format (syntax)
- **NOML**: The schema specification built on top of YAML/JSON

```
┌─────────────────────────────────────────┐
│           NOML Specification            │  ← Schema rules & structure
├─────────────────────────────────────────┤
│         YAML 1.2 / JSON Format          │  ← Serialization format
└─────────────────────────────────────────┘
```

### 1.3 Scope

This specification defines:

- A standard format for documenting NoSQL database structures
- Schema definitions for collections, fields, and relationships
- Validation rules and constraints
- Index definitions
- Security rules

The initial version focuses on **Firestore** as the primary target database, with extensibility for other NoSQL databases (MongoDB, DynamoDB, etc.) in future versions.

### 1.4 Conformance

An implementation is conformant with this specification if it:

1. Parses valid NOML documents without error
2. Rejects documents that violate REQUIRED constraints
3. Handles OPTIONAL fields gracefully when absent
4. Ignores unknown fields for forward compatibility

### 1.5 Terminology

| Term | Definition |
|------|------------|
| **Document** | A single record in a collection, analogous to a row in SQL |
| **Collection** | A group of documents, analogous to a table in SQL |
| **Subcollection** | A collection nested within a document |
| **Field** | A named property of a document |
| **Schema** | The complete NOML definition describing database structure |
| **Enum** | A set of predefined allowed values |
| **Index** | A database structure that improves query performance |

---

## 2. Document Structure

### 2.1 File Format

NOML documents MUST be written in YAML format (YAML 1.2) or JSON format. The file extension SHOULD be `.noml.yaml`, `.noml.yml`, or `.noml.json`.

### 2.2 Character Encoding

NOML documents MUST be encoded in UTF-8.

### 2.3 Root Object

A valid NOML document MUST contain the following root-level fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `noml` | string | REQUIRED | The NOML specification version (e.g., "1.0.0") |
| `database` | string | REQUIRED | The target database type (e.g., "firestore") |
| `collections` | object | REQUIRED | Collection definitions |
| `metadata` | [Metadata Object](#31-metadata-object) | OPTIONAL | Document metadata |
| `description` | string | OPTIONAL | Schema description |
| `updatedAt` | string | OPTIONAL | Last update date (ISO 8601) |
| `enums` | object | OPTIONAL | Global enum definitions |
| `functions` | object | OPTIONAL | Cloud function definitions (reserved) |

**Example:**

```yaml
noml: "1.0.0"
database: firestore
metadata:
  name: My Application
  description: Application database schema
  author: Development Team
collections:
  users:
    # ... collection definition
```

### 2.4 Versioning

NOML uses [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** version: Incompatible changes
- **MINOR** version: Backwards-compatible additions
- **PATCH** version: Backwards-compatible fixes

Implementations SHOULD:
- Accept documents with the same MAJOR version
- Warn on unknown fields (MINOR version differences)
- Process documents with higher PATCH versions normally

---

## 3. Schema Objects

### 3.1 Metadata Object

Provides information about the schema.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | REQUIRED | Schema/project name |
| `description` | string | OPTIONAL | Detailed description |
| `author` | string | OPTIONAL | Author or team name |

**Example:**

```yaml
metadata:
  name: E-Commerce Platform
  description: Database schema for online store
  author: Platform Team
```

### 3.2 Collection Object

Defines a collection (table) in the database.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | OPTIONAL | Collection description |
| `path` | string | OPTIONAL | Custom collection path |
| `fields` | object | REQUIRED | Field definitions |
| `keys` | [Keys Object](#5-keys--constraints) | OPTIONAL | Key constraints |
| `subcollections` | object | OPTIONAL | Nested collection definitions |
| `indexes` | array | OPTIONAL | Index definitions |
| `security` | [Security Object](#84-security-rules) | OPTIONAL | Security rules |

**Example:**

```yaml
collections:
  users:
    description: Registered user accounts
    fields:
      email:
        type: string
        required: true
      displayName:
        type: string
    subcollections:
      orders:
        # ... nested collection
```

### 3.3 Field Object

Defines a field (column) within a collection.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | REQUIRED | Field data type |
| `description` | string | OPTIONAL | Field description |
| `required` | boolean | OPTIONAL | Whether field is required (default: false) |
| `nullable` | boolean | OPTIONAL | Whether null is allowed (default: true) |
| `default` | any | OPTIONAL | Default value |
| `example` | any | OPTIONAL | Example value for documentation |
| `source` | string | OPTIONAL | Data source (e.g., "documentId") |
| `immutable` | boolean | OPTIONAL | If true, field cannot be updated after creation |
| `autoUpdate` | boolean | OPTIONAL | If true, field updates automatically on document write |
| `validation` | [Validation Object](#6-field-validation) | OPTIONAL | Validation constraints |
| `security` | string | OPTIONAL | Field-level security expression |
| `denormalization` | [Denormalization Object](#81-denormalization) | OPTIONAL | Denormalization settings |
| `denormalizedFrom` | object\|string | OPTIONAL | Source of denormalized data |
| `computed` | [Computed Object](#82-computed-fields) | OPTIONAL | Computed field settings |

**Example:**

```yaml
fields:
  email:
    type: string
    description: User's email address
    required: true
    immutable: true
    validation:
      format: email
    example: "user@example.com"

  createdAt:
    type: timestamp
    required: true
    default: serverTimestamp
    immutable: true
```

### 3.4 Reference Field

A field that references another document.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | "reference" | REQUIRED | Must be "reference" |
| `target` | string | REQUIRED | Target collection name |
| `description` | string | OPTIONAL | Field description |

**Example:**

```yaml
authorRef:
  type: reference
  target: users
  description: Reference to the author's user document
  required: true
```

### 3.5 Array Field

A field containing an array of values.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | "array" | REQUIRED | Must be "array" |
| `items` | string\|object | REQUIRED | Item type specification |
| `validation` | object | OPTIONAL | Array-specific validation |

**Items specification:**
- Simple: `items: string` (shorthand for primitive type)
- Object: `items: { type: "string" }` (explicit type object)

**Example:**

```yaml
tags:
  type: array
  items: string
  description: List of tags
  validation:
    minItems: 1
    maxItems: 10

scores:
  type: array
  items:
    type: number
  description: List of scores
```

### 3.6 Map Field

A field containing a nested object (map/dictionary).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | "map" | REQUIRED | Must be "map" |
| `fields` | object | OPTIONAL | Nested field definitions |
| `description` | string | OPTIONAL | Field description |

**Example:**

```yaml
address:
  type: map
  description: User's address
  fields:
    street:
      type: string
      required: true
    city:
      type: string
      required: true
    zipCode:
      type: string
      validation:
        pattern: "^\\d{5}(-\\d{4})?$"
    country:
      type: string
      default: "US"
```

---

## 4. Enum Definitions

Enums define a set of allowed values for fields. They can be defined globally in the `enums` section and referenced by fields.

### 4.1 Enum Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | OPTIONAL | Enum description |
| `values` | array | REQUIRED | List of allowed values |
| `transitions` | object | OPTIONAL | State machine transitions |

### 4.2 Simple Enum

Values can be simple strings or numbers:

```yaml
enums:
  UserRole:
    description: User permission levels
    values:
      - user
      - moderator
      - admin
```

### 4.3 Rich Enum

Values can include labels and descriptions for documentation:

```yaml
enums:
  OrderStatus:
    description: Order lifecycle states
    values:
      - value: pending
        label: Pending
        description: Order created, awaiting payment
      - value: paid
        label: Paid
        description: Payment received
      - value: shipped
        label: Shipped
        description: Order shipped to customer
      - value: delivered
        label: Delivered
        description: Order delivered successfully
      - value: cancelled
        label: Cancelled
        description: Order was cancelled
```

### 4.4 State Machine Transitions

Define valid state transitions for workflow enforcement:

```yaml
enums:
  OrderStatus:
    description: Order lifecycle states
    values:
      - pending
      - paid
      - shipped
      - delivered
      - cancelled
    transitions:
      pending:
        - paid
        - cancelled
      paid:
        - shipped
        - cancelled
      shipped:
        - delivered
      delivered: []  # Terminal state
      cancelled: []  # Terminal state
```

### 4.5 Using Enums in Fields

Reference an enum by name in the field's `type`:

```yaml
fields:
  status:
    type: OrderStatus  # References the enum defined above
    required: true
    default: pending
```

---

## 5. Keys & Constraints

### 5.1 Keys Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `primary` | string | OPTIONAL | Primary key field name |
| `description` | string | OPTIONAL | Keys description |
| `foreign` | array | OPTIONAL | Foreign key definitions |
| `unique` | array | OPTIONAL | Unique key definitions |
| `compositeUnique` | array | OPTIONAL | Composite unique key definitions |

### 5.2 Primary Key

Specifies the document identifier field:

```yaml
keys:
  primary: id
  description: User identifier from authentication provider
```

### 5.3 Foreign Key

Defines referential integrity constraints:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `field` | string | REQUIRED | Local field name |
| `references` | string | REQUIRED | Target in "collection.field" format |
| `onDelete` | string | OPTIONAL | Delete behavior: "cascade", "restrict", "setNull" |
| `nullable` | boolean | OPTIONAL | Whether the reference can be null |
| `isArray` | boolean | OPTIONAL | Whether the field is an array of references |
| `description` | string | OPTIONAL | Constraint description |

**Example:**

```yaml
keys:
  foreign:
    - field: authorId
      references: users.id
      onDelete: cascade
      description: Posts are deleted when author is deleted

    - field: categoryIds
      references: categories.id
      isArray: true
      onDelete: restrict
```

### 5.4 Unique Key

Enforces uniqueness on a single field:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `field` | string | REQUIRED | Field name |
| `enforceBy` | string | OPTIONAL | Enforcement mechanism |
| `description` | string | OPTIONAL | Constraint description |

**Example:**

```yaml
keys:
  unique:
    - field: email
      enforceBy: cloudFunction
      description: Email must be unique across all users

    - field: username
      enforceBy: securityRule
```

### 5.5 Composite Unique Key

Enforces uniqueness across multiple fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fields` | array | REQUIRED | Field names |
| `enforceBy` | string | OPTIONAL | Enforcement mechanism |
| `functionName` | string | OPTIONAL | Cloud function name for enforcement |
| `description` | string | OPTIONAL | Constraint description |

**Example:**

```yaml
keys:
  compositeUnique:
    - fields:
        - organizationId
        - email
      enforceBy: cloudFunction
      functionName: validateUniqueOrgEmail
      description: Email must be unique within an organization
```

---

## 6. Field Validation

### 6.1 Validation Object

| Field | Type | Applies To | Description |
|-------|------|------------|-------------|
| `min` | number | number | Minimum value |
| `max` | number | number | Maximum value |
| `minLength` | number | string | Minimum string length |
| `maxLength` | number | string | Maximum string length |
| `pattern` | string | string | Regular expression pattern |
| `format` | string | string | Predefined format |
| `minItems` | number | array | Minimum array length |
| `maxItems` | number | array | Maximum array length |
| `enum` | array | string/number | Allowed values (inline) |

### 6.2 Numeric Validation

```yaml
age:
  type: number
  validation:
    min: 0
    max: 150

price:
  type: number
  validation:
    min: 0
```

### 6.3 String Validation

```yaml
username:
  type: string
  validation:
    minLength: 3
    maxLength: 30
    pattern: "^[a-zA-Z0-9_]+$"

email:
  type: string
  validation:
    format: email

website:
  type: string
  validation:
    format: url
```

### 6.4 Predefined Formats

| Format | Description | Pattern |
|--------|-------------|---------|
| `email` | Email address | RFC 5322 compliant |
| `url` | URL | RFC 3986 compliant |
| `uuid` | UUID | RFC 4122 compliant |
| `date` | ISO 8601 date | YYYY-MM-DD |
| `datetime` | ISO 8601 datetime | YYYY-MM-DDTHH:mm:ssZ |
| `phone` | Phone number | E.164 format |

### 6.5 Array Validation

```yaml
tags:
  type: array
  items: string
  validation:
    minItems: 1
    maxItems: 10

ratings:
  type: array
  items:
    type: number
  validation:
    minItems: 0
    maxItems: 100
```

### 6.6 Inline Enum (Deprecated)

For simple cases, enum values can be defined inline. However, using global enum definitions is RECOMMENDED:

```yaml
# Deprecated - use global enums instead
status:
  type: string
  validation:
    enum:
      - active
      - inactive
      - suspended
```

---

## 7. Index Definitions

Indexes improve query performance and are essential for Firestore composite queries.

### 7.1 Index Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | OPTIONAL | Index name for reference |
| `description` | string | OPTIONAL | Index description |
| `fields` | array | REQUIRED | Fields to index |
| `queryExample` | string | OPTIONAL | Example query using this index |

### 7.2 Index Field

Fields can be specified as strings (default ascending) or objects:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `field` | string | REQUIRED | Field name |
| `order` | string | OPTIONAL | "asc" (default) or "desc" |
| `arrayContains` | boolean | OPTIONAL | Enable array-contains queries |

### 7.3 Simple Index

```yaml
indexes:
  - fields:
      - email
```

### 7.4 Composite Index

```yaml
indexes:
  - name: posts_by_author_date
    description: Query posts by author, sorted by date
    fields:
      - authorRef
      - field: createdAt
        order: desc
    queryExample: |
      db.collection('posts')
        .where('authorRef', '==', userRef)
        .orderBy('createdAt', 'desc')
```

### 7.5 Array Contains Index

```yaml
indexes:
  - name: posts_by_tag
    description: Query posts containing a specific tag
    fields:
      - field: tags
        arrayContains: true
      - field: publishedAt
        order: desc
```

### 7.6 Legacy Index Format

For backwards compatibility, the following format is also supported:

```yaml
indexes:
  - fields: [authorRef, createdAt]
    order: [asc, desc]
```

---

## 8. Advanced Features

### 8.1 Denormalization

NoSQL databases often denormalize data for read performance. NOML supports documenting denormalization strategies.

#### Denormalization Target

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `collection` | string | REQUIRED | Target collection |
| `field` | string | REQUIRED | Target field |
| `condition` | string | OPTIONAL | Condition expression |
| `key` | string | OPTIONAL | Key for map-based storage |

#### Denormalization Definition

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `targets` | array | OPTIONAL | Where this data is copied to |
| `syncMethod` | string | OPTIONAL | How to sync: "cloudFunction", "clientSdk" |
| `functionName` | string | OPTIONAL | Cloud function name for syncing |

**Example - Source field:**

```yaml
# In users collection
displayName:
  type: string
  required: true
  denormalization:
    targets:
      - collection: posts
        field: authorName
      - collection: comments
        field: authorName
    syncMethod: cloudFunction
    functionName: syncUserDisplayName
```

**Example - Denormalized field:**

```yaml
# In posts collection
authorName:
  type: string
  denormalizedFrom:
    collection: users
    field: displayName
```

### 8.2 Computed Fields

Fields whose values are derived from other data.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `method` | string | OPTIONAL | Computation method: "cloudFunction", "clientSdk" |
| `functionName` | string | OPTIONAL | Cloud function name |
| `trigger` | string | OPTIONAL | When to compute: "onCreate", "onUpdate", "onWrite" |
| `formula` | string | OPTIONAL | Computation formula (documentation) |

**Example:**

```yaml
fullName:
  type: string
  computed:
    formula: "firstName + ' ' + lastName"
    method: cloudFunction
    trigger: onWrite

postCount:
  type: number
  default: 0
  computed:
    method: cloudFunction
    functionName: updatePostCount
    trigger: onWrite
```

### 8.3 Document ID Source

Specify that a field's value comes from the document ID:

```yaml
id:
  type: string
  source: documentId
  description: Document ID, automatically populated
```

### 8.4 Security Rules

Define security rules for collections and operations.

#### Security Rule Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `condition` | string | REQUIRED | Security rule condition |
| `description` | string | OPTIONAL | Rule description |
| `excludeFields` | array | OPTIONAL | Fields excluded from this rule |

#### Security Definition

| Field | Type | Description |
|-------|------|-------------|
| `read` | array | Read operation rules |
| `create` | array | Create operation rules |
| `update` | array | Update operation rules |
| `delete` | array | Delete operation rules |

**Example:**

```yaml
collections:
  users:
    security:
      read:
        - condition: "request.auth != null"
          description: Authenticated users can read
      create:
        - condition: "request.auth.uid == request.resource.data.id"
          description: Users can only create their own document
      update:
        - condition: "request.auth.uid == resource.data.id"
          description: Users can only update their own document
          excludeFields:
            - role
            - createdAt
      delete:
        - condition: "false"
          description: Users cannot delete accounts
```

---

## 9. Data Types

### 9.1 Primitive Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text data | "Hello, World" |
| `number` | Integer or floating-point | 42, 3.14 |
| `boolean` | True or false | true, false |
| `null` | Null value | null |

### 9.2 Complex Types

| Type | Description | Example |
|------|-------------|---------|
| `timestamp` | Date and time | 2024-01-15T10:30:00Z |
| `geopoint` | Geographic coordinates | { lat: 35.6762, lng: 139.6503 } |
| `reference` | Document reference | /users/abc123 |
| `array` | Ordered list | ["a", "b", "c"] |
| `map` | Key-value object | { key: "value" } |

### 9.3 Special Values

| Value | Description | Usage |
|-------|-------------|-------|
| `serverTimestamp` | Server-generated timestamp | `default: serverTimestamp` |
| `autoId` | Auto-generated document ID | `default: autoId` |

### 9.4 Database-Specific Types

#### Firestore Types

All types listed above are native Firestore types. Additional considerations:

- **Bytes**: Binary data (not yet supported in NOML v1.0)
- **Vector**: ML embeddings (planned for future versions)

#### Future Database Support

When extending NOML for other databases:

- MongoDB: ObjectId, Decimal128, Binary
- DynamoDB: Set, List, Binary
- Cassandra: UUID, TimeUUID, Blob

---

## 10. Extensions

### 10.1 Vendor Extensions

Vendor-specific extensions MUST use the `x-` prefix:

```yaml
collections:
  users:
    x-firebase-ttl: 86400
    x-custom-property: value
    fields:
      email:
        type: string
        x-algolia-searchable: true
```

Implementations MUST ignore unknown `x-` prefixed fields without error.

### 10.2 Custom Annotations

For documentation purposes, custom annotations can be added:

```yaml
fields:
  secretKey:
    type: string
    x-sensitive: true
    x-encryption: AES-256
    description: Encrypted API key
```

---

## 11. Security Considerations

### 11.1 Sensitive Data

Fields containing sensitive data SHOULD be marked:

```yaml
password:
  type: string
  x-sensitive: true
  description: Hashed password (never store plaintext)
```

### 11.2 Input Validation

All user input SHOULD be validated using:
- Pattern matching for format enforcement
- Length constraints to prevent overflow
- Type validation to ensure data integrity

### 11.3 Reference Integrity

Foreign key constraints SHOULD define `onDelete` behavior to maintain data consistency.

### 11.4 Principle of Least Privilege

Security rules SHOULD follow the principle of least privilege:
- Start with restrictive rules
- Grant permissions explicitly
- Validate all writes

---

## 12. Complete Examples

### 12.1 Blog Application

```yaml
noml: "1.0.0"
database: firestore
metadata:
  name: Blog Platform
  description: A full-featured blog with users, posts, and comments
  author: Platform Team
updatedAt: "2024-01-15"

enums:
  UserRole:
    description: User permission levels
    values:
      - value: user
        label: User
        description: Regular user
      - value: author
        label: Author
        description: Can create and edit posts
      - value: admin
        label: Administrator
        description: Full system access

  PostStatus:
    description: Post publication states
    values:
      - draft
      - review
      - published
      - archived
    transitions:
      draft:
        - review
        - archived
      review:
        - draft
        - published
        - archived
      published:
        - archived
      archived: []

collections:
  users:
    description: Registered user accounts
    keys:
      primary: id
      unique:
        - field: email
          enforceBy: cloudFunction
        - field: username
          enforceBy: cloudFunction
    fields:
      id:
        type: string
        source: documentId
        required: true
      email:
        type: string
        required: true
        immutable: true
        validation:
          format: email
      username:
        type: string
        required: true
        validation:
          minLength: 3
          maxLength: 30
          pattern: "^[a-zA-Z0-9_]+$"
      displayName:
        type: string
        required: true
        validation:
          maxLength: 100
        denormalization:
          targets:
            - collection: posts
              field: authorName
          syncMethod: cloudFunction
      avatarUrl:
        type: string
        validation:
          format: url
      bio:
        type: string
        validation:
          maxLength: 500
      role:
        type: UserRole
        default: user
      postCount:
        type: number
        default: 0
        computed:
          method: cloudFunction
          trigger: onWrite
      createdAt:
        type: timestamp
        default: serverTimestamp
        immutable: true
      updatedAt:
        type: timestamp
        autoUpdate: true

    subcollections:
      settings:
        description: User preferences
        fields:
          theme:
            type: string
            default: system
            validation:
              enum:
                - light
                - dark
                - system
          emailNotifications:
            type: boolean
            default: true
          language:
            type: string
            default: en

    security:
      read:
        - condition: "request.auth != null"
          description: Authenticated users can read profiles
      update:
        - condition: "request.auth.uid == resource.data.id"
          description: Users can update their own profile
          excludeFields:
            - role
            - postCount
            - createdAt

  posts:
    description: Blog posts
    keys:
      foreign:
        - field: authorId
          references: users.id
          onDelete: cascade
    fields:
      id:
        type: string
        source: documentId
      title:
        type: string
        required: true
        validation:
          minLength: 1
          maxLength: 200
      slug:
        type: string
        required: true
        validation:
          pattern: "^[a-z0-9-]+$"
      content:
        type: string
        required: true
      excerpt:
        type: string
        validation:
          maxLength: 300
      authorId:
        type: string
        required: true
        immutable: true
      authorName:
        type: string
        denormalizedFrom:
          collection: users
          field: displayName
      coverImageUrl:
        type: string
        validation:
          format: url
      tags:
        type: array
        items: string
        validation:
          maxItems: 10
      status:
        type: PostStatus
        default: draft
      viewCount:
        type: number
        default: 0
      publishedAt:
        type: timestamp
      createdAt:
        type: timestamp
        default: serverTimestamp
        immutable: true
      updatedAt:
        type: timestamp
        autoUpdate: true

    indexes:
      - name: posts_by_author
        fields:
          - authorId
          - field: createdAt
            order: desc
        queryExample: "Posts by a specific author, newest first"

      - name: published_posts
        fields:
          - field: status
          - field: publishedAt
            order: desc
        queryExample: "Published posts, newest first"

      - name: posts_by_tag
        fields:
          - field: tags
            arrayContains: true
          - field: publishedAt
            order: desc

    subcollections:
      comments:
        description: Post comments
        keys:
          foreign:
            - field: authorId
              references: users.id
              onDelete: setNull
        fields:
          content:
            type: string
            required: true
            validation:
              minLength: 1
              maxLength: 2000
          authorId:
            type: string
          authorName:
            type: string
          createdAt:
            type: timestamp
            default: serverTimestamp
            immutable: true
          updatedAt:
            type: timestamp
            autoUpdate: true
```

### 12.2 E-Commerce Application

```yaml
noml: "1.0.0"
database: firestore
metadata:
  name: E-Commerce Platform
  description: Online store with products, orders, and customers

enums:
  OrderStatus:
    values:
      - value: pending
        label: Pending Payment
      - value: paid
        label: Payment Received
      - value: processing
        label: Processing
      - value: shipped
        label: Shipped
      - value: delivered
        label: Delivered
      - value: cancelled
        label: Cancelled
      - value: refunded
        label: Refunded
    transitions:
      pending: [paid, cancelled]
      paid: [processing, refunded]
      processing: [shipped, refunded]
      shipped: [delivered]
      delivered: [refunded]
      cancelled: []
      refunded: []

collections:
  products:
    description: Product catalog
    fields:
      name:
        type: string
        required: true
      description:
        type: string
      price:
        type: number
        required: true
        validation:
          min: 0
      currency:
        type: string
        default: USD
      stock:
        type: number
        default: 0
        validation:
          min: 0
      images:
        type: array
        items: string
      categories:
        type: array
        items: string
      isActive:
        type: boolean
        default: true
    indexes:
      - fields:
          - isActive
          - field: price
            order: asc

  orders:
    description: Customer orders
    keys:
      foreign:
        - field: customerId
          references: customers.id
          onDelete: restrict
    fields:
      customerId:
        type: string
        required: true
      items:
        type: array
        items:
          type: map
        description: Order line items
      totalAmount:
        type: number
        required: true
      currency:
        type: string
        default: USD
      status:
        type: OrderStatus
        default: pending
      shippingAddress:
        type: map
        fields:
          street:
            type: string
            required: true
          city:
            type: string
            required: true
          state:
            type: string
          postalCode:
            type: string
            required: true
          country:
            type: string
            required: true
      createdAt:
        type: timestamp
        default: serverTimestamp
```

---

## Appendix A: JSON Schema

A JSON Schema for validating NOML documents is available at:

`https://noml.dev/schema/v1.0.0/noml.schema.json`

The schema provides:
- Document structure validation
- Type checking
- Required field enforcement
- Pattern validation for field names

---

## Appendix B: MIME Type

The recommended MIME type for NOML documents:

```
application/noml+yaml
application/noml+json
```

File extensions:
- `.noml.yaml` or `.noml.yml` (YAML format)
- `.noml.json` (JSON format)

---

## Appendix C: Changelog

### v1.0.0 (2024-01-15)

- Complete specification rewrite
- Added RFC 2119 conformance language
- Added Enum definitions with state machine support
- Added Keys & Constraints section
- Added comprehensive Field Validation
- Added Index definitions with array-contains support
- Added Denormalization and Computed Fields
- Added Security Rules
- Added Vendor Extensions (x- prefix)
- Added complete examples
- Added JSON Schema reference
- Added MIME type registration

### v0.1.0 (Draft)

- Initial specification
- Firestore support
- Basic field types and constraints

---

## References

- [RFC 2119: Key words for use in RFCs](https://tools.ietf.org/html/rfc2119)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [YAML 1.2 Specification](https://yaml.org/spec/1.2/spec.html)
- [JSON Schema](https://json-schema.org/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Firestore Data Model](https://firebase.google.com/docs/firestore/data-model)

---

**License:** This specification is released under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

**Copyright:** 2024 NOML Contributors
