// src/config.ts

export const config = {
    resend: {
      apiKey: import.meta.env.VITE_RESEND_API_KEY || 'default_resend_api_key',
    },
  
    apiTokens: {
      ragAgentToken: import.meta.env.VITE_RAG_AGENT_TOKEN || 'default_rag_token',
      textToVideoToken: import.meta.env.VITE_TEXT_TO_VIDEO_TOKEN || 'default_text_to_video_token',
    },

    baseUri: {
      textToVideoBucket: import.meta.env.VITE_CLOUDFARE_BUCKET|| 'url to cloudfare TextToVideo bucket',
      ragBucket: import.meta.env.VITE_RAG_BUCKET|| 'url to cloudfare RAG bucket',
      ragWebhook: import.meta.env.VITE_RAG_WEBHOOK|| 'url to n8n RAG webhook',
      aiVoiceBucket: import.meta.env.VITE_VOICE_BUCKET|| 'url to cloudfare AI Voice bucket'
    },
  };
  