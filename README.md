# NOMLViewer

**NoSQL Schema Visualizer** - A design document viewer that renders NoSQL database schemas beautifully.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## What is NOML?

**NOML** = **NoSQL Modeling Language**

NOML is a YAML-based schema definition format for NoSQL databases. NOMLViewer transforms YAML schema definitions into clear, visual documentation for NoSQL database structures.

See [NOML Specification v1.0.0](docs/NOML_SPEC.md) for the full specification.

## Features

- **Visual Schema Rendering** - Transform YAML definitions into readable design documents
- **File Upload & Paste** - Import schemas via file upload or direct paste
- **Firestore Support** - MVP focused on Google Cloud Firestore
- **Bilingual UI** - English and Japanese support

## Quick Start

```bash
# Clone the repository
git clone https://github.com/noml-viewer-developer/noml-viewer.git
cd noml-viewer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## NOML Schema Example

```yaml
noml: "1.0.0"
database: firestore
metadata:
  name: My App
  description: Sample application schema

collections:
  users:
    description: User accounts
    fields:
      id:
        type: string
        source: documentId
      email:
        type: string
        required: true
        validation:
          format: email
      displayName:
        type: string
      createdAt:
        type: timestamp
        default: serverTimestamp

    subcollections:
      posts:
        description: User's blog posts
        fields:
          title:
            type: string
            required: true
          content:
            type: string
          publishedAt:
            type: timestamp
```

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Apache License 2.0 - see [LICENSE](LICENSE) for details.

---

Made with passion for better NoSQL documentation.
