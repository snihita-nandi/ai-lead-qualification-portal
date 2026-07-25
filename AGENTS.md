# AI Lead Qualification Portal

## Mission

You are contributing to a production-quality internship project.

The objective is NOT to create the flashiest UI.

The objective is to demonstrate strong software engineering, clean architecture, thoughtful UX, and maintainable code.

Every decision should feel like it could ship in a real company.

---

# Project Stack

Framework
- Next.js 15 (App Router)
- React 19
- TypeScript

Styling
- Tailwind CSS
- shadcn/ui
- Radix UI
- Lucide Icons

Animation
- Framer Motion

Backend
- n8n Webhook
- Google Gemini API
- Google Sheets
- Gmail

---

# Application Purpose

This application is an AI-powered Lead Qualification Portal.

A visitor submits business information through an assessment.

The frontend sends the assessment to an n8n webhook.

The workflow:

Visitor
→ Frontend
→ n8n
→ Gemini
→ Google Sheets
→ Gmail

The frontend should always be designed with this workflow in mind.

---

# Product Philosophy

This is NOT:

- a hackathon demo
- a landing page template
- a marketing website
- an Apple clone
- a futuristic AI showcase

This IS:

A professional enterprise web application that demonstrates a complete AI-powered lead qualification workflow.

---

# UX Philosophy

The user should feel like they are interacting with a professional business platform.

The experience should communicate:

- trust
- clarity
- simplicity
- confidence

Avoid unnecessary visual complexity.

Every interaction should have a purpose.

---

# Design Language

Design inspiration:

- Linear
- Vercel
- Stripe
- Clerk
- GitHub

Avoid:

- glassmorphism overload
- glowing neon effects
- oversized gradients
- excessive blur
- animated backgrounds
- hackathon aesthetics
- fake dashboards

Use:

- generous whitespace
- clean typography
- subtle borders
- consistent spacing
- restrained animations
- accessible colors

---

# Assessment Philosophy

The assessment is the core feature.

It should feel like a guided business consultation.

Never present it as a generic contact form.

Each field must exist for a business reason.

Avoid unnecessary questions.

---

# Code Philosophy

Always prefer:

small components

strong typing

composition

reusability

clarity

predictability

Do not generate large monolithic files.

Split code into reusable components whenever appropriate.

---

# Folder Structure

Organize components by responsibility.

components/

layout/

sections/

assessment/

ui/

lib/

hooks/

types/

utils/

Never place unrelated code together.

---

# React Guidelines

Prefer Server Components.

Only use Client Components when required.

Use React hooks responsibly.

Avoid unnecessary state.

Avoid prop drilling.

Prefer composition over inheritance.

---

# TypeScript

Never use "any" unless absolutely unavoidable.

Create reusable interfaces.

Prefer explicit types.

Keep types centralized.

---

# Styling Rules

Use Tailwind CSS.

Prefer shadcn components before creating custom UI.

Avoid inline styles.

Maintain a consistent spacing scale.

Maintain consistent border radius.

Maintain consistent shadows.

The interface should feel cohesive.

---

# Animation Rules

Animations should support usability.

Never animate purely for decoration.

Use Framer Motion.

Animations should be:

- short
- smooth
- subtle

Avoid dramatic page transitions.

---

# Accessibility

Always generate accessible UI.

Include:

- semantic HTML
- labels
- keyboard navigation
- focus states
- aria attributes where needed

Accessibility is mandatory.

---

# Performance

Prefer server rendering.

Avoid unnecessary client-side JavaScript.

Lazy load heavy components.

Optimize images.

Avoid unnecessary dependencies.

---

# Component Rules

Components should have a single responsibility.

Large components should be broken into smaller reusable components.

Never duplicate UI.

Extract repeated patterns.

---

# File Rules

Never rewrite unrelated files.

Modify only files relevant to the requested task.

Preserve project structure.

Avoid destructive refactors unless requested.

---

# Development Workflow

Implement only the requested feature.

Do not anticipate future requirements.

Do not generate placeholder features that were not requested.

Complete one feature before moving to the next.

---

# Response Behaviour

When implementing a task:

1. Analyze existing project structure.
2. Reuse existing components.
3. Extend instead of replacing.
4. Keep code production-ready.
5. Explain architectural decisions when necessary.
6. Never introduce unnecessary complexity.

Always optimize for maintainability over cleverness.
