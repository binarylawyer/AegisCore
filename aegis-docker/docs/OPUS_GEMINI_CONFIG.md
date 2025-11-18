# Opus Configuration for Gemini 2.5 Pro

This guide explains how to configure Opus workflows (from Applied AI) to use Google Gemini 2.5 Pro via the AIML API.

## Overview

Opus workflows can call external LLM APIs through **External Service Nodes**. To use Gemini 2.5 Pro, configure these nodes to call the AIML API endpoint.

## AIML API Configuration

### API Endpoint
```
https://api.aimlapi.com/v1/chat/completions
```

### Authentication
- **Header**: `Authorization: Bearer <YOUR_AIMLAPI_KEY>`
- **Content-Type**: `application/json`

### Model Identifier
```
google/gemini-2.5-pro
```

## Configuring Opus External Service Nodes

### Step 1: Create External Service Node

1. In your Opus workflow, add an **External Service Node**
2. Set the **HTTP Method** to `POST`
3. Set the **URL** to: `https://api.aimlapi.com/v1/chat/completions`

### Step 2: Configure Headers

Add the following headers:

| Header Name | Value |
|------------|-------|
| `Authorization` | `Bearer <YOUR_AIMLAPI_KEY>` |
| `Content-Type` | `application/json` |

Replace `<YOUR_AIMLAPI_KEY>` with your actual AIML API key from your account dashboard.

### Step 3: Configure Request Body

Use the following JSON structure:

```json
{
  "model": "google/gemini-2.5-pro",
  "messages": [
    {
      "role": "system",
      "content": "Your system prompt here"
    },
    {
      "role": "user",
      "content": "{{ $workflow.user_message }}"
    }
  ],
  "max_tokens": 15000,
  "temperature": 0.4
}
```

### Important Parameters

- **`model`**: Always use `"google/gemini-2.5-pro"`
- **`max_tokens`**: Set to `15000` (or higher) to ensure full responses. Gemini 2.5 Pro is a reasoning model and may require thousands of tokens.
- **`temperature`**: Adjust based on your use case:
  - `0.0-0.3`: More deterministic, factual responses
  - `0.4-0.7`: Balanced creativity and accuracy
  - `0.8-1.0`: More creative, varied responses

### Step 4: Handle Response

The AIML API returns responses in OpenAI-compatible format:

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Model response here"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 44730,
    "completion_tokens_details": {
      "reasoning_tokens": 1339
    },
    "total_tokens": 44754
  }
}
```

**Important**: Check the `finish_reason` field:
- `"stop"`: Response completed successfully
- `"length"`: Response was cut off due to token limit (increase `max_tokens`)

## Example: KYC/AML Workflow Configuration

For the Aegis Core KYC/AML workflow, configure the **Agent Node** (LWM) to use Gemini 2.5 Pro:

### Agent Node Configuration

1. **Node Type**: External Service Node
2. **URL**: `https://api.aimlapi.com/v1/chat/completions`
3. **Method**: `POST`
4. **Headers**:
   ```
   Authorization: Bearer <AIMLAPI_KEY>
   Content-Type: application/json
   ```
5. **Body**:
   ```json
   {
     "model": "google/gemini-2.5-pro",
     "messages": [
       {
         "role": "system",
         "content": "You are an AI compliance analyst for Aegis Core. Analyze KYC/AML documentation and provide structured assessments. Respond with JSON format."
       },
       {
         "role": "user",
         "content": "{{ $workflow.kyc_documentation }}"
       }
     ],
     "max_tokens": 15000,
     "temperature": 0.2,
     "response_format": {
       "type": "json_object"
     }
   }
   ```

## Environment Variables

For production deployments, store your AIML API key as an environment variable:

1. In Opus, navigate to **Settings** → **Environment Variables**
2. Add: `AIMLAPI_KEY` = `<your-api-key>`
3. Reference in headers as: `Bearer {{ $env.AIMLAPI_KEY }}`

## Troubleshooting

### Empty Response Content

If you receive an empty `content` field:
- **Cause**: `max_tokens` is too low (default is 512)
- **Solution**: Set `max_tokens` to at least `15000`

### Finish Reason is "length"

- **Cause**: Response exceeded token limit
- **Solution**: Increase `max_tokens` value

### Authentication Errors

- Verify your AIML API key is correct
- Ensure the `Authorization` header format is: `Bearer <key>` (with space after "Bearer")
- Check that your API key is enabled in the AIML API dashboard

## Reference

- AIML API Documentation: https://docs.aimlapi.com/api-references/text-models-llm/google/gemini-2.5-pro
- Opus Documentation: https://docs.appliedai.com

## Notes

- Gemini 2.5 Pro supports reasoning tokens, which are included in the `completion_tokens` count
- The model performs best with explicit instructions and structured prompts
- For compliance workflows, use lower temperature values (0.2-0.4) for more consistent results

