# --- STAGE 1: Base ---
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# --- STAGE 2: Dependencies ---
FROM base AS deps
# Copy only lockfile to cache the pnpm store
COPY pnpm-lock.yaml ./
RUN pnpm fetch
# Install all dependencies (including dev) for building
COPY package.json ./
RUN pnpm install --offline --frozen-lockfile

# --- STAGE 3: Build ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV CI=true
# Build the NestJS app (generates ./dist)
RUN pnpm run build
# Prune node_modules to only include production dependencies
RUN pnpm prune --prod

# --- STAGE 4: Production ---
FROM base AS runner
ENV NODE_ENV=production

# Copy only the essentials
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# --- SQLite Specifics ---
# Copy your database file into the runner.
# Adjust 'data.db' to your actual filename.
COPY --from=build /app/db.sqlite ./db.sqlite

# Ensure the app can write to the DB (SQLite needs write access to the file and its folder)
RUN chmod 666 ./db.sqlite

EXPOSE 3000

CMD ["node", "dist/main"]