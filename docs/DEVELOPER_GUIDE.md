# Fourier Developer Guide

Welcome to the Fourier developer documentation repository guide. This file serves as an onboarding hub.
## Architecture Design

Fourier compiles smart contract reputation indices statically using file-based schemas, allowing low-latency queries.
## Next.js 15 Route Parameters

Next.js 15 route params are resolved as Promises. The route controller asynchronously unpacks them before calling helpers.
## Stellar Base32 Encoding

Stellar address strings utilize RFC 4648 Base32 alphabet constraints (A-Z, 2-7) with a dedicated C-prefix representing contracts.
## Threat Matrix & Categories

We classify threats into rug pulls, exploits, phishing vectors, fake tokens, spam claiming portals, and malware injections.
## Caching and Local Storage

Recent scan operations are recorded inside localStorage to prevent redundant network telemetry calls during audits.
## Styling Conventions

Components adopt glassmorphic, terminal-cyberpunk visual properties. Color accents strictly represent severity.
## Interface State Transition

Scanner console shifts between empty, query-loading, analysis-failure, and completed reputation telemetry states.
## Pull Request Policy

Pull requests must document code improvements, avoid empty commits, and include type validation before merge.
## CI/CD Pipeline

GitHub actions build scripts run type validation checks and Next.js builds on every push to verify codebase health.
## Core Contract Schema

The JSON database stores addresses, descriptions, update timestamps, security levels, and confidence ranges.
## Validator Utilities

Validators trim inputs, normalize letter casing, and evaluate checksum patterns before execution pipelines start.
## Resource Indexing

Footers compile official Soroban links, GitHub repositories, and security policies to anchor community reach.
## Extended Index Metadata

Typing configurations define rigid enums covering severity ranges from none up to critical vulnerability tags.
## Brand Assets

Vectors leverage pure CSS glow variables and responsive flex ratios to align layouts dynamically.
## Navigation Routing

Responsive links detect router paths to highlight active tabs with symbolic terminal indicator signs.
## Empty Screen Prompts

When loading files for the first time, placeholders prompt user action and reference scan targets.
## Error Handling Boundaries

Telemetry fetches contain retry bindings. Catch clauses parse response errors or fall back to system errors.
## Features Pillars Grid

Grid items highlight future phases including browser extensions, webhook alerts, and native wallets.
## Severity Assessment Metrics

Scam badges utilize standard CSS animations to draw attention, while safe indicators maintain solid boundaries.
## Terms Glossary

- **Soroban**: Stellar Wasm smart contract framework.
- **StrKey**: String key encoding utilizing CRC16.
## Troubleshooting

For build failures, ensure your dependencies align with Next 15 node requirements and run type validation commands.
