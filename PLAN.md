# Global Pledge Initiative - Product Requirements Document & Database Schema

## 1. PRODUCT REQUIREMENTS DOCUMENT (PRD)

### 1.1 Product Summary
The **Global Pledge Initiative** is a public, verifiable platform empowering individuals to make official commitments to UN Sustainable Development Goals (SDGs) and custom causes. It bridges the gap between personal intent and public accountability through official digital certificates, social verification, and viral sharing mechanics.

### 1.2 Problem Statement
While millions wish to support global goals, there is no centralized, "official" platform to register personal commitments. Current methods (social media posts, petitions) lack permanence, verification, and a sense of officiality, reducing the perceived weight of the pledge.

### 1.3 Goals & Success Metrics
*   **Trust:** Establish the platform as the "standard" for personal SDG commitments.
*   **Virality:** Achieve a K-factor > 1.5 through certificate sharing.
*   **Scale:** Support 1M+ concurrent users during global awareness days.
*   **Engagement:** >40% of users sharing their certificate on at least one social platform.

### 1.4 User Personas
1.  **The Idealist:** Wants to publicly signal support for specific causes (e.g., Climate Action).
2.  **The Corporate Citizen:** Employees participating in company-wide CSR initiatives.
3.  **The NGO Partner:** Organizations driving campaigns and tracking collective impact.

### 1.5 User Journeys
**Pledge Flow:**
1.  **Landing:** User views live counter and trending goals.
2.  **Selection:** User selects a UN SDG or writes a custom goal.
3.  **Commitment:** User enters details (Name, Location, Email) and optional story.
4.  **Verification:** User verifies via OTP (simulated in mockup) or Email.
5.  **Certificate:** System generates a unique, verifiable certificate with QR code.
6.  **Sharing:** User downloads PNG or shares link to social media.

### 1.6 Feature Breakdown

| Priority | Feature | Rationale |
| :--- | :--- | :--- |
| **P0** | **Pledge Engine** | Core value proposition. Must be frictionless. |
| **P0** | **Certificate Gen** | The "reward" for the user. Must look premium/official. |
| **P0** | **Public Registry** | Provides social proof and verification. |
| **P1** | **Social Sharing** | Critical for growth loop. |
| **P1** | **Goal Discovery** | Visual grid of SDGs to inspire users. |
| **P2** | **Map View** | Visualizes global impact. |
| **P2** | **NGO Pages** | For partners to aggregate pledges. |

### 1.7 Functional Requirements
*   **Certificate:** Must include Name, Goal, Date, Unique ID, QR Code.
*   **Validation:** Inputs must be validated (real email format, phone format).
*   **Performance:** Certificate generation < 2 seconds.

### 1.8 Non-Functional Requirements
*   **Security:** PII (Personally Identifiable Information) must be encrypted at rest (in real implementation).
*   **Accessibility:** WCAG 2.1 AA Compliant. High contrast modes.
*   **Reliability:** 99.9% Uptime.

### 1.9 Trust & Verification
*   **QR Code:** Scans to a permanent URL verifying the pledge authenticity.
*   **Captcha:** Prevent bot spam.

### 1.10 Future Scalability
*   **Blockchain:** Future option to mint certificates as SBTs (Soulbound Tokens).
*   **API:** For third-party integrations (universities, corporations).

---

## 2. DATABASE SCHEMA (Supabase / PostgreSQL)

### 2.1 Schema Overview
Designed for high-read throughput (public registry) and data integrity.

### 2.2 Tables

#### `users`
*Stores pledger identity.*

| Column | Type | Constraints | Notes |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default uuid_generate_v4() | |
| `email` | TEXT | Unique, Not Null | Indexed for lookup |
| `full_name` | TEXT | Not Null | Display name for certificate |
| `mobile` | TEXT | Nullable | For SMS notifications |
| `city` | TEXT | Not Null | |
| `country` | TEXT | Not Null | ISO code preferred |
| `created_at` | TIMESTAMPTZ | Default NOW() | |

#### `goals`
*Official UN SDGs and categories.*

| Column | Type | Constraints | Notes |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK | |
| `title` | TEXT | Not Null | e.g., "No Poverty" |
| `description` | TEXT | Not Null | |
| `icon_url` | TEXT | Not Null | |
| `color_hex` | TEXT | Not Null | Official branding color |
| `is_official` | BOOLEAN | Default TRUE | True for UN SDGs |

#### `pledges`
*The core commitment record.*

| Column | Type | Constraints | Notes |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, Default uuid_generate_v4() | The Public Pledge ID |
| `user_id` | UUID | FK -> users.id | |
| `goal_id` | INT | FK -> goals.id | Nullable if custom |
| `custom_goal_text` | TEXT | Nullable | If goal_id is null |
| `story` | TEXT | Nullable | User's "Why" |
| `image_url` | TEXT | Nullable | User upload |
| `is_verified` | BOOLEAN | Default FALSE | Email/SMS verification status |
| `is_public` | BOOLEAN | Default TRUE | Privacy setting |
| `created_at` | TIMESTAMPTZ | Default NOW() | Pledge date |

#### `certificates`
*Generated artifacts.*

| Column | Type | Constraints | Notes |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | |
| `pledge_id` | UUID | FK -> pledges.id | Unique Constraint |
| `issued_at` | TIMESTAMPTZ | Default NOW() | |
| `hash` | TEXT | Not Null | Cryptographic hash for verification |
| `style_variant` | TEXT | Default 'standard' | |

#### `pledge_shares`
*Tracking virality.*

| Column | Type | Constraints | Notes |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | |
| `pledge_id` | UUID | FK -> pledges.id | |
| `platform` | TEXT | Not Null | 'twitter', 'linkedin', etc. |
| `created_at` | TIMESTAMPTZ | Default NOW() | |

### 2.3 Relationships
*   `users` 1:N `pledges` (A user can pledge to multiple goals)
*   `goals` 1:N `pledges`
*   `pledges` 1:1 `certificates`

### 2.4 Scaling Notes
*   **Indexes:** Added on `pledges(goal_id)`, `pledges(created_at)`, `users(email)`.
*   **Partitioning:** `pledges` table can be partitioned by `created_at` (year) for historical archiving if rows > 100M.
