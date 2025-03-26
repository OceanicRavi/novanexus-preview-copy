// src/config.ts

export const config = {
    emailJs: {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_emailjs_service_id',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_emailjs_template_id',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'default_emailjs_public_key',
    },
  
    calendly: {
      username: import.meta.env.VITE_CALENDLY_USERNAME || 'default_calendly_username',
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
  