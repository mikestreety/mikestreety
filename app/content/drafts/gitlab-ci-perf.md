🎯 GitLab CI Performance Changes Summary
What Was Wrong:

Pipeline was hanging after Git checkout during cache download
Cache operations taking 2+ minutes
Caching unnecessary files bloating cache size

Changes Made:
1. Fixed Cache Bloat ⭐ BIGGEST WIN
yamluntracked: false  # Changed from true
Why: Was caching thousands of random untracked files. Now only caches what we explicitly list.
2. Added Cache Timeout Protection
yamlCACHE_REQUEST_TIMEOUT: 300
RESTORE_CACHE_ATTEMPTS: 2
Why: Prevents indefinite hangs if cache gets stuck.
3. Faster Git Clones
yamlGIT_DEPTH: '1'  # Changed from '10'
Why: Downloads only latest commit, not last 10 commits. 50-80% faster.
4. Cleared Old Corrupted Caches
Why: Removed potentially broken cache archives causing hangs.
5. Skip Unnecessary Artifact Downloads
yamlneeds:
  - job: install:npm
    artifacts: false  # Added this
Why: Jobs pull from cache (fast, parallel) instead of waiting for artifacts (slow, sequential).
6. Smart Install Checks
yamlif [ -d "vendor" ]; then
  echo "✓ Found in cache, skipping install"
else
  composer install
fi
Why: When cache is warm, skip reinstalling entirely.
7. Auto-Cancel Old Pipelines
yamlworkflow:
  auto_cancel:
    on_new_commit: interruptible
Why: New commits cancel old running pipelines (except deployments).
8. Cache Fallback Keys
yamlfallback_keys:
  - npm-
Why: If exact cache miss, try older cache instead of rebuilding from scratch.