#!/bin/bash

# Build performance measurement script
echo "🚀 Starting optimized build process..."
START_TIME=$(date +%s%3N)

# Run the build with timing
echo "📊 Running generation steps..."
GENERATION_START=$(date +%s%3N)

npm run generate:all

GENERATION_END=$(date +%s%3N)
GENERATION_TIME=$((GENERATION_END - GENERATION_START))

echo "📊 Generation completed in ${GENERATION_TIME}ms"

echo "📊 Running Next.js build..."
BUILD_START=$(date +%s%3N)

# Set environment to skip network requests during build if possible
NEXT_TELEMETRY_DISABLED=1 npm run build:base

BUILD_END=$(date +%s%3N)
BUILD_TIME=$((BUILD_END - BUILD_START))

END_TIME=$(date +%s%3N)
TOTAL_TIME=$((END_TIME - START_TIME))

echo "📊 Build Performance Summary:"
echo "  Generation time: ${GENERATION_TIME}ms"
echo "  Next.js build time: ${BUILD_TIME}ms"
echo "  Total build time: ${TOTAL_TIME}ms"

# Save performance metrics
echo "{
  \"timestamp\": \"$(date -Iseconds)\",
  \"generationTime\": ${GENERATION_TIME},
  \"buildTime\": ${BUILD_TIME},
  \"totalTime\": ${TOTAL_TIME}
}" > build-performance.json

echo "✅ Performance metrics saved to build-performance.json"