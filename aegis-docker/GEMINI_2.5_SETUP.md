# Gemini 2.5 Pro Setup Guide

This document summarizes the changes made to configure Gemini 2.5 Pro for n8n workflows and Opus.

## Changes Made

### 1. LiteLLM Configuration (`config/litellm/litellm.yaml`)

Added Gemini 2.5 Pro model configuration using AIML API:

```yaml
- model_name: google/gemini-2.5-pro
  litellm_params:
    model: google/gemini-2.5-pro
    api_base: https://api.aimlapi.com/v1
    api_key: ${AIMLAPI_KEY}
```

### 2. Docker Compose (`docker-compose.yml`)

- **Added LiteLLM service** with configuration mounting
- **Updated n8n environment variables**:
  - `LITELLM_SCORING_MODEL`: Defaults to `google/gemini-2.5-pro`
  - `LITELLM_MASTER_KEY`: For LiteLLM authentication

### 3. n8n Workflows

Updated both workflows to use Gemini 2.5 Pro:

- **`market-pulse.json`**: Daily art market digest
- **`lead-scout.json`**: Lead scoring and analysis

Changes:
- Default model changed from `gpt-4o-mini` to `google/gemini-2.5-pro`
- Added `max_tokens: 15000` to ensure full responses (Gemini 2.5 Pro requires more tokens)

### 4. Opus Configuration

Created documentation at `docs/OPUS_GEMINI_CONFIG.md` with:
- Step-by-step guide for configuring External Service Nodes
- Example configurations for KYC/AML workflows
- Troubleshooting tips

## Environment Variables Required

Add these to your `.env` file:

```bash
# AIML API Key (get from https://aimlapi.com)
AIMLAPI_KEY=your_aimlapi_key_here

# LiteLLM Master Key (for authentication)
LITELLM_MASTER_KEY=your_litellm_master_key

# Optional: Override default model
LITELLM_SCORING_MODEL=google/gemini-2.5-pro
```

## Setup Steps

1. **Get AIML API Key**:
   - Sign up at https://aimlapi.com
   - Generate API key from dashboard
   - Add to `.env` file

2. **Update Environment Variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add AIMLAPI_KEY
   ```

3. **Restart Services**:
   ```bash
   docker compose down
   docker compose up -d
   ```

4. **Verify LiteLLM**:
   ```bash
   curl http://localhost:4000/health
   ```

5. **Test Model**:
   ```bash
   curl http://localhost:4000/v1/chat/completions \
     -H "Authorization: Bearer ${LITELLM_MASTER_KEY}" \
     -H "Content-Type: application/json" \
     -d '{
       "model": "google/gemini-2.5-pro",
       "messages": [{"role": "user", "content": "Hello!"}],
       "max_tokens": 15000
     }'
   ```

## Important Notes

- **Token Limits**: Gemini 2.5 Pro is a reasoning model. Always set `max_tokens` to at least `15000` to avoid truncated responses.

- **Finish Reason**: Check the `finish_reason` field in responses:
  - `"stop"`: Success
  - `"length"`: Increase `max_tokens`

- **Cost**: AIML API charges per token. Monitor usage in the AIML API dashboard.

## Troubleshooting

### LiteLLM not starting
- Check that `AIMLAPI_KEY` is set in environment
- Verify `config/litellm/litellm.yaml` is mounted correctly
- Check logs: `docker logs aegis-art-litellm`

### Empty responses from workflows
- Verify `max_tokens` is set to 15000 or higher
- Check `finish_reason` in response - if it's "length", increase tokens
- Verify AIML API key is valid

### Model not found errors
- Ensure model name is exactly `google/gemini-2.5-pro`
- Verify AIML API endpoint is correct: `https://api.aimlapi.com/v1`

## References

- AIML API Docs: https://docs.aimlapi.com/api-references/text-models-llm/google/gemini-2.5-pro
- LiteLLM Docs: https://docs.litellm.ai
- Opus Config: See `docs/OPUS_GEMINI_CONFIG.md`

